from django.urls import path

from . import views

app_name = "inquiries"

urlpatterns = [
    path("inquiries/", views.create_inquiry, name="create-inquiry"),
    path("me/requests/", views.my_requests, name="my-requests"),
    path(
        "staff/inquiries/<int:pk>/",
        views.staff_inquiry_detail,
        name="staff-inquiry-detail",
    ),
    path("staff/tickets/", views.staff_tickets, name="staff-tickets"),
    path("staff/calendar/", views.staff_calendar, name="staff-calendar"),
    path("health/", views.health, name="health"),
]
