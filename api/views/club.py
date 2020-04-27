from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import Club
from api.serializers import ClubSerializer


@permission_classes((permissions.AllowAny,))
class ClubViewSet(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        queryset = Club.objects.all()
        club = get_object_or_404(queryset, pk=pk)
        serializer = ClubSerializer(club)
        return Response(serializer.data)