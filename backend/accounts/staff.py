"""Staff-only dashboard data endpoints.

Aggregates ContactInquiry and BookingRequest data for the custom React
dashboard at /#/staff. Plus pulls in analytics tracking data once that app is
populated.
"""
from __future__ import annotations

import datetime as _dt
from collections import Counter, defaultdict

from django.db.models import Count
from django.http import HttpRequest, JsonResponse
from django.utils import timezone
from django.views.decorators.http import require_http_methods

from inquiries.models import BookingRequest, ContactInquiry, Status


def _staff_required(view):
    def wrapped(request: HttpRequest, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)
        if not request.user.is_staff:
            return JsonResponse({"error": "Staff access required"}, status=403)
        return view(request, *args, **kwargs)

    wrapped.__name__ = view.__name__
    return wrapped


def _last_n_days(n: int) -> list[_dt.date]:
    today = timezone.localdate()
    return [today - _dt.timedelta(days=i) for i in range(n - 1, -1, -1)]


def _series_by_day(qs, n: int = 30) -> list[dict]:
    days = _last_n_days(n)
    counts = Counter()
    for row in qs.filter(created_at__date__gte=days[0]).values_list("created_at", flat=True):
        counts[timezone.localtime(row).date()] += 1
    return [{"date": d.isoformat(), "count": counts.get(d, 0)} for d in days]


def _grouped(qs, field: str) -> list[dict]:
    rows = qs.values(field).annotate(count=Count("id")).order_by("-count")
    return [{"key": r[field] or "(unspecified)", "count": r["count"]} for r in rows]


@require_http_methods(["GET"])
@_staff_required
def dashboard(request: HttpRequest) -> JsonResponse:  # noqa: ARG001
    inquiries = ContactInquiry.objects.all()
    bookings = BookingRequest.objects.all()

    # Combined "leads per day" — both forms summed.
    days = _last_n_days(30)
    inquiry_by_day = {
        r["date"]: r["count"] for r in _series_by_day(inquiries, 30)
    }
    booking_by_day = {
        r["date"]: r["count"] for r in _series_by_day(bookings, 30)
    }

    leads_per_day = [
        {
            "date": d.isoformat(),
            "inquiries": inquiry_by_day.get(d.isoformat(), 0),
            "bookings": booking_by_day.get(d.isoformat(), 0),
            "total": inquiry_by_day.get(d.isoformat(), 0)
            + booking_by_day.get(d.isoformat(), 0),
        }
        for d in days
    ]

    # Status funnel — combined across both models.
    status_counts: dict[str, int] = defaultdict(int)
    for s, c in inquiries.values_list("status").annotate(c=Count("id")):
        status_counts[s] += c
    for s, c in bookings.values_list("status").annotate(c=Count("id")):
        status_counts[s] += c

    status_funnel = [
        {
            "status": s.value,
            "label": s.label,
            "count": status_counts.get(s.value, 0),
        }
        for s in Status
    ]

    # Top services (combine inquiry.service + booking.service_id).
    service_counts = Counter()
    for r in inquiries.values("service").annotate(c=Count("id")):
        service_counts[r["service"] or "(unspecified)"] += r["c"]
    for r in bookings.values("service_id").annotate(c=Count("id")):
        service_counts[r["service_id"] or "(unspecified)"] += r["c"]
    top_services = [
        {"service": k, "count": v}
        for k, v in service_counts.most_common(10)
    ]

    # Top locations.
    location_counts = Counter()
    for r in inquiries.exclude(location="").values("location").annotate(c=Count("id")):
        location_counts[r["location"]] += r["c"]
    for r in bookings.exclude(location="").values("location").annotate(c=Count("id")):
        location_counts[r["location"]] += r["c"]
    top_locations = [
        {"location": k, "count": v}
        for k, v in location_counts.most_common(10)
    ]

    # Headline numbers.
    totals = {
        "inquiries": inquiries.count(),
        "bookings": bookings.count(),
        "new": status_counts.get(Status.NEW.value, 0),
        "completed": status_counts.get(Status.COMPLETED.value, 0),
    }

    # Recent activity feed — last 20 mixed events.
    feed: list[dict] = []
    for o in inquiries.order_by("-created_at")[:20]:
        feed.append({
            "type": "inquiry",
            "id": o.id,
            "name": o.name,
            "service": o.service,
            "status": o.status,
            "createdAt": o.created_at.isoformat(),
        })
    for o in bookings.order_by("-created_at")[:20]:
        feed.append({
            "type": "booking",
            "id": o.id,
            "name": o.name,
            "service": o.service_id,
            "status": o.status,
            "createdAt": o.created_at.isoformat(),
        })
    feed.sort(key=lambda x: x["createdAt"], reverse=True)
    feed = feed[:20]

    # Optional: pull in analytics if the analytics app has data.
    analytics_block = _analytics_summary()

    return JsonResponse({
        "totals": totals,
        "leadsPerDay": leads_per_day,
        "statusFunnel": status_funnel,
        "topServices": top_services,
        "topLocations": top_locations,
        "recentActivity": feed,
        "analytics": analytics_block,
    })


def _analytics_summary() -> dict:
    """Returns site-wide tracking aggregates if the analytics app has data."""
    try:
        from analytics.models import Event, PageView
    except Exception:
        return {"available": False}

    days = _last_n_days(30)
    pageviews = PageView.objects.all()
    events = Event.objects.all()

    pv_by_day = Counter()
    for ts in pageviews.filter(created_at__date__gte=days[0]).values_list("created_at", flat=True):
        pv_by_day[timezone.localtime(ts).date()] += 1
    pageviews_per_day = [
        {"date": d.isoformat(), "count": pv_by_day.get(d, 0)} for d in days
    ]

    top_paths = [
        {"path": r["path"] or "/", "count": r["c"]}
        for r in pageviews.values("path").annotate(c=Count("id")).order_by("-c")[:10]
    ]

    top_referrers = [
        {"referrer": r["referrer"] or "(direct)", "count": r["c"]}
        for r in pageviews.values("referrer").annotate(c=Count("id")).order_by("-c")[:10]
    ]

    top_sources = [
        {"source": r["utm_source"] or "(none)", "count": r["c"]}
        for r in pageviews.values("utm_source").annotate(c=Count("id")).order_by("-c")[:10]
    ]

    top_exit_paths = [
        {"path": r["path"] or "/", "count": r["c"]}
        for r in events.filter(name="exit").values("path").annotate(c=Count("id")).order_by("-c")[:10]
    ]

    top_clicks = [
        {"target": r["target"] or "(unspecified)", "count": r["c"]}
        for r in events.filter(name="click").values("target").annotate(c=Count("id")).order_by("-c")[:10]
    ]

    return {
        "available": True,
        "totals": {
            "pageviews": pageviews.count(),
            "events": events.count(),
            "uniqueSessions": pageviews.values("session_id").distinct().count(),
        },
        "pageviewsPerDay": pageviews_per_day,
        "topPaths": top_paths,
        "topReferrers": top_referrers,
        "topSources": top_sources,
        "topExitPaths": top_exit_paths,
        "topClicks": top_clicks,
    }
