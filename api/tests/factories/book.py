import factory
from factory.faker import faker

from api.models import BookAdviced

FAKE = faker.Faker()


class BookAdvicedFactory(factory.django.DjangoModelFactory):

    name = "test book name"
    author = "test author"
    category = "test category"
    url = "test url"

    class Meta:
        model = BookAdviced
