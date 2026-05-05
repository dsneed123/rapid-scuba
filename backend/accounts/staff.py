"""Staff-only dashboard data endpoint.

Aggregates ContactInquiry data and (optionally) site-analytics data for the
React dashboard at /#/staff.
"""
from __future__ import annotations

import datetime as _dt
from collections import Counter

from django.db.models import Count
from django.http import HttpRequest, JsonResponse
from django.utils import timezone
from django.views.decorators.http import require_http_methods

from inquiries.models import ContactInquiry, Status


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


@require_http_methods(["GET"])
@_staff_required
def dashboard(request: HttpRequest) -> JsonResponse:  # noqa: ARG001
    qs = ContactInquiry.objects.all()

    # Requests per day — last 30.
    days = _last_n_days(30)
    counts = Counter()
    for ts in qs.filter(created_at__date__gte=days[0]).values_list(
        "created_at", flat=True
    ):
        counts[timezone.localtime(ts).date()] += 1
    requests_per_day = [
        {"date": d.isoformat(), "count": counts.get(d, 0)} for d in days
    ]

    # Status funnel.
    by_status = dict(
        qs.values_list("status").annotate(c=Count("id")).values_list("status", "c")
    )
    status_funnel = [
        {"status": s.value, "label": s.label, "count": by_status.get(s.value, 0)}
        for s in Status
    ]

    # Top services.
    top_services = [
        {"service": r["service"] or "(unspecified)", "count": r["c"]}
        for r in qs.values("service").annotate(c=Count("id")).order_by("-c")[:10]
    ]

    # Top locations.
    top_locations = [
        {"location": r["location"], "count": r["c"]}
        for r in qs.exclude(location="")
        .values("location")
        .annotate(c=Count("id"))
        .order_by("-c")[:10]
    ]

    # Headline numbers.
    totals = {
        "requests": qs.count(),
        "new": by_status.get(Status.NEW.value, 0),
        "scheduled": by_status.get(Status.SCHEDULED.value, 0),
        "completed": by_status.get(Status.COMPLETED.value, 0),
    }

    # Recent activity feed — last 30 with full details.
    feed = []
    for o in qs.order_by("-created_at")[:30]:
        feed.append({
            "id": o.id,
            "name": o.name,
            "email": o.email,
            "phone": o.phone,
            "service": o.service,
            "vesselLength": o.vessel_length,
            "vesselLengthDisplay": (
                o.get_vessel_length_display() if o.vessel_length else ""
            ),
            "location": o.location,
            "message": o.message,
            "status": o.status,
            "statusDisplay": o.get_status_display(),
            "scheduledAt": o.scheduled_at.isoformat() if o.scheduled_at else None,
            "scheduledDurationMinutes": o.scheduled_duration_minutes,
            "staffNotes": o.staff_notes,
            "createdAt": o.created_at.isoformat(),
            "updatedAt": o.updated_at.isoformat(),
            "sourceIp": o.source_ip or "",
            "userAgent": o.user_agent,
            "userId": o.user_id,
            "adminUrl": f"/admin/inquiries/contactinquiry/{o.id}/change/",
        })

    return JsonResponse({
        "totals": totals,
        "requestsPerDay": requests_per_day,
        "statusFunnel": status_funnel,
        "topServices": top_services,
        "topLocations": top_locations,
        "recentActivity": feed,
        "analytics": _analytics_summary(),
    })


def _analytics_summary() -> dict:
    try:
        from analytics.models import Event, PageView
    except Exception:
        return {"available": False}

    days = _last_n_days(30)
    pageviews = PageView.objects.all()
    events = Event.objects.all()

    pv_by_day = Counter()
    for ts in pageviews.filter(created_at__date__gte=days[0]).values_list(
        "created_at", flat=True
    ):
        pv_by_day[timezone.localtime(ts).date()] += 1
    pageviews_per_day = [
        {"date": d.isoformat(), "count": pv_by_day.get(d, 0)} for d in days
    ]

    return {
        "available": True,
        "totals": {
            "pageviews": pageviews.count(),
            "events": events.count(),
            "uniqueSessions": pageviews.values("session_id").distinct().count(),
        },
        "pageviewsPerDay": pageviews_per_day,
        "topPaths": [
            {"path": r["path"] or "/", "count": r["c"]}
            for r in pageviews.values("path")
            .annotate(c=Count("id"))
            .order_by("-c")[:10]
        ],
        "topReferrers": [
            {"referrer": r["referrer"] or "(direct)", "count": r["c"]}
            for r in pageviews.values("referrer")
            .annotate(c=Count("id"))
            .order_by("-c")[:10]
        ],
        "topSources": [
            {"source": r["utm_source"] or "(none)", "count": r["c"]}
            for r in pageviews.values("utm_source")
            .annotate(c=Count("id"))
            .order_by("-c")[:10]
        ],
        "topExitPaths": [
            {"path": r["path"] or "/", "count": r["c"]}
            for r in events.filter(name="exit")
            .values("path")
            .annotate(c=Count("id"))
            .order_by("-c")[:10]
        ],
        "topClicks": [
            {"target": r["target"] or "(unspecified)", "count": r["c"]}
            for r in events.filter(name="click")
            .values("target")
            .annotate(c=Count("id"))
            .order_by("-c")[:10]
        ],
    }
