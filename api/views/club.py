from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import Club, Presentation, ImportantMessage, TimeTable
from api.serializers import ClubSerializer, PresentationSerializer, ImportantMessageSerializer


@permission_classes((permissions.AllowAny,))
class ClubViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([club.id for club in Club.objects.all()]) + 1
        datas['id'] = new_id
        time_tables = datas.pop('time_table')
        new_club = Club.objects.create(**datas)

        for time_table in time_tables:
            new_time_table = TimeTable.objects.create(**time_table)
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
            setattr(club, attr, value)
        club.save()
        serializer = ClubSerializer(club)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        club = Club.objects.get(id=id)
        club.delete()

        return Response({"message": "Club deleted"}, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class PresentationViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([club.id for club in Presentation.objects.all()]) + 1
        datas['id'] = new_id
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

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        presentation = Presentation.objects.get(id=id)
        presentation.delete()

        return Response({"message": "Presentation deleted"}, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class ImportantMessageViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([message.id for message in ImportantMessage.objects.all()]) + 1
        datas['id'] = new_id
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

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        message = ImportantMessage.objects.get(id=id)
        message.delete()

        return Response({"message": "Message deleted"}, status=status.HTTP_200_OK)
