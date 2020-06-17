"""Test time table module."""

from __future__ import absolute_import
import os
import django

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import MemberFactory
from api.tests.factories.timetable import TimeTableFactory

django.setup()

os.environ["DJANGO_SETTINGS_MODULE"] = "combat_tarczylo.settings"

client = APIClient()

url = "/api_tct/time_table/"


class TimeTableTestCase(APITestCase):
    """class TimeTableTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.time_table = TimeTableFactory(
            day="saturday", from_hour="10:00", to_hour="17:00", year=2020
        )

    def test_list(self) -> None:
        """Test list of time tables.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url)

        assert len(response.data) > 0

    def test_retrieve(self) -> None:
        """Test retrieve a timetable.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url + f"{self.time_table.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_create(self) -> None:
    #     """Test create a timetable.
    #
    #     Raises:
    #         AssertError: Assertion failed.
    #     """
    #     data_time_table = """{
    #         "time_table": [
    #             "monday 10:00:00 18:00:00",
    #             "saturday 10:00:00 17:00:00"
    #         ]
    #     }"""
    #     response = self.client.post(
    #         url, data=data_time_table, content_type="application/json"
    #     )
    #
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    def test_delete(self) -> None:
        """Test delete a timetable.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url + str(self.time_table.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update a timetable.

        Raises:
            AssertError: Assertion failed.
        """
        time_table = TimeTableFactory(
            day="tuesday", from_hour="11:00", to_hour="15:30", year="2020"
        )

        request = self.client.patch(
            url + str(time_table.id) + "/",
            data={"time_table_str": "Wednesday: 11:00 15:30"},
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
