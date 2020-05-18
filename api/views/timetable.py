import re

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import TimeTable
from api.serializers import TimeTableSerializer


@permission_classes((permissions.AllowAny,))
class TimeTableViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        if 'time_table_str' in datas.keys():
            time_table = datas['time_table_str']
            info = re.split(r'\s', time_table)
            info_time_table = {'day': info[0], 'from_hour': info[1], 'to_hour': info[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
        else:
            new_time_table = TimeTable.objects.create(**datas)
        serializer = TimeTableSerializer(new_time_table, many=False)

        return Response(serializer.data, status=201)

    def list(self, request):
        queryset = TimeTable.objects.all().order_by('id')
        serializer = TimeTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = TimeTable.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = TimeTableSerializer(user)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        time_table = TimeTable.objects.get(id=pk)

        for attr, value in datas.items():
            if attr == 'time_table_str':
                info = re.split(r'\s', value)
                info_time_table = {'day': info[0], 'from_hour': info[1], 'to_hour': info[2]}
                for attr_tt, value_tt in info_time_table.items():
                    setattr(time_table, attr_tt, value_tt)
            else:
                setattr(time_table, attr, value)
        time_table.save()
        serializer = TimeTableSerializer(time_table)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        TimeTable.objects.get(id=pk).delete()

        return Response({"message": "TimeTable deleted"}, status=status.HTTP_200_OK)
