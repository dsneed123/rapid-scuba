from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inquiries", "0002_add_user_fk"),
    ]

    operations = [
        migrations.AddField(
            model_name="contactinquiry",
            name="scheduled_at",
            field=models.DateTimeField(
                blank=True,
                db_index=True,
                help_text="When the dive is scheduled. Sets the calendar entry.",
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="contactinquiry",
            name="scheduled_duration_minutes",
            field=models.PositiveIntegerField(
                default=120,
                help_text="Estimated duration in minutes. Default 2 hours.",
            ),
        ),
        migrations.AddField(
            model_name="bookingrequest",
            name="scheduled_at",
            field=models.DateTimeField(
                blank=True,
                db_index=True,
                help_text="When the dive is scheduled. Sets the calendar entry.",
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="bookingrequest",
            name="scheduled_duration_minutes",
            field=models.PositiveIntegerField(
                default=120,
                help_text="Estimated duration in minutes. Default 2 hours.",
            ),
        ),
    ]
