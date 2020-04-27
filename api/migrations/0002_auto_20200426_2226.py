# Generated by Django 3.0.5 on 2020-04-26 22:26

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='importantmessage',
            name='date_creation',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 4, 26, 22, 26, 53, 77401, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='date_creation',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 4, 26, 22, 26, 53, 79398, tzinfo=utc), null=True),
        ),
        migrations.AlterField(
            model_name='pendingsubscription',
            name='date_creation',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 4, 26, 22, 26, 53, 84311, tzinfo=utc), null=True),
        ),
    ]
