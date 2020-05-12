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
        new_article = TimeTable.objects.create(**datas)
        serializer = TimeTableSerializer(new_article, many=False)

        return Response(serializer.data, status=201)

    def list(self, request):
        queryset = TimeTable.objects.all()
        serializer = TimeTableSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = TimeTable.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = TimeTableSerializer(user)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        article = TimeTable.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(article, attr, value)
        article.save()
        serializer = TimeTableSerializer(article)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        TimeTable.objects.get(id=pk).delete()

        return Response({"message": "TimeTable deleted"}, status=status.HTTP_200_OK)
