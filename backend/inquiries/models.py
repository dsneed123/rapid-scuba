from django.conf import settings
from django.db import models


class Status(models.TextChoices):
    NEW = "new", "New"
    CONTACTED = "contacted", "Contacted"
    SCHEDULED = "scheduled", "Scheduled"
    COMPLETED = "completed", "Completed"
    ARCHIVED = "archived", "Archived"


class VesselLengthBucket(models.TextChoices):
    UNDER_30 = "under-30", "Under 30 ft"
    BETWEEN_31_60 = "31-60", "31–60 ft"
    OVER_60 = "61-plus", "61 ft+"


class ContactInquiry(models.Model):
    """A "Request a Free Quote" submission from the contact page.

    Despite the legacy class name, this is the *only* lead model. The original
    ``BookingRequest`` model was deprecated and dropped — every form submission
    now writes here.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="contact_inquiries",
    )

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    vessel_length = models.CharField(
        max_length=20,
        choices=VesselLengthBucket.choices,
        blank=True,
    )
    service = models.CharField(max_length=80, blank=True)
    location = models.CharField(max_length=200, blank=True)
    message = models.TextField(blank=True)

    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )
    staff_notes = models.TextField(
        blank=True, help_text="Internal notes — not visible to the customer."
    )

    scheduled_at = models.DateTimeField(
        null=True,
        blank=True,
        db_index=True,
        help_text="When the dive is scheduled. Sets the calendar entry.",
    )
    scheduled_duration_minutes = models.PositiveIntegerField(
        default=120,
        help_text="Estimated duration in minutes. Default 2 hours.",
    )

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    source_ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Quote request"
        verbose_name_plural = "Quote requests"

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> — {self.service or 'general'}"
