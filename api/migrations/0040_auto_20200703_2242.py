# Generated by Django 3.0.8 on 2020-07-03 22:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0039_auto_20200703_1702"),
    ]

    operations = [
        migrations.AlterField(
            model_name="internship",
            name="date_begin",
            field=models.DateTimeField(
                blank=True, default=datetime.datetime(2020, 7, 3, 22, 42, 31, 777436)
            ),
        ),
    ]
