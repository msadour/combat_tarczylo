# Generated by Django 3.0.5 on 2020-06-23 23:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0015_auto_20200617_2034"),
    ]

    operations = [
        migrations.AlterField(
            model_name="internship",
            name="date_begin",
            field=models.DateTimeField(
                blank=True, default=datetime.datetime(2020, 6, 23, 23, 17, 14, 173588)
            ),
        ),
    ]
