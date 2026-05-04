from django.contrib import admin

from .models import Event, PageView


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("created_at", "path", "referrer", "utm_source", "session_id", "user")
    list_filter = ("utm_source", "utm_medium", "created_at")
    search_fields = ("path", "referrer", "session_id")
    date_hierarchy = "created_at"
    readonly_fields = tuple(f.name for f in PageView._meta.get_fields() if not f.is_relation or f.many_to_one)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("created_at", "name", "path", "target", "duration_ms", "user")
    list_filter = ("name", "created_at")
    search_fields = ("name", "path", "target", "session_id")
    date_hierarchy = "created_at"
    readonly_fields = tuple(f.name for f in Event._meta.get_fields() if not f.is_relation or f.many_to_one)
