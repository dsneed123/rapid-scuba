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
    """Lead from the contact page free-quote form."""

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

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    source_ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Contact inquiry"
        verbose_name_plural = "Contact inquiries"

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> — {self.service or 'general'}"


class BookingRequest(models.Model):
    """Lead from the structured booking form (vessel type + preferred date)."""

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40)

    service_id = models.CharField(max_length=80)
    vessel_type = models.CharField(max_length=80)
    vessel_length_ft = models.PositiveIntegerField()
    location = models.CharField(max_length=200)
    preferred_date = models.DateField()
    notes = models.TextField(blank=True)

    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )
    staff_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    source_ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Booking request"
        verbose_name_plural = "Booking requests"

    def __str__(self) -> str:
        return f"{self.name} — {self.service_id} on {self.preferred_date}"
