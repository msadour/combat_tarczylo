"""Book module."""
from typing import Any

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response

from api.models import BookAdviced
from api.permissions import ReadPermission
from api.serializers import BookAdvicedSerializer


class BookViewSet(viewsets.ModelViewSet):
    """Class BookViewSet."""

    queryset = BookAdviced.objects.all().order_by("id")
    serializer_class = BookAdvicedSerializer
    permission_classes = (ReadPermission,)

    @method_decorator(cache_page(60 * 60 * 12))
    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        List of book.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        return super().list(request, *args, **kwargs)
