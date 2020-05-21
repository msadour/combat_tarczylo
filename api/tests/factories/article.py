"""Article module."""

import factory
from factory.faker import faker

from api.models import Article

FAKE = faker.Faker()


class ArticleFactory(factory.django.DjangoModelFactory):
    """class ArticleFactory."""

    title = "test article title"
    content = "content category"
    category = "test category"

    class Meta:
        """class Meta."""

        model = Article
