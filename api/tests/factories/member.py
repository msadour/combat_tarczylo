import factory

from api.models import Member, Instructor
from api.tests.factories.user import UserFactory


class MemberFactory(factory.django.DjangoModelFactory):

    user = factory.SubFactory(UserFactory)
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

    user = factory.SubFactory(UserFactory)
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
