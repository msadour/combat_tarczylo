from __future__ import absolute_import

import os

from api.tests.factories.member import MemberFactory

os.environ['DJANGO_SETTINGS_MODULE'] = 'combat_tarczylo.settings'
import django
django.setup()

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.book import BookAdvicedFactory

client = APIClient()

url = '/api_tct/book/'


class BookAdvicedTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.book = BookAdvicedFactory()

    def test_list(self):
        response = self.client.get(url)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url + f'{self.book.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_book = '''{
            "name": "test name",
            "author": "test author",
            "category": "test category",
             "url": "test url"
        }'''
        response = client.post(url, data=data_book, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        self.client.delete(url, data={'id': str(self.book.id)})

        request = self.client.get(url).data
        self.assertEqual(len(request), 0)

    def test_partial_update(self):
        # Create a book
        # request our API to update his title with 'new title'
        # Check if the title has been updated

        book = BookAdvicedFactory.create(
            name='test name',
            author='test author',
            category='test category',
            url='test url'
        )
        book.save()

        request = self.client.patch(url + str(book.id) + '/', data={'name': 'new name'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['name'], 'new name')