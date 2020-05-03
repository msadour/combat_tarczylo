from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import Article
from api.serializers import ArticleSerializer


@permission_classes((permissions.AllowAny,))
class ArticleViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):

        datas = request.data
        new_article = Article.objects.create(**datas)
        serializer = ArticleSerializer(new_article, many=False)

        return Response(serializer.data, status=201)

    def list(self, request):
        queryset = Article.objects.all()
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Article.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ArticleSerializer(user)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        article = Article.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(article, attr, value)
        article.save()
        serializer = ArticleSerializer(article)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        article = Article.objects.get(id=id)
        article.delete()

        return Response({"message": "Article deleted"}, status=status.HTTP_200_OK)