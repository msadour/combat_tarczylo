# Generated by Django 3.0.5 on 2020-06-25 12:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0016_auto_20200623_2317"),
    ]

    operations = [
        migrations.AlterField(
            model_name="internship",
            name="date_begin",
            field=models.DateTimeField(
                blank=True, default=datetime.datetime(2020, 6, 25, 12, 2, 54, 261502)
            ),
        ),
    ]
