"""JSON endpoints for the public quote-request form and the customer's
"my requests" view.

CSRF is exempted on the public POST because it's called cross-origin from the
React SPA with no authenticated session.
"""
from __future__ import annotations

import datetime as _dt
import json
import logging
from typing import Callable

from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.http import HttpRequest, JsonResponse
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from . import schemas
from .models import ContactInquiry, Status

log = logging.getLogger(__name__)


def _client_ip(request: HttpRequest) -> str | None:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[0].strip() or None
    return request.META.get("REMOTE_ADDR") or None


def _parse_json(request: HttpRequest) -> tuple[dict | None, JsonResponse | None]:
    if request.content_type and "application/json" not in request.content_type:
        return None, JsonResponse(
            {"error": "Content-Type must be application/json"}, status=415
        )
    try:
        body = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return None, JsonResponse({"error": "Invalid JSON"}, status=400)
    if not isinstance(body, dict):
        return None, JsonResponse({"error": "Expected a JSON object"}, status=400)
    return body, None


def _notify(subject: str, body: str) -> None:
    recipients = settings.INQUIRY_NOTIFY_TO
    if not recipients:
        return
    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipients,
            fail_silently=True,
        )
    except Exception:
        log.exception("Failed to send inquiry notification email")


def _serialize(o: ContactInquiry) -> dict:
    return {
        "id": o.id,
        "name": o.name,
        "email": o.email,
        "phone": o.phone,
        "service": o.service,
        "vesselLength": o.vessel_length,
        "vesselLengthDisplay": o.get_vessel_length_display() if o.vessel_length else "",
        "location": o.location,
        "message": o.message,
        "status": o.status,
        "statusDisplay": o.get_status_display(),
        "scheduledAt": o.scheduled_at.isoformat() if o.scheduled_at else None,
        "scheduledDurationMinutes": o.scheduled_duration_minutes,
        "quotedAmount": str(o.quoted_amount) if o.quoted_amount is not None else None,
        "staffNotes": o.staff_notes,
        "createdAt": o.created_at.isoformat(),
        "updatedAt": o.updated_at.isoformat(),
    }


@csrf_exempt
@require_http_methods(["POST"])
def create_inquiry(request: HttpRequest) -> JsonResponse:
    payload, err = _parse_json(request)
    if err is not None:
        return err
    cleaned, errors = schemas.validate_contact_inquiry(payload)
    if errors:
        return JsonResponse({"errors": errors}, status=400)

    with transaction.atomic():
        obj = ContactInquiry.objects.create(
            **cleaned,
            user=request.user if request.user.is_authenticated else None,
            source_ip=_client_ip(request),
            user_agent=(request.META.get("HTTP_USER_AGENT") or "")[:300],
        )

    _notify(
        f"[RapidScuba] New quote request from {obj.name}",
        (
            f"Name: {obj.name}\nEmail: {obj.email}\nPhone: {obj.phone}\n"
            f"Service: {obj.service or '-'}\n"
            f"Vessel length: {obj.get_vessel_length_display() or '-'}\n"
            f"Location: {obj.location or '-'}\n\n"
            f"Message:\n{obj.message or '-'}\n\n"
            f"Open in admin: /admin/inquiries/contactinquiry/{obj.pk}/change/"
        ),
    )
    return JsonResponse({"id": obj.pk, "status": "received"}, status=201)


@require_http_methods(["GET"])
def health(_request: HttpRequest) -> JsonResponse:
    return JsonResponse({"status": "ok"})


@require_http_methods(["GET"])
def my_requests(request: HttpRequest) -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required"}, status=401)
    rows = list(request.user.contact_inquiries.all().order_by("-created_at"))
    return JsonResponse({"requests": [_serialize(r) for r in rows]})


# ───── Staff write endpoints ─────


def _staff_required(view: Callable) -> Callable:
    def wrapped(request: HttpRequest, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"error": "Authentication required"}, status=401)
        if not request.user.is_staff:
            return JsonResponse({"error": "Staff access required"}, status=403)
        return view(request, *args, **kwargs)

    wrapped.__name__ = view.__name__
    return wrapped


@_staff_required
@require_http_methods(["GET", "PATCH", "DELETE"])
def staff_inquiry_detail(request: HttpRequest, pk: int) -> JsonResponse:
    try:
        obj = ContactInquiry.objects.get(pk=pk)
    except ContactInquiry.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    if request.method == "GET":
        return JsonResponse({"request": _serialize(obj)})

    if request.method == "DELETE":
        obj.delete()
        return JsonResponse({"status": "deleted"})

    # PATCH — partial update.
    body, err = _parse_json(request)
    if err:
        return err

    errors: dict[str, str] = {}

    if "status" in body:
        new_status = (body.get("status") or "").strip()
        if new_status not in {s.value for s in Status}:
            errors["status"] = "Invalid status"
        else:
            obj.status = new_status

    if "scheduledAt" in body:
        raw = body.get("scheduledAt")
        if raw in (None, ""):
            obj.scheduled_at = None
        else:
            parsed = parse_datetime(str(raw))
            if parsed is None:
                errors["scheduledAt"] = "Invalid datetime (expected ISO 8601)"
            else:
                if timezone.is_naive(parsed):
                    parsed = timezone.make_aware(parsed)
                obj.scheduled_at = parsed

    if "scheduledDurationMinutes" in body:
        raw = body.get("scheduledDurationMinutes")
        try:
            minutes = int(raw)
            if minutes < 0 or minutes > 24 * 60:
                raise ValueError
            obj.scheduled_duration_minutes = minutes
        except (TypeError, ValueError):
            errors["scheduledDurationMinutes"] = "Must be an integer 0–1440"

    if "staffNotes" in body:
        obj.staff_notes = (body.get("staffNotes") or "")[:5000]

    if "quotedAmount" in body:
        raw = body.get("quotedAmount")
        if raw in (None, ""):
            obj.quoted_amount = None
        else:
            try:
                from decimal import Decimal, InvalidOperation

                amount = Decimal(str(raw))
                if amount < 0 or amount > Decimal("99999999.99"):
                    raise InvalidOperation
                obj.quoted_amount = amount
            except Exception:
                errors["quotedAmount"] = "Must be a positive decimal (USD)"

    if errors:
        return JsonResponse({"errors": errors}, status=400)

    obj.save()
    return JsonResponse({"request": _serialize(obj)})


@_staff_required
@require_http_methods(["POST"])
def staff_create_ticket(request: HttpRequest) -> JsonResponse:
    """Staff creates a ticket on behalf of a walk-up / phone-in customer."""
    body, err = _parse_json(request)
    if err:
        return err

    cleaned, errors = schemas.validate_contact_inquiry(body)
    if errors:
        return JsonResponse({"errors": errors}, status=400)

    obj = ContactInquiry(
        **cleaned,
        source_ip=_client_ip(request),
        user_agent="(staff-created)",
    )

    # Optional staff-only fields.
    if "status" in body:
        new_status = (body.get("status") or "").strip()
        if new_status in {s.value for s in Status}:
            obj.status = new_status

    if body.get("scheduledAt"):
        from django.utils.dateparse import parse_datetime

        parsed = parse_datetime(str(body["scheduledAt"]))
        if parsed is not None:
            if timezone.is_naive(parsed):
                parsed = timezone.make_aware(parsed)
            obj.scheduled_at = parsed

    if body.get("scheduledDurationMinutes") is not None:
        try:
            minutes = int(body["scheduledDurationMinutes"])
            if 0 <= minutes <= 24 * 60:
                obj.scheduled_duration_minutes = minutes
        except (TypeError, ValueError):
            pass

    if body.get("quotedAmount") is not None and body["quotedAmount"] != "":
        try:
            from decimal import Decimal

            amount = Decimal(str(body["quotedAmount"]))
            if 0 <= amount <= Decimal("99999999.99"):
                obj.quoted_amount = amount
        except Exception:
            pass

    if "staffNotes" in body:
        obj.staff_notes = (body.get("staffNotes") or "")[:5000]

    obj.save()
    return JsonResponse({"request": _serialize(obj)}, status=201)


@_staff_required
@require_http_methods(["GET"])
def staff_tickets(request: HttpRequest) -> JsonResponse:
    """All tickets, with optional filters. Server-side search + status filter."""
    qs = ContactInquiry.objects.all()

    status = (request.GET.get("status") or "").strip()
    if status:
        qs = qs.filter(status=status)

    search = (request.GET.get("q") or "").strip()
    if search:
        from django.db.models import Q

        qs = qs.filter(
            Q(name__icontains=search)
            | Q(email__icontains=search)
            | Q(phone__icontains=search)
            | Q(location__icontains=search)
            | Q(service__icontains=search)
            | Q(message__icontains=search)
        )

    qs = qs.order_by("-created_at")[:500]

    rows = []
    for o in qs:
        rows.append({
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
            "quotedAmount": str(o.quoted_amount) if o.quoted_amount is not None else None,
            "staffNotes": o.staff_notes,
            "createdAt": o.created_at.isoformat(),
            "updatedAt": o.updated_at.isoformat(),
            "sourceIp": o.source_ip or "",
            "userAgent": o.user_agent,
            "userId": o.user_id,
            "adminUrl": f"/admin/inquiries/contactinquiry/{o.id}/change/",
        })
    return JsonResponse({"tickets": rows, "total": len(rows)})


@_staff_required
@require_http_methods(["GET"])
def staff_calendar(request: HttpRequest) -> JsonResponse:
    """Return scheduled appointments in [from, to]. Both inclusive, ISO date."""
    raw_from = request.GET.get("from")
    raw_to = request.GET.get("to")

    today = timezone.localdate()
    try:
        date_from = _dt.date.fromisoformat(raw_from) if raw_from else today.replace(day=1)
    except ValueError:
        return JsonResponse({"error": "Invalid 'from' date"}, status=400)
    try:
        date_to = (
            _dt.date.fromisoformat(raw_to)
            if raw_to
            else today + _dt.timedelta(days=60)
        )
    except ValueError:
        return JsonResponse({"error": "Invalid 'to' date"}, status=400)

    qs = ContactInquiry.objects.filter(
        scheduled_at__date__gte=date_from,
        scheduled_at__date__lte=date_to,
    ).order_by("scheduled_at")

    items = []
    for o in qs:
        items.append({
            "id": o.id,
            "name": o.name,
            "email": o.email,
            "phone": o.phone,
            "service": o.service,
            "location": o.location,
            "status": o.status,
            "statusDisplay": o.get_status_display(),
            "scheduledAt": o.scheduled_at.isoformat() if o.scheduled_at else None,
            "scheduledDurationMinutes": o.scheduled_duration_minutes,
            "quotedAmount": str(o.quoted_amount) if o.quoted_amount is not None else None,
            "adminUrl": f"/admin/inquiries/contactinquiry/{o.id}/change/",
        })

    return JsonResponse({
        "from": date_from.isoformat(),
        "to": date_to.isoformat(),
        "appointments": items,
    })
