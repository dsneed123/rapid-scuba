"""Session-based auth API for the React SPA.

Uses Django's built-in User model and session middleware. Same-origin in
production (Django serves the React app), so cookies + CSRF Just Work.

Endpoints:
- GET  /api/auth/csrf/    — sets a csrftoken cookie; call once on app load
- POST /api/auth/signup/  — create user, log in, return user info
- POST /api/auth/login/   — log in, return user info
- POST /api/auth/logout/  — clear session
- GET  /api/auth/me/      — current user info, or 401 if anonymous
"""
from __future__ import annotations

import json
import re

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.db import IntegrityError
from django.http import HttpRequest, JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_http_methods

User = get_user_model()
EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def _user_dict(user) -> dict:
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
    }


def _parse(request: HttpRequest) -> tuple[dict | None, JsonResponse | None]:
    try:
        body = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return None, JsonResponse({"error": "Invalid JSON"}, status=400)
    if not isinstance(body, dict):
        return None, JsonResponse({"error": "Expected JSON object"}, status=400)
    return body, None


@require_http_methods(["GET"])
def csrf(request: HttpRequest) -> JsonResponse:
    """Set the csrftoken cookie. Frontend reads it and echoes in X-CSRFToken."""
    return JsonResponse({"csrfToken": get_token(request)})


@require_http_methods(["POST"])
def signup(request: HttpRequest) -> JsonResponse:
    body, err = _parse(request)
    if err:
        return err

    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    first_name = (body.get("firstName") or "").strip()[:30]
    last_name = (body.get("lastName") or "").strip()[:150]

    errors: dict[str, str] = {}
    if not email or not EMAIL_RE.match(email):
        errors["email"] = "Valid email required"
    if len(password) < 8:
        errors["password"] = "Password must be at least 8 characters"
    if not first_name:
        errors["firstName"] = "First name required"
    if errors:
        return JsonResponse({"errors": errors}, status=400)

    try:
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
    except IntegrityError:
        return JsonResponse(
            {"errors": {"email": "An account with this email already exists"}},
            status=400,
        )

    login(request, user)
    return JsonResponse({"user": _user_dict(user)}, status=201)


@require_http_methods(["POST"])
def login_view(request: HttpRequest) -> JsonResponse:
    body, err = _parse(request)
    if err:
        return err

    identifier = (body.get("email") or "").strip()
    password = body.get("password") or ""

    if not identifier or not password:
        return JsonResponse(
            {"errors": {"email": "Email and password required"}}, status=400
        )

    # The "email" field accepts either an email address or a username, so
    # superusers created via createsuperuser (whose username might be e.g.
    # "admin", not their email) can also log in here.
    user = authenticate(request, username=identifier, password=password)
    if user is None:
        candidate = (
            User.objects.filter(email__iexact=identifier).first()
            or User.objects.filter(username__iexact=identifier).first()
        )
        if candidate is not None:
            user = authenticate(
                request, username=candidate.username, password=password
            )

    if user is None:
        return JsonResponse(
            {"error": "Invalid email or password"}, status=401
        )

    login(request, user)
    return JsonResponse({"user": _user_dict(user)})


@require_http_methods(["POST"])
def logout_view(request: HttpRequest) -> JsonResponse:
    logout(request)
    return JsonResponse({"status": "logged_out"})


@require_http_methods(["GET"])
def me(request: HttpRequest) -> JsonResponse:
    if not request.user.is_authenticated:
        return JsonResponse({"user": None}, status=200)
    return JsonResponse({"user": _user_dict(request.user)})
