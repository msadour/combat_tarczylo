from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.features import get_max_id
from api.models import BookAdviced
from api.serializers import BookAdvicedSerializer


@permission_classes((permissions.AllowAny,))
class BookViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas['id'] = get_max_id('BookAdviced')
        new_article = BookAdviced.objects.create(**datas)

        serializer = BookAdvicedSerializer(new_article, many=False)

        return Response(serializer.data, status=201)

    def list(self, request):
        queryset = BookAdviced.objects.all()
        serializer = BookAdvicedSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = BookAdviced.objects.all()
        book = get_object_or_404(queryset, pk=pk)
        serializer = BookAdvicedSerializer(book)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        book = BookAdviced.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(book, attr, value)
        book.save()
        serializer = BookAdvicedSerializer(book)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        BookAdviced.objects.get(id=pk).delete()
        return Response({"message": "BookAdviced deleted"}, status=status.HTTP_200_OK)
