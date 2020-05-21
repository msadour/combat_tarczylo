"""Club module."""

import factory
from factory.faker import faker

from api.models import Club, Presentation, ImportantMessage

FAKE = faker.Faker()


class ClubFactory(factory.django.DjangoModelFactory):
    """class ClubFactory."""

    name = "test name"
    description = "test description"
    street = "test street"
    number = "test number"
    zip_code = "test zip code"
    city = "test city"
    country = "test country"

    class Meta:
        """class Meta."""

        model = Club


class PresentationFactory(factory.django.DjangoModelFactory):
    """class PresentationFactory."""

    tct = "test tct"
    darius = "content darius"
    technical = "test technical"

    class Meta:
        """class Meta."""

        model = Presentation


class ImportantMessageFactory(factory.django.DjangoModelFactory):
    """class BookAdvicedFactory."""

    content = "test content"

    class Meta:
        """class Meta."""

        model = ImportantMessage
