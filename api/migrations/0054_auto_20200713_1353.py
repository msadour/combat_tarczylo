# Generated by Django 3.0.8 on 2020-07-13 13:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0053_auto_20200709_1250'),
    ]

    operations = [
        migrations.AlterField(
            model_name='internship',
            name='date_begin',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 7, 13, 13, 53, 0, 361351)),
        ),
    ]
