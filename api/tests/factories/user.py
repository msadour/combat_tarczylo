from random import random

import factory
from django.contrib.auth.models import User
from factory.faker import faker

FAKE = faker.Faker()


def generate_username(*args):
    """ returns a random username """
    return FAKE.profile(fields=['username'])['username']


class UserFactory(factory.django.DjangoModelFactory):
    """
    Class UserFactory.
    """

    username = factory.LazyAttribute(generate_username)
    email = factory.LazyAttribute(generate_username)
    password = 'qwertz'

    class Meta:
        model = User