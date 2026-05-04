from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContactInquiry",
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
                ("name", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=40)),
                (
                    "vessel_length",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("under-30", "Under 30 ft"),
                            ("31-60", "31–60 ft"),
                            ("61-plus", "61 ft+"),
                        ],
                        max_length=20,
                    ),
                ),
                ("service", models.CharField(blank=True, max_length=80)),
                ("location", models.CharField(blank=True, max_length=200)),
                ("message", models.TextField(blank=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("new", "New"),
                            ("contacted", "Contacted"),
                            ("scheduled", "Scheduled"),
                            ("completed", "Completed"),
                            ("archived", "Archived"),
                        ],
                        db_index=True,
                        default="new",
                        max_length=20,
                    ),
                ),
                (
                    "staff_notes",
                    models.TextField(
                        blank=True,
                        help_text="Internal notes — not visible to the customer.",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("source_ip", models.GenericIPAddressField(blank=True, null=True)),
                ("user_agent", models.CharField(blank=True, max_length=300)),
            ],
            options={
                "verbose_name": "Contact inquiry",
                "verbose_name_plural": "Contact inquiries",
                "ordering": ("-created_at",),
            },
        ),
        migrations.CreateModel(
            name="BookingRequest",
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
                ("name", models.CharField(max_length=120)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=40)),
                ("service_id", models.CharField(max_length=80)),
                ("vessel_type", models.CharField(max_length=80)),
                ("vessel_length_ft", models.PositiveIntegerField()),
                ("location", models.CharField(max_length=200)),
                ("preferred_date", models.DateField()),
                ("notes", models.TextField(blank=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("new", "New"),
                            ("contacted", "Contacted"),
                            ("scheduled", "Scheduled"),
                            ("completed", "Completed"),
                            ("archived", "Archived"),
                        ],
                        db_index=True,
                        default="new",
                        max_length=20,
                    ),
                ),
                ("staff_notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("source_ip", models.GenericIPAddressField(blank=True, null=True)),
                ("user_agent", models.CharField(blank=True, max_length=300)),
            ],
            options={
                "verbose_name": "Booking request",
                "verbose_name_plural": "Booking requests",
                "ordering": ("-created_at",),
            },
        ),
    ]
