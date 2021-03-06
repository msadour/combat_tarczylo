"""Timetable module."""

import factory

from api.models import TimeTable


class TimeTableFactory(factory.django.DjangoModelFactory):
    """class TimeTableFactory."""

    from_hour = "10:00:00"
    to_hour = "18:00:00"
    year = 2020

    class Meta:
        """class Meta."""

        model = TimeTable
