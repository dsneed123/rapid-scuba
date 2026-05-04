from django.urls import path

from . import views

app_name = "inquiries"

urlpatterns = [
    path("inquiries/", views.create_contact_inquiry, name="create-contact-inquiry"),
    path("bookings/", views.create_booking_request, name="create-booking-request"),
    path("me/inquiries/", views.my_inquiries, name="my-inquiries"),
    path("me/bookings/", views.my_bookings, name="my-bookings"),
    path("health/", views.health, name="health"),
]
