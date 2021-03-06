# Generated by Django 3.0.5 on 2020-06-12 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0010_auto_20200611_2335"),
    ]

    operations = [
        migrations.CreateModel(
            name="ClubInformation",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("street", models.CharField(blank=True, max_length=255)),
                ("number", models.CharField(blank=True, max_length=255)),
                ("zip_code", models.CharField(blank=True, max_length=255)),
                ("city", models.CharField(blank=True, max_length=255)),
                ("country", models.CharField(blank=True, max_length=255)),
                ("time_table", models.ManyToManyField(to="api.TimeTable")),
            ],
        ),
        migrations.AddField(
            model_name="presentation",
            name="name_club",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.DeleteModel(name="Club",),
    ]
