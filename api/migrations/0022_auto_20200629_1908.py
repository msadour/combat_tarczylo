# Generated by Django 3.0.5 on 2020-06-29 19:08

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0021_auto_20200629_1411"),
    ]

    operations = [
        migrations.AlterField(
            model_name="internship",
            name="date_begin",
            field=models.DateTimeField(
                blank=True, default=datetime.datetime(2020, 6, 29, 19, 8, 1, 926980)
            ),
        ),
    ]
