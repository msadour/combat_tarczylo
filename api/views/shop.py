from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Product, Order, Category, Member
from api.serializers import ProductSerializer, OrderSerializer, CategorySerializer


@permission_classes((permissions.AllowAny,))
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        member = int(datas.pop("member"))
        products = datas.pop("products")
        new_order = Order.objects.create(**datas)
        new_order.member = Member.objects.get(id=member)
        for product in products:
            product = Product.objects.get(id=int(product))
            new_order.products.add(product)

        serializer = OrderSerializer(new_order, many=False)

        return Response(serializer.data, status=201)


@permission_classes((permissions.AllowAny,))
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("id")
    serializer_class = ProductSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas["id"] = get_max_id("Product")
        category_id = datas.pop("category")
        datas["category"] = Category.objects.get(id=category_id)
        new_product = Product.objects.create(**datas)
        serializer = ProductSerializer(new_product, many=False)

        return Response(serializer.data, status=201)


@permission_classes((permissions.AllowAny,))
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("id")
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas["id"] = get_max_id("Category")
        new_category = Category.objects.create(**datas)

        serializer = CategorySerializer(new_category, many=False)

        return Response(serializer.data, status=201)
