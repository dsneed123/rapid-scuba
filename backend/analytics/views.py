"""Fire-and-forget tracking endpoints called by the frontend tracker."""
from __future__ import annotations

import json
import logging
from typing import Any

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Event, PageView

log = logging.getLogger(__name__)


def _client_ip(request: HttpRequest) -> str | None:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[0].strip() or None
    return request.META.get("REMOTE_ADDR") or None


def _parse(request: HttpRequest) -> dict[str, Any] | None:
    try:
        body = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return None
    return body if isinstance(body, dict) else None


def _str(value: Any, max_len: int) -> str:
    if value is None:
        return ""
    if not isinstance(value, str):
        value = str(value)
    return value.strip()[:max_len]


def _user(request: HttpRequest):
    return request.user if request.user.is_authenticated else None


@csrf_exempt
@require_http_methods(["POST"])
def pageview(request: HttpRequest) -> JsonResponse:
    body = _parse(request)
    if body is None:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    session_id = _str(body.get("sessionId"), 64)
    if not session_id:
        return JsonResponse({"error": "sessionId required"}, status=400)

    PageView.objects.create(
        session_id=session_id,
        user=_user(request),
        path=_str(body.get("path"), 512) or "/",
        referrer=_str(body.get("referrer"), 512),
        utm_source=_str(body.get("utmSource"), 120),
        utm_medium=_str(body.get("utmMedium"), 120),
        utm_campaign=_str(body.get("utmCampaign"), 120),
        utm_term=_str(body.get("utmTerm"), 120),
        utm_content=_str(body.get("utmContent"), 120),
        ip=_client_ip(request),
        user_agent=(request.META.get("HTTP_USER_AGENT") or "")[:300],
    )
    return JsonResponse({"status": "ok"}, status=202)


@csrf_exempt
@require_http_methods(["POST"])
def event(request: HttpRequest) -> JsonResponse:
    body = _parse(request)
    if body is None:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    session_id = _str(body.get("sessionId"), 64)
    name = _str(body.get("name"), 80)
    if not session_id or not name:
        return JsonResponse({"error": "sessionId and name required"}, status=400)

    properties = body.get("properties")
    if not isinstance(properties, dict):
        properties = {}

    duration_ms = body.get("durationMs")
    if not isinstance(duration_ms, (int, float)):
        duration_ms = None
    elif duration_ms < 0:
        duration_ms = 0
    else:
        duration_ms = int(duration_ms)

    Event.objects.create(
        session_id=session_id,
        user=_user(request),
        name=name,
        path=_str(body.get("path"), 512),
        target=_str(body.get("target"), 200),
        duration_ms=duration_ms,
        properties=properties,
        ip=_client_ip(request),
        user_agent=(request.META.get("HTTP_USER_AGENT") or "")[:300],
    )
    return JsonResponse({"status": "ok"}, status=202)
