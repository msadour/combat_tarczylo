"""Test shop module."""

from __future__ import absolute_import
import django
import os

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from api.tests.factories.member import MemberFactory
from api.tests.factories.shop import CategoryFactory, ProductFactory, OrderFactory

os.environ["DJANGO_SETTINGS_MODULE"] = "combat_tarczylo.settings"
django.setup()

client = APIClient()

url_category = "/api_tct/category/"
url_order = "/api_tct/order/"
url_product = "/api_tct/product/"


class CategoryTestCase(APITestCase):
    """class CategoryTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.category = CategoryFactory()

    def test_list(self) -> None:
        """Test list of categories.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_category)

        assert 0 < len(response.data)

    def test_retrieve(self) -> None:
        """Test retrieve an category.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_category + f"{self.category.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create an category.

        Raises:
            AssertError: Assertion failed.
        """
        data_category = """{
            "name": "test name"
        }"""

        response = self.client.post(
            url_category, data=data_category, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete an category.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url_category + str(self.category.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update an category.

        Raises:
            AssertError: Assertion failed.
        """
        category = CategoryFactory.create(name="test name",)
        category.save()

        request = self.client.patch(
            url_category + str(category.id) + "/", data={"name": "new name"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["name"], "new name")


class ProductTestCase(APITestCase):
    """class ProductTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.product = ProductFactory()

    def test_list(self) -> None:
        """Test list of products.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_product)

        assert 0 < len(response.data)

    def test_retrieve(self) -> None:
        """Test retrieve a product.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_product + f"{self.product.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create a product.

        Raises:
            AssertError: Assertion failed.
        """
        category = CategoryFactory(name="test category name")

        data_product = (
            """{
            "name": "test name",
            "price": 15.00,
            "quantity_available": 15,
            "size": "M",
            "category": """
            + str(category.id)
            + """
        }"""
        )

        response = self.client.post(
            url_product, data=data_product, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete a product.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url_product + str(self.product.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test update a product.

        Raises:
            AssertError: Assertion failed.
        """
        product = ProductFactory.create(
            name="test name",
            price=15.00,
            quantity_available=15,
            size="M",
            category=CategoryFactory(),
        )
        product.save()

        request = self.client.patch(
            url_product + str(product.id) + "/", data={"name": "new name"}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["name"], "new name")


class OrderTestCase(APITestCase):
    """class OrderTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)
        self.order = OrderFactory()
        self.order.products.add(ProductFactory())
        self.order.products.add(ProductFactory())

    def test_list(self) -> None:
        """Test list of orders.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_order)

        assert 0 < len(response.data)

    def test_retrieve(self) -> None:
        """Test retrieve an order.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.get(url_order + f"{self.order.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self) -> None:
        """Test create an order.

        Raises:
            AssertError: Assertion failed.
        """
        member = MemberFactory()
        product_one = ProductFactory()
        product_two = ProductFactory()
        data_order = (
            """{
            "date_creation": "2020-04-20 10:00:00",
            "member": """
            + str(member.id)
            + """,
            "products": ["""
            + str(product_one.id)
            + """, """
            + str(product_two.id)
            + """],
            "is_bought": false
        }"""
        )

        response = self.client.post(
            url_order, data=data_order, content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self) -> None:
        """Test delete an order.

        Raises:
            AssertError: Assertion failed.
        """
        response = self.client.delete(url_order + str(self.order.id) + "/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_partial_update(self) -> None:
        """Test delete an order.

        Raises:
            AssertError: Assertion failed.
        """
        order = OrderFactory.create(
            date_creation="2020-04-20 10:00:00",
            member=MemberFactory(),
            products=(ProductFactory(), ProductFactory()),
            is_bought=False,
        )
        order.save()

        request = self.client.patch(
            url_order + str(order.id) + "/", data={"is_bought": True}
        )

        self.assertEqual(request.status_code, status.HTTP_200_OK)
        self.assertEqual(request.data["is_bought"], True)
