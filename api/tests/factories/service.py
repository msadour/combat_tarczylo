import factory

from api.models import Course, Internship
from .member import InstructorFactory


class CourseFactory(factory.django.DjangoModelFactory):

    name = "test name"
    description = "test description"
    place = "test place"
    level = "test level"
    category = "test category"
    instructor = factory.SubFactory(InstructorFactory)

    class Meta:
        model = Course


class InternshipFactory(factory.django.DjangoModelFactory):

    name = "test name"
    description = "test description"
    place = "test place"
    level = "test level"
    category = "test category"
    instructor = factory.SubFactory(InstructorFactory)
    date_begin = "2020-04-20 10:00:00"
    date_end = "2020-04-20 10:00:00"
    price = 100.00
    theme = "theme test"

    class Meta:
        model = Internship
