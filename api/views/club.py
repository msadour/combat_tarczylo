"""Club module."""

import re

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Club, Presentation, ImportantMessage, TimeTable
from api.serializers import (
    ClubSerializer,
    PresentationSerializer,
    ImportantMessageSerializer,
)


@permission_classes((permissions.AllowAny,))
class ClubViewSet(viewsets.ModelViewSet):
    """Class ClubViewSet."""

    queryset = Club.objects.all()
    serializer_class = ClubSerializer

    def list(self, request, *args, **kwargs):
        """Retrieve the club.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        club = Club.objects.all()[0]
        serializer = ClubSerializer(club, many=False)

        return Response(serializer.data, status.HTTP_201_CREATED)

    def create(self, request, *args, **kwargs):
        """Create the club.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("Club")
        time_tables = datas.pop("time_table")
        new_club = Club.objects.create(**datas)

        for time_table in time_tables:
            info = re.split(r"\s", time_table)
            info_time_table = {"day": info[0], "from_hour": info[1], "to_hour": info[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
            new_club.time_table.add(new_time_table)

        serializer = ClubSerializer(new_club, many=False)

        return Response(serializer.data, status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        """Update the club.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        club = Club.objects.get(id=pk)
        for attr, value in datas.items():
            if attr == "add_time_table":
                for time_table in value:
                    time_table_str = re.split(r"\s", time_table)
                    info_time_table = {
                        "day": time_table_str[0],
                        "from_hour": time_table_str[1],
                        "to_hour": time_table_str[2],
                    }
                    new_time_table = TimeTable.objects.create(**info_time_table)
                    club.time_table.add(new_time_table)
            else:
                setattr(club, attr, value)
        club.save()
        serializer = ClubSerializer(club)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class PresentationViewSet(viewsets.ModelViewSet):
    """Class PresentationViewSet."""

    queryset = Presentation.objects.all()
    serializer_class = PresentationSerializer

    def list(self, request, *args, **kwargs):
        """Retrieve the current presentation.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        presentation = Presentation.objects.all()[0]
        serializer = PresentationSerializer(presentation, many=False)

        return Response(serializer.data, status.HTTP_201_CREATED)


@permission_classes((permissions.AllowAny,))
class ImportantMessageViewSet(viewsets.ModelViewSet):
    """Class ImportantMessageViewSet."""

    queryset = ImportantMessage.objects.all()
    serializer_class = ImportantMessageSerializer

    def list(self, request, *args, **kwargs):
        """Retrieve the current important message.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        message = ImportantMessage.objects.all()[0]
        serializer = ImportantMessageSerializer(message, many=False)

        return Response(serializer.data, status.HTTP_201_CREATED)
