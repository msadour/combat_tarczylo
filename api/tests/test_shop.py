from __future__ import absolute_import

import os

from factory.faker import faker

from api.models import Category

os.environ['DJANGO_SETTINGS_MODULE'] = 'combat_tarczylo.settings'
import django
django.setup()

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import MemberFactory
from api.tests.factories.shop import CategoryFactory, ProductFactory, OrderFactory

client = APIClient()

url_category = '/api_tct/category/'
url_order = '/api_tct/order/'
url_product = '/api_tct/product/'


class CategoryTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.category = CategoryFactory()

    def test_list(self):
        response = self.client.get(url_category)

        assert 0 < len(response.data)

    def test_retrieve(self):
        response = self.client.get(url_category + f'{self.category.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        data_category = '''{
            "name": "test name"
        }'''

        response = client.post(url_category, data=data_category, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        response = self.client.delete(url_category + str(self.category.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self):
        # Create a book
        # request our API to update his title with 'new title'
        # Check if the title has been updated

        category = CategoryFactory.create(
            name='test name',
        )
        category.save()

        request = self.client.patch(url_category + str(category.id) + '/', data={'name': 'new name'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['name'], 'new name')


class ProductTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.product = ProductFactory()

    def test_list(self):
        response = self.client.get(url_product)

        assert 0 < len(response.data)

    def test_retrieve(self):
        response = self.client.get(url_product + f'{self.product.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):

        category = CategoryFactory(name='test category name')

        data_product = '''{
            "name": "test name",
            "price": 15.00,
            "quantity_available": 15,
            "size": "M",
            "category": ''' + str(category.id) + '''
        }'''

        response = client.post(url_product, data=data_product, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        response = self.client.delete(url_product + str(self.product.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self):

        product = ProductFactory.create(
            name='test name',
            price=15.00,
            quantity_available=15,
            size='M',
            category=CategoryFactory()
        )
        product.save()

        request = self.client.patch(url_product + str(product.id) + '/', data={'name': 'new name'})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['name'], 'new name')


class OrderTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.order = OrderFactory()
        self.order.products.add(ProductFactory())
        self.order.products.add(ProductFactory())

    def test_list(self):
        response = self.client.get(url_order)

        assert 0 < len(response.data)

    def test_retrieve(self):
        response = self.client.get(url_order + f'{self.order.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        member = MemberFactory()
        product_one = ProductFactory()
        product_two = ProductFactory()
        data_order = '''{
            "date_creation": "2020-04-20 10:00:00",
            "member": ''' + str(member.id) + ''',
            "products": [''' + str(product_one.id) + ''', ''' + str(product_two.id) + '''],
            "is_bought": false
        }'''

        response = client.post(url_order, data=data_order, content_type='application/json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):

        response = self.client.delete(url_order + str(self.order.id) + '/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self):
        # Create a book
        # request our API to update his title with 'new title'
        # Check if the title has been updated

        order = OrderFactory.create(
            date_creation="2020-04-20 10:00:00",
            member=MemberFactory(),
            products=(ProductFactory(), ProductFactory()),
            is_bought=False
        )
        order.save()

        request = self.client.patch(url_order + str(order.id) + '/', data={'is_bought': True})

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data['is_bought'], True)