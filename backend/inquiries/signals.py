"""Email customers when their request status changes.

We track the previous status by stashing it on the instance during
``post_init`` and comparing against the new value in ``post_save``.
"""
from __future__ import annotations

import logging

from django.conf import settings
from django.core.mail import send_mail
from django.db.models.signals import post_init, post_save
from django.dispatch import receiver
from django.utils import timezone

from .models import ContactInquiry, Status

log = logging.getLogger(__name__)

CUSTOMER_FACING_STATUSES = {Status.CONTACTED, Status.SCHEDULED, Status.COMPLETED}

STATUS_MESSAGES = {
    Status.CONTACTED: (
        "We've received your request and will reach out shortly to confirm details."
    ),
    Status.SCHEDULED: (
        "Your service is scheduled. We'll arrive at the agreed time and date."
    ),
    Status.COMPLETED: (
        "Your service is complete. You'll receive a photo/video report and "
        "invoice shortly. Thank you for choosing RapidScuba."
    ),
}


@receiver(post_init, sender=ContactInquiry)
def _stash_initial(sender, instance, **kwargs):  # noqa: ARG001
    instance._initial_status = instance.status if instance.pk else None


@receiver(post_save, sender=ContactInquiry)
def _email_status(sender, instance, created, **kwargs):  # noqa: ARG001
    if created:
        instance._initial_status = instance.status
        return

    initial = getattr(instance, "_initial_status", None)
    new = instance.status
    if initial is None or initial == new:
        return
    if new not in CUSTOMER_FACING_STATUSES:
        return

    to_email = (instance.email or "").strip()
    if not to_email:
        return

    body = STATUS_MESSAGES.get(new, f"Your request status is now: {new}.")
    if new == Status.SCHEDULED and instance.scheduled_at:
        local_time = timezone.localtime(instance.scheduled_at)
        body += (
            f"\n\nScheduled time: {local_time.strftime('%A, %B %-d at %-I:%M %p')}"
        )

    subject = f"[RapidScuba] Your request is now {instance.get_status_display()}"

    try:
        send_mail(
            subject=subject,
            message=(
                f"Hi {instance.name or ''},\n\n"
                f"{body}\n\n"
                f"If you have questions, reply to this email or call (206) 240-2687.\n\n"
                f"— RapidScuba"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[to_email],
            fail_silently=True,
        )
    except Exception:
        log.exception("Failed to send status-change email")

    instance._initial_status = new
