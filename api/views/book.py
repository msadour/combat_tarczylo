from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes

from api.models import BookAdviced
from api.serializers import BookAdvicedSerializer


@permission_classes((permissions.AllowAny,))
class BookViewSet(viewsets.ModelViewSet):
    queryset = BookAdviced.objects.all().order_by("id")
    serializer_class = BookAdvicedSerializer
