import factory
from factory.faker import faker

from api.models import Club, Presentation, ImportantMessage
from .timetable import TimeTableFactory

FAKE = faker.Faker()


class ClubFactory(factory.django.DjangoModelFactory):

    name = 'test name'
    description = 'test description'
    street = 'test street'
    number = 'test number'
    zip_code = 'test zip code'
    city = 'test city'
    country = 'test country'

    class Meta:
        model = Club


class PresentationFactory(factory.django.DjangoModelFactory):

    tct = 'test tct'
    darius = 'content darius'
    technical = 'test technical'

    class Meta:
        model = Presentation


class ImportantMessageFactory(factory.django.DjangoModelFactory):

    content = 'test content'

    class Meta:
        model = ImportantMessage
