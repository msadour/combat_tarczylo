# Generated by Django 3.0.8 on 2020-07-03 22:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0041_auto_20200703_2252'),
    ]

    operations = [
        migrations.AlterField(
            model_name='internship',
            name='date_begin',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 7, 3, 22, 53, 16, 757402)),
        ),
    ]
