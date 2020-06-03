"""article module."""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.models import Article
from api.permissions import ReadPermission
from api.serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    """Class ArticleViewSet."""

    queryset = Article.objects.all().order_by("id")
    serializer_class = ArticleSerializer
    permission_classes = (ReadPermission, IsAuthenticated)
