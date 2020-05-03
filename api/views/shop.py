from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import Product, Order, Category, Member
from api.serializers import ProductSerializer, OrderSerializer, CategorySerializer


@permission_classes((permissions.AllowAny,))
class OrderViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        member = int(datas.pop('member'))
        products = datas.pop('products')
        new_order = Order.objects.create(**datas)
        new_order.member = Member.objects.get(id=member)
        for product in products:
            product = Product.objects.get(id=int(product))
            new_order.products.add(product)

        serializer = OrderSerializer(new_order, many=False)

        return Response(serializer.data, status=201)

    def list(self, request):
        queryset = Order.objects.all()
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        order = Order.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(order, attr, value)
        order.save()
        serializer = OrderSerializer(order)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        order = Order.objects.get(id=id)
        order.delete()

        return Response({"message": "Order deleted"})


@permission_classes((permissions.AllowAny,))
class ProductViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        category_id = datas.pop('category')
        datas['category'] = Category.objects.get(id=category_id)
        new_product = Product.objects.create(**datas)
        serializer = ProductSerializer(new_product, many=False)

        return Response(serializer.data, status=201)

    def list(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Product.objects.all()
        product = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        product = Product.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(product, attr, value)
        product.save()
        serializer = ProductSerializer(product)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        product = Product.objects.get(id=id)
        product.delete()

        return Response({"message": "Product deleted"})


@permission_classes((permissions.AllowAny,))
class CategoryViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_category = Category.objects.create(**datas)

        serializer = CategorySerializer(new_category, many=False)

        return Response(serializer.data, status=201)

    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Category.objects.all()
        category = get_object_or_404(queryset, pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        category = Category.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(category, attr, value)
        category.save()
        serializer = CategorySerializer(category)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        category = Category.objects.get(id=id)
        category.delete()

        return Response({"message": "Category deleted"})
