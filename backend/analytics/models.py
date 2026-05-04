from django.conf import settings
from django.db import models


class PageView(models.Model):
    """One row per page navigation in the React SPA."""

    session_id = models.CharField(max_length=64, db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="pageviews",
    )

    path = models.CharField(max_length=512, db_index=True)
    referrer = models.CharField(max_length=512, blank=True, db_index=True)

    utm_source = models.CharField(max_length=120, blank=True, db_index=True)
    utm_medium = models.CharField(max_length=120, blank=True)
    utm_campaign = models.CharField(max_length=120, blank=True)
    utm_term = models.CharField(max_length=120, blank=True)
    utm_content = models.CharField(max_length=120, blank=True)

    ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=("session_id", "created_at")),
        ]

    def __str__(self) -> str:
        return f"{self.path} @ {self.created_at:%Y-%m-%d %H:%M}"


class Event(models.Model):
    """Custom event — clicks, form starts, exits, etc."""

    session_id = models.CharField(max_length=64, db_index=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="events",
    )

    name = models.CharField(max_length=80, db_index=True)
    path = models.CharField(max_length=512, blank=True, db_index=True)
    target = models.CharField(max_length=200, blank=True, db_index=True)

    duration_ms = models.PositiveIntegerField(null=True, blank=True)
    properties = models.JSONField(default=dict, blank=True)

    ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=("name", "created_at")),
        ]

    def __str__(self) -> str:
        return f"{self.name} on {self.path}"
