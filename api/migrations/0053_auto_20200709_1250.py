# Generated by Django 3.0.8 on 2020-07-09 12:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0052_auto_20200709_1214'),
    ]

    operations = [
        migrations.AlterField(
            model_name='internship',
            name='date_begin',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 7, 9, 12, 50, 26, 89338)),
        ),
    ]
