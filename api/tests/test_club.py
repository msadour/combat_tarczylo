"""Test club module."""

from __future__ import absolute_import
import django
import os


from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import MemberFactory
from api.tests.factories.club import (
    ClubFactory,
    PresentationFactory,
    ImportantMessageFactory,
)

os.environ["DJANGO_SETTINGS_MODULE"] = "combat_tarczylo.settings"

django.setup()

client = APIClient()

url_club = "/api_tct/club/"
url_presentation = "/api_tct/presentation/"
url_message = "/api_tct/important_message/"


class ClubTestCase(APITestCase):
    """class ClubTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.club = ClubFactory()

    def test_list(self) -> None:
        """Test list of club.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_club)

        assert len(response.data) > 0

    def test_retrieve(self) -> None:
        """Test retrieve of club.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_club + f"{self.club.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create of club.

        Raises:
            AssertError: Assertion failed.
        """
        data_club = """{
            "name": "test name",
            "description": "test description",
            "street": "test street",
            "number": "test number",
            "zip_code": "test zip code",
            "city": "test city",
            "country": "test country",
            "time_table": [
                "monday 10:00:00 18:00:00",
                "saturday 10:00:00 17:00:00"
            ]
        }"""

        response = client.post(
            url_club, data=data_club, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete of club.

        Raises:
            AssertError: Assertion failed.
        """
        ClubFactory().save()

        response = self.client.delete(url_club + str(self.club.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update of club.

        Raises:
            AssertError: Assertion failed.
        """
        club = ClubFactory.create(name="test name",)
        club.save()

        request = self.client.patch(
            url_club + str(club.id) + "/", data={"name": "new name"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["name"], "new name")


class PresentationTestCase(APITestCase):
    """class BookAdvicedTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.presentation = PresentationFactory()

    def test_list(self) -> None:
        """Test list of presentations.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_presentation)

        assert len(response.data) > 0

    def test_retrieve(self) -> None:
        """Test retrieve an presentation.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_presentation + f"{self.presentation.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create an presentation.

        Raises:
            AssertError: Assertion failed.
        """
        data_presentation = """{
                "tct": "test tct",
                "darius": "test darius'",
                "technical": "test technical"
            }"""
        response = client.post(
            url_presentation, data=data_presentation, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete an presentation.

        Raises:
            AssertError: Assertion failed.
        """
        PresentationFactory().save()

        response = self.client.delete(
            url_presentation + str(self.presentation.id) + "/"
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update an presentation.

        Raises:
            AssertError: Assertion failed.
        """
        presentation = PresentationFactory.create(tct="test tct",)
        presentation.save()

        request = self.client.patch(
            url_presentation + str(presentation.id) + "/", data={"tct": "new tct"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["tct"], "new tct")


class ImportantMessageTestCase(APITestCase):
    """class ImportantMessageTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.message = ImportantMessageFactory()

    def test_list(self) -> None:
        """Test list of message.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_message)

        assert len(response.data) > 0

    def test_retrieve(self) -> None:
        """Test retrieve a message.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_message + f"{self.message.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create a message.

        Raises:
            AssertError: Assertion failed.
        """
        data_message = """{
                "content": "test content create"
            }"""
        response = client.post(
            url_message, data=data_message, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete a message.

        Raises:
            AssertError: Assertion failed.
        """
        ImportantMessageFactory().save()

        response = self.client.delete(url_message + str(self.message.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update a message.

        Raises:
            AssertError: Assertion failed.
        """
        message = ImportantMessageFactory.create(content="test content",)
        message.save()

        request = self.client.patch(
            url_message + str(message.id) + "/", data={"content": "new content"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["content"], "new content")
