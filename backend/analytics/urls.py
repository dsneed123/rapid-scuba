from django.urls import path

from . import views

app_name = "analytics"

urlpatterns = [
    path("analytics/pageview/", views.pageview, name="pageview"),
    path("analytics/event/", views.event, name="event"),
]
