from django.contrib import admin

from .models import ContactInquiry


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
        "scheduled_at",
    )
    list_filter = ("status", "service", "vessel_length", "scheduled_at", "created_at")
    search_fields = ("name", "email", "phone", "location", "message")
    list_editable = ("status",)
    date_hierarchy = "created_at"
    autocomplete_fields = ("user",)
    readonly_fields = ("created_at", "updated_at", "source_ip", "user_agent")
    fieldsets = (
        ("Customer", {"fields": ("user", "name", "email", "phone")}),
        ("Request", {"fields": ("service", "vessel_length", "location", "message")}),
        (
            "Workflow",
            {
                "fields": (
                    "status",
                    "scheduled_at",
                    "scheduled_duration_minutes",
                    "quoted_amount",
                    "staff_notes",
                )
            },
        ),
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
