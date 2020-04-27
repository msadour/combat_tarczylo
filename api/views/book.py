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