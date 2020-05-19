from __future__ import absolute_import
import os ;

from api.tests.factories.member import MemberFactory

os.environ['DJANGO_SETTINGS_MODULE'] = 'combat_tarczylo.settings'
import django ; django.setup()

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.timetable import TimeTableFactory

client = APIClient()

url = '/api_tct/time_table/'


class TimeTableTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.time_table = TimeTableFactory(day='saturday', from_hour='10:00:00', to_hour='17:00:00', year=2020)

    def test_list(self):
        response = self.client.get(url)

        assert len(response.data) > 0

    def test_retrieve(self):
        response = self.client.get(url + f'{self.time_table.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_article = '''{
            "time_table" : "tuesday 11:00:00 15:30:00"
        }'''
        response = client.post(url, data=data_article, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        response = self.client.delete(url + str(self.time_table.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self):

        time_table = TimeTableFactory(
            day="tuesday",
            from_hour="11:00:00",
            to_hour="15:30:00",
            year="2020"
        )

        request = self.client.patch(url + str(time_table.id) + '/', data={'day': 'wednesday'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['day'], 'wednesday')
