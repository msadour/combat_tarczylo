"""Test service module."""

from __future__ import absolute_import
import django
import os

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import InstructorFactory, MemberFactory
from api.tests.factories.service import CourseFactory, InternshipFactory

os.environ["DJANGO_SETTINGS_MODULE"] = "combat_tarczylo.settings"

django.setup()

client = APIClient()

url_course = "/api_tct/course/"
url_internship = "/api_tct/internship/"


class CourseTestCase(APITestCase):
    """Class CourseTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.course = CourseFactory()

    def test_list(self) -> None:
        """Test list of course.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_course)

        assert 0 < len(response.data)

    def test_retrieve(self) -> None:
        """Test retrieve a course.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_course + f"{self.course.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create a course.

        Raises:
            AssertError: Assertion failed.
        """
        instructor = InstructorFactory()

        data_course = (
            """{
            "name": "fight",
            "description": "fight hand and foot",
            "level": "white",
            "category": "men",
            "instructor": """
            + str(instructor.id)
            + """,
            "time_table": [
                "monday 10:00:00 18:00:00",
                "saturday 10:00:00 17:00:00"
            ]
        }"""
        )
        response = self.client.post(
            url_course, data=data_course, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete a course.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url_course + str(self.course.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update a course.

        Raises:
            AssertError: Assertion failed.
        """
        course = CourseFactory.create(name="test name",)
        course.save()

        request = self.client.patch(
            url_course + str(course.id) + "/", data={"name": "new name"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["name"], "new name")


class InternshipTestCase(APITestCase):
    """class InternshipTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.internship = InternshipFactory()

    def test_list(self) -> None:
        """Test list of intenrship.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_internship)

        assert 0 < len(response.data)

    def test_retrieve(self) -> None:
        """Test retrieve an internship.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_internship + f"{self.internship.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create an internship.

        Raises:
            AssertError: Assertion failed.
        """
        instructor = InstructorFactory()

        # "date_begin": "2020-04-20 10:00:00",
        # "date_end": "2020-04-20 10:00:00",

        data_internship = (
            """{
            "name": "fight",
            "description": "fight hand and foot",
            "level": "white",
            "category": "men",
            "price": 100,
            "theme": "knife",
            "instructor": """
            + str(instructor.id)
            + """,
            "time_table": [
                "monday 10:00:00 18:00:00",
                "saturday 10:00:00 17:00:00"
            ]
        }"""
        )
        response = self.client.post(
            url_internship, data=data_internship, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete an internship.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url_internship + str(self.internship.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update an internship.

        Raises:
            AssertError: Assertion failed.
        """
        internship = InternshipFactory.create(
            name="test name",
            description="fight hand and foot",
            level="white",
            category="men",
            # date_begin="2020-04-20 10:00:00",
            # date_end="2020-04-20 10:00:00",
            price=100,
            theme="knife",
        )

        internship.instructor = InstructorFactory()
        internship.save()

        request = self.client.patch(
            url_internship + str(internship.id) + "/", data={"name": "new name"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["name"], "new name")
