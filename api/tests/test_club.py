from __future__ import absolute_import

import os

from api.tests.factories.member import MemberFactory

os.environ['DJANGO_SETTINGS_MODULE'] = 'combat_tarczylo.settings'
import django
django.setup()

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.user import UserFactory
from api.tests.factories.timetable import TimeTableFactory
from api.tests.factories.club import ClubFactory, PresentationFactory, ImportantMessageFactory

client = APIClient()

url_club = '/api_tct/club/'
url_presentation = '/api_tct/presentation/'
url_message = '/api_tct/important_message/'

monday = TimeTableFactory(day='monday', from_hour='10:00:00', to_hour='18:00:00', year=2020)
saturday = TimeTableFactory(day='saturday', from_hour='10:00:00', to_hour='17:00:00', year=2020)


class ClubTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.club = ClubFactory()

    def test_list(self):
        response = self.client.get(url_club)

        assert len(response.data) > 1

    def test_retrieve(self):
        response = self.client.get(url_club + f'{self.club.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_club = '''{
            "name": "test name",
            "description": "test description",
            "street": "test street",
            "number": "test number",
            "zip_code": "test zip code",
            "city": "test city",
            "country": "test country",
            "time_table": [
                {
                    "day": "monday",
                    "from_hour": "10:00:00",
                    "to_hour": "18:00:00",
                    "year": "2020"
                },
                {
                    "day": "saturday",
                    "from_hour": "10:00:00",
                    "to_hour": "17:00:00",
                    "year": "2020"
                }
            ]
        }'''
        response = client.post(url_club, data=data_club, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):
        ClubFactory().save()

        response = self.client.delete(url_club + str(self.club.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update(self):

        club = ClubFactory.create(
            name='test name',
        )
        club.save()

        request = self.client.patch(url_club + str(club.id) + '/', data={'name': 'new name'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['name'], 'new name')


class PresentationTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.presentation = PresentationFactory()

    def test_list(self):
        response = self.client.get(url_presentation)

        assert len(response.data) > 1

    def test_retrieve(self):
        response = self.client.get(url_presentation + f'{self.presentation.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_presentation = \
            '''{
                "tct": "test tct",
                "darius": "test darius'",
                "technical": "test technical"
            }'''
        response = client.post(url_presentation, data=data_presentation, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        PresentationFactory().save()

        response = self.client.delete(url_presentation + str(self.presentation.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update(self):

        presentation = PresentationFactory.create(
            tct='test tct',
        )
        presentation.save()

        request = self.client.patch(url_presentation + str(presentation.id) + '/', data={'tct': 'new tct'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['tct'], 'new tct')


class ImportantMessageTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.message = ImportantMessageFactory()

    def test_list(self):
        response = self.client.get(url_message)

        assert len(response.data) > 1

    def test_retrieve(self):
        response = self.client.get(url_message + f'{self.message.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_message = \
            '''{
                "content": "test content create"
            }'''
        response = client.post(url_message, data=data_message, content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):
        ImportantMessageFactory().save()

        response = self.client.delete(url_message + str(self.message.id) + '/')

        self.assertEqual(response.status_code, 200)

    def test_partial_update(self):

        message = ImportantMessageFactory.create(
            content='test content',
        )
        message.save()

        request = self.client.patch(url_message + str(message.id) + '/', data={'content': 'new content'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['content'], 'new content')