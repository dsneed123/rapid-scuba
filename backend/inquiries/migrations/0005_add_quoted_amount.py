from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inquiries", "0004_drop_booking_request"),
    ]

    operations = [
        migrations.AddField(
            model_name="contactinquiry",
            name="quoted_amount",
            field=models.DecimalField(
                blank=True,
                decimal_places=2,
                help_text="Quoted price in USD. Visible to the customer on /account.",
                max_digits=10,
                null=True,
            ),
        ),
    ]
