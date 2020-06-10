"""Book module."""
from typing import Any

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
        if request.query_params:
            search = {key: value for key, value in request.query_params.items()}
            self.queryset = self.queryset.filter(**search)
            serializer = BookAdvicedSerializer(self.queryset, many=True)
            return Response(serializer.data, status=200)
        return super().list(request, *args, **kwargs)
