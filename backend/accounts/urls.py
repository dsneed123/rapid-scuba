from django.urls import path

from . import staff, views

app_name = "accounts"

urlpatterns = [
    path("auth/csrf/", views.csrf, name="csrf"),
    path("auth/signup/", views.signup, name="signup"),
    path("auth/login/", views.login_view, name="login"),
    path("auth/logout/", views.logout_view, name="logout"),
    path("auth/me/", views.me, name="me"),
    path("staff/dashboard/", staff.dashboard, name="staff-dashboard"),
]
