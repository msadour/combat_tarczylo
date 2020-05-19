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
        time_table = datas['time_table']
        time_table_str = re.split(r'\s', time_table)
        info_time_table = {'day': time_table_str[0], 'from_hour': time_table_str[1], 'to_hour': time_table_str[2]}
        new_time_table = TimeTable.objects.create(**info_time_table)

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
            setattr(time_table, attr, value)

        time_table.save()
        serializer = TimeTableSerializer(time_table)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        TimeTable.objects.get(id=pk).delete()

        return Response({"message": "TimeTable deleted"}, status=status.HTTP_200_OK)
