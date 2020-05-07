from __future__ import absolute_import

import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'combat_tarczylo.settings'
import django
django.setup()

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import InstructorFactory, MemberFactory
from api.tests.factories.service import CourseFactory, InternshipFactory

client = APIClient()

url_course = '/api_tct/course/'
url_internship = '/api_tct/internship/'


class CourseTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.course = CourseFactory()

    def test_list(self):
        response = self.client.get(url_course)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url_course + f'{self.course.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        instructor = InstructorFactory()

        data_course = '''{
            "name": "fight",
            "description": "fight hand and foot",
            "level": "white",
            "category": "men",
            "instructor": ''' + str(instructor.id) + ''',
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
        response = client.post(url_course, data=data_course, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        self.client.delete(url_course, data={'id': str(self.course.id)})

        request = self.client.get(url_course).data
        self.assertEqual(len(request), 0)

    def test_partial_update(self):

        course = CourseFactory.create(
            name='test name',
        )
        course.save()

        request = self.client.patch(url_course + str(course.id) + '/', data={'name': 'new name'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['name'], 'new name')


class InternshipTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.internship = InternshipFactory()

    def test_list(self):
        response = self.client.get(url_internship)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url_internship + f'{self.internship.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        instructor = InstructorFactory()

        data_internship = '''{
            "name": "fight",
            "description": "fight hand and foot",
            "level": "white",
            "category": "men",
            "date_begin": "2020-04-20 10:00:00",
            "date_end": "2020-04-20 10:00:00",
            "price": 100,
            "theme": "knife",
            "instructor": ''' + str(instructor.id) + ''',
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
        response = client.post(url_internship, data=data_internship, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        self.client.delete(url_internship, data={'id': str(self.internship.id)})

        request = self.client.get(url_internship).data
        self.assertEqual(len(request), 0)

    def test_partial_update(self):

        internship = InternshipFactory.create(
            name='test name',
            description="fight hand and foot",
            level="white",
            category="men",
            date_begin="2020-04-20 10:00:00",
            date_end="2020-04-20 10:00:00",
            price=100,
            theme="knife"
        )
        # internship.time_table.add(monday)
        # internship.time_table.add(saturday)
        internship.instructor = InstructorFactory()
        internship.save()

        request = self.client.patch(url_internship + str(internship.id) + '/', data={'name': 'new name'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['name'], 'new name')