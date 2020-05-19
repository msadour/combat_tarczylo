from __future__ import absolute_import

import os

from api.tests.factories.member import MemberFactory

os.environ['DJANGO_SETTINGS_MODULE'] = 'combat_tarczylo.settings'
import django
django.setup()

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.article import ArticleFactory

client = APIClient()

url = '/api_tct/article/'


class ArticleTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.article = ArticleFactory()

    def test_list(self):
        response = self.client.get(url)

        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        response = self.client.get(url + f'{self.article.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_article = '''{
            "title": "test title",
            "content": "test content",
            "category": "test category"
        }'''
        response = client.post(url, data=data_article, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):
        article = ArticleFactory()

        response = self.client.delete(url + str(article.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self):
        # Create a book
        # request our API to update his title with 'new title'
        # Check if the title has been updated

        article = ArticleFactory.create(
            title='test title',
            content='test content',
            category='test category'
        )
        article.save()

        request = self.client.patch(url + str(article.id) + '/', data={'title': 'new title'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['title'], 'new title')
