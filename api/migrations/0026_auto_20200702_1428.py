# Generated by Django 3.0.8 on 2020-07-02 14:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_auto_20200702_1411'),
    ]

    operations = [
        migrations.AlterField(
            model_name='internship',
            name='date_begin',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 7, 2, 14, 28, 20, 972890)),
        ),
    ]