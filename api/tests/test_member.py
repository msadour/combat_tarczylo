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
        self.member = MemberFactory()
        self.client.force_authenticate(user=self.member)

    def test_list(self):
        response = self.client.get(url_member)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url_member + f'{self.member.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_member = '''{
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
        }'''
        response = client.post(url_member, data=data_member, content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        response = self.client.delete(url_member + str(self.member.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

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
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.instructor = InstructorFactory()

    def test_list(self):
        response = self.client.get(url_instructor)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url_instructor + f'{self.instructor.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_instructor = '''{
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
        }'''
        response = client.post(url_instructor, data=data_instructor, content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        response = self.client.delete(url_instructor + str(self.instructor.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update(self):

        instructor = InstructorFactory.create(
            city='paris',
        )
        instructor.save()

        request = self.client.patch(url_instructor + str(instructor.id) + '/', data={'city': 'berlin'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['city'], 'berlin')