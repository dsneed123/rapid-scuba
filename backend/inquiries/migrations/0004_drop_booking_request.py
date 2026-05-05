from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("inquiries", "0003_add_scheduling"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="contactinquiry",
            options={
                "ordering": ("-created_at",),
                "verbose_name": "Quote request",
                "verbose_name_plural": "Quote requests",
            },
        ),
        migrations.DeleteModel(
            name="BookingRequest",
        ),
    ]
