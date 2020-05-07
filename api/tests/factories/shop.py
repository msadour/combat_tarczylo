import factory

from api.models import Category, Product, Order
from api.tests.factories.member import MemberFactory


class CategoryFactory(factory.django.DjangoModelFactory):
    name = 'test category name'

    class Meta:
        model = Category


class ProductFactory(factory.django.DjangoModelFactory):
    name = 'test product name'
    price = 10.00
    quantity_available = 10
    size = 'L'
    category = factory.SubFactory(CategoryFactory)

    class Meta:
        model = Product


class OrderFactory(factory.django.DjangoModelFactory):
    date_creation = "2020-04-20 10:00:00"
    member = factory.SubFactory(MemberFactory)
    products = (factory.SubFactory(ProductFactory), )
    is_bought = False

    @factory.post_generation
    def products(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        if extracted:
            # A list of groups were passed in, use them
            for product in extracted:
                self.products.add(product)

    class Meta:
        model = Order