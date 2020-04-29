from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import BookAdviced
from api.serializers import BookAdvicedSerializer


@permission_classes((permissions.AllowAny,))
class BookViewSet(viewsets.ViewSet):

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

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        book = BookAdviced.objects.get(id=id)
        book.user.delete()
        book.delete()

        return Response({"message": "Book deleted"})