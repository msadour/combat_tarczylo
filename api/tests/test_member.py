from __future__ import absolute_import

import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'combat_tarczylo.settings'
import django
django.setup()

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.user import UserFactory
from api.tests.factories.member import MemberFactory, InstructorFactory

client = APIClient()

url_member = "/api_tct/member/"
url_instructor = "/api_tct/instructor/"


class MemberTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = UserFactory()
        self.client.force_authenticate(user=self.user_test)
        self.member = MemberFactory(user=UserFactory())

    def test_list(self):
        response = self.client.get(url_member)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url_member + f'{self.member.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_member = '''{
          "user": {
            "username": "member7@gmail.com",
            "email": "member7@gmail.com",
            "password": "qwertz"
          },
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
        }'''
        response = client.post(url_member, data=data_member, content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        self.client.delete(url_member, data={'id': str(self.member.id)})

        request = self.client.get(url_member).data
        self.assertEqual(len(request), 0)

    def test_partial_update(self):

        member = MemberFactory.create(
            city='paris',
        )
        member.save()

        request = self.client.patch(url_member + str(member.id) + '/', data={'city': 'berlin'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['city'], 'berlin')


class InstructorTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = UserFactory()
        self.client.force_authenticate(user=self.user_test)
        self.instructor = InstructorFactory(user=UserFactory())

    def test_list(self):
        response = self.client.get(url_instructor)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url_instructor + f'{self.instructor.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_instructor = '''{
            "user": {"username": "test", "email": "test@gmail.com", "password": "qwertz"},
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
        }'''
        response = client.post(url_instructor, data=data_instructor, content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        self.client.delete(url_instructor, data={'id': str(self.instructor.id)})

        request = self.client.get(url_instructor).data
        self.assertEqual(len(request), 0)

    def test_partial_update(self):

        instructor = InstructorFactory.create(
            city='paris',
        )
        instructor.save()

        request = self.client.patch(url_instructor + str(instructor.id) + '/', data={'city': 'berlin'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['city'], 'berlin')