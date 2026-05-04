from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="PageView",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("session_id", models.CharField(db_index=True, max_length=64)),
                ("path", models.CharField(db_index=True, max_length=512)),
                (
                    "referrer",
                    models.CharField(blank=True, db_index=True, max_length=512),
                ),
                (
                    "utm_source",
                    models.CharField(blank=True, db_index=True, max_length=120),
                ),
                ("utm_medium", models.CharField(blank=True, max_length=120)),
                ("utm_campaign", models.CharField(blank=True, max_length=120)),
                ("utm_term", models.CharField(blank=True, max_length=120)),
                ("utm_content", models.CharField(blank=True, max_length=120)),
                ("ip", models.GenericIPAddressField(blank=True, null=True)),
                ("user_agent", models.CharField(blank=True, max_length=300)),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, db_index=True),
                ),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=models.deletion.SET_NULL,
                        related_name="pageviews",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ("-created_at",),
            },
        ),
        migrations.AddIndex(
            model_name="pageview",
            index=models.Index(
                fields=["session_id", "created_at"],
                name="analytics_p_session_fd2f03_idx",
            ),
        ),
        migrations.CreateModel(
            name="Event",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("session_id", models.CharField(db_index=True, max_length=64)),
                ("name", models.CharField(db_index=True, max_length=80)),
                (
                    "path",
                    models.CharField(blank=True, db_index=True, max_length=512),
                ),
                (
                    "target",
                    models.CharField(blank=True, db_index=True, max_length=200),
                ),
                ("duration_ms", models.PositiveIntegerField(blank=True, null=True)),
                ("properties", models.JSONField(blank=True, default=dict)),
                ("ip", models.GenericIPAddressField(blank=True, null=True)),
                ("user_agent", models.CharField(blank=True, max_length=300)),
                (
                    "created_at",
                    models.DateTimeField(auto_now_add=True, db_index=True),
                ),
                (
                    "user",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=models.deletion.SET_NULL,
                        related_name="events",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ("-created_at",),
            },
        ),
        migrations.AddIndex(
            model_name="event",
            index=models.Index(
                fields=["name", "created_at"],
                name="analytics_e_name_6ca12c_idx",
            ),
        ),
    ]
