# Generated by Django 3.0.8 on 2020-07-07 15:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0050_auto_20200704_1122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='internship',
            name='date_begin',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 7, 7, 15, 16, 17, 208528)),
        ),
    ]
