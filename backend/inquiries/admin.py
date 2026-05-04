from django.contrib import admin

from .models import BookingRequest, ContactInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "name",
        "email",
        "phone",
        "service",
        "vessel_length",
        "location",
        "status",
    )
    list_filter = ("status", "service", "vessel_length", "created_at")
    search_fields = ("name", "email", "phone", "location", "message")
    list_editable = ("status",)
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at", "source_ip", "user_agent")
    fieldsets = (
        ("Customer", {"fields": ("name", "email", "phone")}),
        ("Request", {"fields": ("service", "vessel_length", "location", "message")}),
        ("Workflow", {"fields": ("status", "staff_notes")}),
        (
            "Metadata",
            {
                "classes": ("collapse",),
                "fields": ("created_at", "updated_at", "source_ip", "user_agent"),
            },
        ),
    )


@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "name",
        "email",
        "phone",
        "service_id",
        "vessel_type",
        "vessel_length_ft",
        "preferred_date",
        "status",
    )
    list_filter = ("status", "service_id", "vessel_type", "preferred_date", "created_at")
    search_fields = ("name", "email", "phone", "location", "notes")
    list_editable = ("status",)
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at", "source_ip", "user_agent")
    fieldsets = (
        ("Customer", {"fields": ("name", "email", "phone")}),
        (
            "Booking",
            {
                "fields": (
                    "service_id",
                    "vessel_type",
                    "vessel_length_ft",
                    "location",
                    "preferred_date",
                    "notes",
                )
            },
        ),
        ("Workflow", {"fields": ("status", "staff_notes")}),
        (
            "Metadata",
            {
                "classes": ("collapse",),
                "fields": ("created_at", "updated_at", "source_ip", "user_agent"),
            },
        ),
    )


admin.site.site_header = "RapidScuba Admin"
admin.site.site_title = "RapidScuba Admin"
admin.site.index_title = "Operations"
