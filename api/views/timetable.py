import re

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response

from api.models import TimeTable
from api.serializers import TimeTableSerializer


@permission_classes((permissions.AllowAny,))
class TimeTableViewSet(viewsets.ModelViewSet):
    queryset = TimeTable.objects.all()
    serializer_class = TimeTableSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        time_table = datas["time_table"]
        time_table_str = re.split(r"\s", time_table)
        info_time_table = {
            "day": time_table_str[0],
            "from_hour": time_table_str[1],
            "to_hour": time_table_str[2],
        }
        new_time_table = TimeTable.objects.create(**info_time_table)

        serializer = TimeTableSerializer(new_time_table, many=False)

        return Response(serializer.data, status=201)

    def update(self, request, pk=None, *args, **kwargs):
        time_table = request.data
        time_table_object = TimeTable.objects.get(id=pk)
        time_table_str = re.split(r"\s", time_table["time_table_str"])
        info_time_table = {
            "day": time_table_str[0],
            "from_hour": time_table_str[1],
            "to_hour": time_table_str[2],
        }
        for attr, value in info_time_table.items():
            setattr(time_table_object, attr, value)
        time_table_object.save()

        return Response(status=status.HTTP_200_OK)
