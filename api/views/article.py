from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes

from api.models import Article
from api.serializers import ArticleSerializer


@permission_classes((permissions.AllowAny,))
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('id')
    serializer_class = ArticleSerializer
