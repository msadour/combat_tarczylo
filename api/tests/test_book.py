"""Test book module."""

from __future__ import absolute_import
import os
import django

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import MemberFactory
from api.tests.factories.book import BookAdvicedFactory

os.environ["DJANGO_SETTINGS_MODULE"] = "combat_tarczylo.settings"
django.setup()

client = APIClient()

url = "/api_tct/book/"


class BookAdvicedTestCase(APITestCase):
    """class BookAdvicedTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.book = BookAdvicedFactory()

    def test_list(self) -> None:
        """
        Test list of books.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self) -> None:
        """
        Test retrieve an book.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url + f"{self.book.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """
        Test create a book.

        Raises:
            AssertError: Assertion failed.
        """
        data_book = """{
            "name": "test name",
            "author": "test author",
            "category": "test category",
             "url": "test url"
        }"""
        response = self.client.post(
            url, data=data_book, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """
        Test delete a book.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url + str(self.book.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """
        Test update a book.

        Raises:
            AssertError: Assertion failed.
        """
        book = BookAdvicedFactory.create(
            name="test name",
            author="test author",
            category="test category",
            url="test url",
        )
        book.save()

        request = self.client.patch(url + str(book.id) + "/", data={"name": "new name"})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["name"], "new name")
