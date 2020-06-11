"""article module."""
from typing import Any

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from api.models import Article
from api.permissions import ReadPermission
from api.serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    """Class ArticleViewSet."""

    queryset = Article.objects.all().order_by("id")
    serializer_class = ArticleSerializer
    permission_classes = (ReadPermission, IsAuthenticated)

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
            serializer = ArticleSerializer(self.queryset, many=True)
            return Response(serializer.data, status=200)
        return super().list(request, *args, **kwargs)
