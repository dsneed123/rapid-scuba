"""JSON endpoints for the public lead-capture forms.

CSRF is exempted because these are called cross-origin from the React SPA with
no authenticated session. Validation happens via dataclass-style schemas in
``schemas.py``.
"""
from __future__ import annotations

import json
import logging
from typing import Callable

from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from . import schemas
from .models import BookingRequest, ContactInquiry

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
    except Exception:  # pragma: no cover — never break the request on mail issues
        log.exception("Failed to send inquiry notification email")


def _handle(
    request: HttpRequest,
    validator: Callable[[dict], tuple[dict | None, dict | None]],
    create: Callable[[dict, HttpRequest], object],
    notify_subject: Callable[[object], str],
    notify_body: Callable[[object], str],
) -> JsonResponse:
    payload, err = _parse_json(request)
    if err is not None:
        return err
    cleaned, errors = validator(payload)
    if errors:
        return JsonResponse({"errors": errors}, status=400)
    with transaction.atomic():
        obj = create(cleaned, request)
    _notify(notify_subject(obj), notify_body(obj))
    return JsonResponse({"id": obj.pk, "status": "received"}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def create_contact_inquiry(request: HttpRequest) -> JsonResponse:
    def create(data: dict, req: HttpRequest) -> ContactInquiry:
        return ContactInquiry.objects.create(
            **data,
            user=req.user if req.user.is_authenticated else None,
            source_ip=_client_ip(req),
            user_agent=(req.META.get("HTTP_USER_AGENT") or "")[:300],
        )

    return _handle(
        request,
        validator=schemas.validate_contact_inquiry,
        create=create,
        notify_subject=lambda o: f"[RapidScuba] New inquiry from {o.name}",
        notify_body=lambda o: (
            f"Name: {o.name}\nEmail: {o.email}\nPhone: {o.phone}\n"
            f"Service: {o.service or '-'}\nVessel length: {o.get_vessel_length_display() or '-'}\n"
            f"Location: {o.location or '-'}\n\nMessage:\n{o.message or '-'}\n\n"
            f"Open in admin: /admin/inquiries/contactinquiry/{o.pk}/change/"
        ),
    )


@csrf_exempt
@require_http_methods(["POST"])
def create_booking_request(request: HttpRequest) -> JsonResponse:
    def create(data: dict, req: HttpRequest) -> BookingRequest:
        return BookingRequest.objects.create(
            **data,
            user=req.user if req.user.is_authenticated else None,
            source_ip=_client_ip(req),
            user_agent=(req.META.get("HTTP_USER_AGENT") or "")[:300],
        )

    return _handle(
        request,
        validator=schemas.validate_booking_request,
        create=create,
        notify_subject=lambda o: f"[RapidScuba] New booking request from {o.name}",
        notify_body=lambda o: (
            f"Name: {o.name}\nEmail: {o.email}\nPhone: {o.phone}\n"
            f"Service: {o.service_id}\nVessel: {o.vessel_type}, {o.vessel_length_ft} ft\n"
            f"Location: {o.location}\nPreferred date: {o.preferred_date}\n\n"
            f"Notes:\n{o.notes or '-'}\n\n"
            f"Open in admin: /admin/inquiries/bookingrequest/{o.pk}/change/"
        ),
    )


@require_http_methods(["GET"])
def health(_request: HttpRequest) -> JsonResponse:
    return JsonResponse({"status": "ok"})


def _serialize_inquiry(o: ContactInquiry) -> dict:
    return {
        "id": o.id,
        "name": o.name,
        "email": o.email,
        "phone": o.phone,
        "service": o.service,
        "vesselLength": o.vessel_length,
        "location": o.location,
        "message": o.message,
        "status": o.status,
        "statusDisplay": o.get_status_display(),
        "createdAt": o.created_at.isoformat(),
        "updatedAt": o.updated_at.isoformat(),
    }


def _serialize_booking(o: BookingRequest) -> dict:
    return {
        "id": o.id,
        "name": o.name,
        "email": o.email,
        "phone": o.phone,
        "serviceId": o.service_id,
        "vesselType": o.vessel_type,
        "vesselLengthFt": o.vessel_length_ft,
        "location": o.location,
        "preferredDate": o.preferred_date.isoformat(),
        "notes": o.notes,
        "status": o.status,
        "statusDisplay": o.get_status_display(),
        "createdAt": o.created_at.isoformat(),
        "updatedAt": o.updated_at.isoformat(),
    }


@require_http_methods(["GET"])
def my_inquiries(request: HttpRequest) -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required"}, status=401)
    rows = list(request.user.contact_inquiries.all().order_by("-created_at"))
    return JsonResponse({"inquiries": [_serialize_inquiry(r) for r in rows]})


@require_http_methods(["GET"])
def my_bookings(request: HttpRequest) -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required"}, status=401)
    rows = list(request.user.booking_requests.all().order_by("-created_at"))
    return JsonResponse({"bookings": [_serialize_booking(r) for r in rows]})
