"""Test member module."""

from __future__ import absolute_import
import django
import os

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import MemberFactory, InstructorFactory

os.environ["DJANGO_SETTINGS_MODULE"] = "combat_tarczylo.settings"

django.setup()

client = APIClient()

url_member = "/api_tct/member/"
url_instructor = "/api_tct/instructor/"


class MemberTestCase(APITestCase):
    """class MemberTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.member = MemberFactory()
        self.client.force_authenticate(user=self.member)

    def test_list(self) -> None:
        """Test list of members.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_member)

        assert len(response.data) > 0

    def test_retrieve(self) -> None:
        """Test retrieve a member.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_member + f"{self.member.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create a member.

        Raises:
            AssertError: Assertion failed.
        """
        data_member = """{
          "username": "member7@gmail.com",
          "email": "member7@gmail.com",
          "password": "qwertz",
          "first_name": "fname2",
          "last_name": "lname2",
          "postal_code": "13051",
          "city": "berlin",
          "street": "rue du membre 4",
          "country": "Germany",
          "phone": "06111111",
          "insurance_name": "insurencemember1",
          "insurance_number": "12345678",
          "birthday": "25/05/1992 10:00:00",
          "sex": "male",
          "level": "white"
        }"""
        response = self.client.post(
            url_member, data=data_member, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete a member.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url_member + str(self.member.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update a member.

        Raises:
            AssertError: Assertion failed.
        """
        request = self.client.patch(
            url_member + str(self.member.id) + "/", data={"city": "berlin"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["city"], "berlin")


class InstructorTestCase(APITestCase):
    """class InstructorTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.instructor = InstructorFactory()

    def test_list(self) -> None:
        """
        Test list of instructor.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_instructor)

        assert 0 < len(response.data)

    def test_retrieve(self) -> None:
        """
        Test retrieve an instructor.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_instructor + f"{self.instructor.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """
        Test create an instructor.

        Raises:
            AssertError: Assertion failed.
        """
        data_instructor = """{
            "username": "instructor@gmail.com",
            "email": "instructor@gmail.com",
            "password": "qwertz",
            "first_name": "fname2",
            "last_name": "lname2",
            "postal_code": "88888",
            "city": "varsovie",
            "street": "rue du membre 3",
            "country": "Poland",
            "phone": "0366111111",
            "insurance_name": "insurencemember1",
            "insurance_number": "123456",
            "birthday": "20/05/1992 10:00:00",
            "sex": "male",
            "level": "black",
            "biography": "biography test"
        }"""
        response = self.client.post(
            url_instructor, data=data_instructor, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """
        Test delete an instructor.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url_instructor + str(self.instructor.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """
        Test update an instructor.

        Raises:
            AssertError: Assertion failed.
        """
        instructor = InstructorFactory.create(city="paris",)
        instructor.save()

        request = self.client.patch(
            url_instructor + str(instructor.id) + "/", data={"city": "berlin"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["city"], "berlin")
