"""Lightweight request validation for the public form endpoints.

Returns ``(cleaned, errors)``. ``errors`` is a dict of field -> message; if any
errors are present, ``cleaned`` is None.
"""
from __future__ import annotations

import datetime as _dt
import re
from typing import Any

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
VESSEL_LENGTH_BUCKETS = {"under-30", "31-60", "61-plus"}


def _clean_str(value: Any, *, max_len: int) -> str:
    if value is None:
        return ""
    if not isinstance(value, str):
        return ""
    return value.strip()[:max_len]


def _required(field: str, value: str, errors: dict[str, str]) -> str:
    if not value:
        errors[field] = f"{field} is required"
    return value


def validate_contact_inquiry(payload: dict) -> tuple[dict | None, dict | None]:
    errors: dict[str, str] = {}

    name = _required("name", _clean_str(payload.get("name"), max_len=120), errors)
    email = _required("email", _clean_str(payload.get("email"), max_len=254), errors)
    phone = _required("phone", _clean_str(payload.get("phone"), max_len=40), errors)

    if email and not EMAIL_RE.match(email):
        errors["email"] = "Invalid email address"

    vessel_length = _clean_str(payload.get("vesselLength"), max_len=20)
    if vessel_length and vessel_length not in VESSEL_LENGTH_BUCKETS:
        errors["vesselLength"] = "Invalid vessel length"

    service = _clean_str(payload.get("service"), max_len=80)
    location = _clean_str(payload.get("location"), max_len=200)
    message = _clean_str(payload.get("message"), max_len=5000)

    if errors:
        return None, errors

    return (
        {
            "name": name,
            "email": email,
            "phone": phone,
            "vessel_length": vessel_length,
            "service": service,
            "location": location,
            "message": message,
        },
        None,
    )


def validate_booking_request(payload: dict) -> tuple[dict | None, dict | None]:
    errors: dict[str, str] = {}

    name = _required("name", _clean_str(payload.get("name"), max_len=120), errors)
    email = _required("email", _clean_str(payload.get("email"), max_len=254), errors)
    phone = _required("phone", _clean_str(payload.get("phone"), max_len=40), errors)
    service_id = _required(
        "serviceId", _clean_str(payload.get("serviceId"), max_len=80), errors
    )
    vessel_type = _required(
        "vesselType", _clean_str(payload.get("vesselType"), max_len=80), errors
    )
    location = _required(
        "location", _clean_str(payload.get("location"), max_len=200), errors
    )
    notes = _clean_str(payload.get("notes"), max_len=5000)

    if email and not EMAIL_RE.match(email):
        errors["email"] = "Invalid email address"

    raw_length = payload.get("vesselLength")
    vessel_length_ft = 0
    try:
        vessel_length_ft = int(raw_length)
    except (TypeError, ValueError):
        errors["vesselLength"] = "Vessel length must be a number"
    else:
        if not (10 <= vessel_length_ft <= 500):
            errors["vesselLength"] = "Vessel length must be between 10 and 500 ft"

    raw_date = _clean_str(payload.get("preferredDate"), max_len=20)
    preferred_date: _dt.date | None = None
    if not raw_date:
        errors["preferredDate"] = "Preferred date is required"
    else:
        try:
            preferred_date = _dt.date.fromisoformat(raw_date)
        except ValueError:
            errors["preferredDate"] = "Invalid date (expected YYYY-MM-DD)"

    if errors:
        return None, errors

    return (
        {
            "name": name,
            "email": email,
            "phone": phone,
            "service_id": service_id,
            "vessel_type": vessel_type,
            "vessel_length_ft": vessel_length_ft,
            "location": location,
            "preferred_date": preferred_date,
            "notes": notes,
        },
        None,
    )
