"""Shop module."""

import os
from typing import Any

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Product, Order, Category, Member
from api.serializers import ProductSerializer, OrderSerializer, CategorySerializer


class OrderViewSet(viewsets.ModelViewSet):
    """Class OrderViewSet."""

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create an order.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
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


class ProductViewSet(viewsets.ModelViewSet):
    """Class ProductViewSet."""

    queryset = Product.objects.all().order_by("id")
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)

    @action(detail=True, methods=["PATCH"])
    def upload(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """Upload a picture.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        product = Product.objects.get(id=pk)

        if product.picture == "default.png":
            product.picture = None
        else:
            os.remove("media/" + product.picture.name)
        picture = request.data.get("picture")
        filename = "product_{}.{}".format(product.pk, "png")
        picture.name = filename

        product.picture = picture
        product.save()

        return Response({"message": "Picture uploaded"}, status=status.HTTP_200_OK)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """List of product.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            kwargs: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        return super().list(request, *args, **kwargs)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a product.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("Product")
        category_id = datas.pop("category")
        datas["category"] = Category.objects.get(id=category_id)
        new_product = Product.objects.create(**datas)
        serializer = ProductSerializer(new_product, many=False)

        return Response(serializer.data, status=201)


class CategoryViewSet(viewsets.ModelViewSet):
    """Class CategoryViewSet."""

    queryset = Category.objects.all().order_by("id")
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a category.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("Category")
        new_category = Category.objects.create(**datas)

        serializer = CategorySerializer(new_category, many=False)

        return Response(serializer.data, status=201)
