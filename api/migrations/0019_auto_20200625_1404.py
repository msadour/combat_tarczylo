# Generated by Django 3.0.5 on 2020-06-25 14:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0018_auto_20200625_1340"),
    ]

    operations = [
        migrations.AlterField(
            model_name="internship",
            name="date_begin",
            field=models.DateTimeField(
                blank=True, default=datetime.datetime(2020, 6, 25, 14, 4, 46, 265386)
            ),
        ),
    ]
