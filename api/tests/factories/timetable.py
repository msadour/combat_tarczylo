import factory

from api.models import TimeTable


class TimeTableFactory(factory.django.DjangoModelFactory):

    from_hour = '10:00:00'
    to_hour = '18:00:00'
    year = 2020

    class Meta:
        model = TimeTable