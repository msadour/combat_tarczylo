import factory
from factory.faker import faker

from api.models import Member, Instructor

FAKE = faker.Faker()


def generate_username(*args):
    """ returns a random username """
    return FAKE.profile(fields=['username'])['username']


class MemberFactory(factory.django.DjangoModelFactory):

    username = factory.LazyAttribute(generate_username)
    email = factory.LazyAttribute(generate_username)
    password = 'qwertz'
    postal_code = "75019"
    city = "Paris"
    street = "street test"
    country = "France"
    phone = "015555555"
    insurance_name = "name member"
    insurance_number = "number"
    birthday = ""
    sex = "man"
    level = "blue"

    class Meta:
        model = Member


class InstructorFactory(factory.django.DjangoModelFactory):

    username = factory.LazyAttribute(generate_username)
    email = factory.LazyAttribute(generate_username)
    password = 'qwertz'
    postal_code = "75019"
    city = "Paris"
    street = "street test"
    country = "France"
    phone = "015555555"
    insurance_name = "name instructor"
    insurance_number = "number"
    birthday = ""
    sex = "man"
    level = "blue"
    biography = "biography test"

    class Meta:
        model = Instructor
