"""Shop module."""

import factory

from api.models import Category, Product, Order
from api.tests.factories.member import MemberFactory


class CategoryFactory(factory.django.DjangoModelFactory):
    """class CourseFactory."""

    name = "test category name"

    class Meta:
        """class Meta."""

        model = Category


class ProductFactory(factory.django.DjangoModelFactory):
    """class ProductFactory."""

    name = "test product name"
    price = 10.00
    quantity_available = 10
    size = "L"
    category = factory.SubFactory(CategoryFactory)

    class Meta:
        """class Meta."""

        model = Product


class OrderFactory(factory.django.DjangoModelFactory):
    """class OrderFactory."""

    date_creation = "2020-04-20 10:00:00"
    member = factory.SubFactory(MemberFactory)
    products = (factory.SubFactory(ProductFactory),)
    is_bought = False

    @factory.post_generation
    def products(self, create, extracted, **kwargs):
        """Add product in an order.

        Args:
            create: This is the first param.
            extracted: This is a second param.
            kwargs: This is a second param.
        """
        if not create:
            return

        if extracted:
            for product in extracted:
                self.products.add(product)

    class Meta:
        """class Meta."""

        model = Order
