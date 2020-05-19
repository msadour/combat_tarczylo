import re

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Club, Presentation, ImportantMessage, TimeTable
from api.serializers import ClubSerializer, PresentationSerializer, ImportantMessageSerializer


@permission_classes((permissions.AllowAny,))
class ClubViewSet(viewsets.ViewSet):

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

    def list(self, request):
        queryset = Club.objects.all()[0]
        serializer = ClubSerializer(queryset, many=False)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Club.objects.all()
        club = get_object_or_404(queryset, pk=pk)
        serializer = ClubSerializer(club)
        return Response(serializer.data)

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

    def delete(self, request, pk=None):
        Club.objects.get(id=pk).delete()

        return Response({"message": "Club deleted"}, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class PresentationViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas['id'] = get_max_id('Presentation')
        new_presentation = Presentation.objects.create(**datas)

        serializer = PresentationSerializer(new_presentation, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = Presentation.objects.all()[0]
        serializer = PresentationSerializer(queryset, many=False)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Presentation.objects.all()
        presentation = get_object_or_404(queryset, pk=pk)
        serializer = ImportantMessageSerializer(presentation)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        presentation = Presentation.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(presentation, attr, value)
        presentation.save()
        serializer = PresentationSerializer(presentation)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        Presentation.objects.get(id=pk).delete()

        return Response({"message": "Presentation deleted"}, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class ImportantMessageViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        ImportantMessage.objects.get(id=1).delete()
        datas = request.data
        datas['id'] = 1
        new_message = ImportantMessage.objects.create(**datas)
        serializer = ImportantMessageSerializer(new_message, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = ImportantMessage.objects.all()[0]
        serializer = ImportantMessageSerializer(queryset, many=False)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = ImportantMessage.objects.all()
        message = get_object_or_404(queryset, pk=pk)
        serializer = ImportantMessageSerializer(message)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        important_message = ImportantMessage.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(important_message, attr, value)
        important_message.save()
        serializer = ImportantMessageSerializer(important_message)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        ImportantMessage.objects.get(id=pk).delete()

        return Response({"message": "Message deleted"}, status=status.HTTP_200_OK)
