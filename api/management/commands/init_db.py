"""Command for init the databases."""

import json
import os
from typing import Any

from django.core.management.base import BaseCommand
from django.apps import apps

from api.models import (
    BookAdviced,
    Article,
    ImportantMessage,
    Presentation,
    TimeTable,
    ClubInformation,
    Member,
    Instructor,
    Course,
    Order,
    PendingSubscription,
    Internship,
    Category,
    Product,
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Command(BaseCommand):
    """Class command."""

    def add_arguments(self, parser):
        """Add params in command.

        Args:
            parser: command params.
        """
        parser.add_argument("mode", nargs="+", type=str)

    def handle(self, *args: Any, **options: Any) -> None:
        """Execute the command that create book(s).

        Args:
            args: Variable length argument list.
            options: Arbitrary keyword arguments.
        """

        def delete_data() -> None:
            """Clean database."""
            BookAdviced.objects.all().delete()
            Article.objects.all().delete()
            ImportantMessage.objects.all().delete()
            Presentation.objects.all().delete()
            TimeTable.objects.all().delete()
            ClubInformation.objects.all().delete()
            Member.objects.all().delete()
            Instructor.objects.all().delete()
            Course.objects.all().delete()
            Internship.objects.all().delete()
            Category.objects.all().delete()
            Product.objects.all().delete()
            Order.objects.all().delete()
            PendingSubscription.objects.all().delete()

        if options["mode"][0] == "heroku":
            datas_files = BASE_DIR + "/commands/data/data_heroku.json"
        else:
            datas_files = BASE_DIR + "/commands/data/data.json"

        delete_data()

        with open(datas_files) as json_file:
            try:
                datas_list = json.load(json_file)
                for model, list_datas in datas_list.items():
                    for datas in list_datas:
                        if model == "ClubInformation":
                            time_tables = datas.pop("time_table")
                            new_object = apps.get_model("api", model)(**datas)
                            new_object.save()
                            for time_table in time_tables:
                                time_table = apps.get_model("api", "TimeTable")(
                                    **time_table
                                )
                                time_table.save()
                                new_object.time_table.add(time_table)

                        elif model in ["Member", "Instructor"]:
                            new_object = apps.get_model(
                                "api", model
                            ).objects.create_user(**datas)
                            new_object.save()

                        elif model in ["Course", "Internship"]:
                            instructor_id = datas.pop("instructor")
                            instructor = Instructor.objects.get(id=instructor_id)
                            datas["instructor"] = instructor
                            time_tables = datas.pop("time_table")
                            new_object = apps.get_model("api", model)(**datas)
                            new_object.save()

                            for time_table in time_tables:
                                time_table = apps.get_model("api", "TimeTable")(
                                    **time_table
                                )
                                time_table.save()
                                new_object.time_table.add(time_table)

                        elif model == "Product":
                            category_id = datas.pop("category")
                            category = Category.objects.get(id=category_id)
                            datas["category"] = category
                            new_object = apps.get_model("api", model)(**datas)
                            new_object.save()

                        else:
                            new_object = apps.get_model("api", model)(**datas)
                            new_object.save()

            except Exception as e:
                delete_data()
                self.stdout.write(e)
            else:
                self.stdout.write("The database has been (re)initlialize.")
