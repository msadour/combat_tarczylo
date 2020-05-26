"""Book module."""

from rest_framework import viewsets

from api.models import BookAdviced
from api.permissions import ReadPermission
from api.serializers import BookAdvicedSerializer


class BookViewSet(viewsets.ModelViewSet):
    """Class BookViewSet."""

    queryset = BookAdviced.objects.all().order_by("id")
    serializer_class = BookAdvicedSerializer
    permission_classes = (ReadPermission,)
