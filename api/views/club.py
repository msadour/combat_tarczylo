import re

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Club, Presentation, ImportantMessage, TimeTable
from api.serializers import ClubSerializer, PresentationSerializer, ImportantMessageSerializer


@permission_classes((permissions.AllowAny,))
class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas['id'] = get_max_id('Club')
        time_tables = datas.pop('time_table')
        new_club = Club.objects.create(**datas)
        for time_table in time_tables:
            time_table_str = re.split(r'\s', time_table)
            info_time_table = {'day': time_table_str[0], 'from_hour': time_table_str[1], 'to_hour': time_table_str[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
            new_club.time_table.add(new_time_table)

        serializer = ClubSerializer(new_club, many=False)

        return Response(serializer.data, status.HTTP_201_CREATED)

    def patch(self, request, pk=None):
        datas = request.data
        club = Club.objects.get(id=pk)
        for attr, value in datas.items():
            if attr == 'add_time_table':
                for time_table in value:
                    time_table_str = re.split(r'\s', time_table)
                    info_time_table = {'day': time_table_str[0], 'from_hour': time_table_str[1], 'to_hour': time_table_str[2]}
                    new_time_table = TimeTable.objects.create(**info_time_table)
                    club.time_table.add(new_time_table)
            else:
                setattr(club, attr, value)
        club.save()
        serializer = ClubSerializer(club)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class PresentationViewSet(viewsets.ModelViewSet):
    queryset = Presentation.objects.all()
    serializer_class = PresentationSerializer


@permission_classes((permissions.AllowAny,))
class ImportantMessageViewSet(viewsets.ModelViewSet):
    queryset = ImportantMessage.objects.all()
    serializer_class = ImportantMessageSerializer
