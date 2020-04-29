from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import Club, Presentation, ImportantMessage
from api.serializers import ClubSerializer, PresentationSerializer, ImportantMessageSerializer


@permission_classes((permissions.AllowAny,))
class ClubViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([club.id for club in Club.objects.all()]) + 1
        datas['id'] = new_id
        new_club = Club.objects.create(**datas)

        serializer = ClubSerializer(new_club, many=False)

        return Response(serializer.data)

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


@permission_classes((permissions.AllowAny,))
class PresentationViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([club.id for club in Presentation.objects.all()]) + 1
        datas['id'] = new_id
        new_presentation = Presentation.objects.create(**datas)

        serializer = PresentationSerializer(new_presentation, many=False)

        return Response(serializer.data)

    def list(self, request):
        queryset = Presentation.objects.all()[0]
        serializer = PresentationSerializer(queryset, many=False)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Presentation.objects.all()
        presentation = get_object_or_404(queryset, pk=pk)
        serializer = ImportantMessage(presentation)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        presentation = Presentation.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(presentation, attr, value)
        presentation.save()
        serializer = PresentationSerializer(presentation)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class ImportantMessageViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([message.id for message in ImportantMessage.objects.all()]) + 1
        datas['id'] = new_id
        new_message = ImportantMessage.objects.create(**datas)

        serializer = ImportantMessageSerializer(new_message, many=False)

        return Response(serializer.data)

    def list(self, request):
        queryset = ImportantMessage.objects.all()[0]
        serializer = ImportantMessageSerializer(queryset, many=False)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = ImportantMessage.objects.all()
        message = get_object_or_404(queryset, pk=pk)
        serializer = ImportantMessage(message)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        important_message = ImportantMessage.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(important_message, attr, value)
        important_message.save()
        serializer = PresentationSerializer(important_message)

        return Response(serializer.data)