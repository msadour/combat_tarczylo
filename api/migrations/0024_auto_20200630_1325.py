# Generated by Django 3.0.7 on 2020-06-30 13:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_auto_20200629_2108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='internship',
            name='date_begin',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 6, 30, 13, 25, 11, 848604)),
        ),
    ]