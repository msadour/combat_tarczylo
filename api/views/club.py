"""Club module."""

import re
from typing import Any

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from api.features import get_max_id
from api.models import ClubInformation, Presentation, ImportantMessage, TimeTable
from api.permissions import ReadPermission
from api.serializers import (
    ClubSerializer,
    PresentationSerializer,
    ImportantMessageSerializer,
)


class ClubViewSet(viewsets.ModelViewSet):
    """Class ClubViewSet."""

    queryset = ClubInformation.objects.all()
    serializer_class = ClubSerializer
    permission_classes = (ReadPermission,)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Retrieve the club.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        club = ClubInformation.objects.all()[0]
        serializer = ClubSerializer(club, many=False)

        return Response(serializer.data, status.HTTP_201_CREATED)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create the club.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("ClubInformation")
        time_tables = datas.pop("time_table")
        new_club = ClubInformation.objects.create(**datas)

        for time_table in time_tables:
            info = re.split(r"\s", time_table)
            info_time_table = {"day": info[0], "from_hour": info[1], "to_hour": info[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
            new_club.time_table.add(new_time_table)

        serializer = ClubSerializer(new_club, many=False)

        return Response(serializer.data, status.HTTP_201_CREATED)

    def update(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
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
        club = ClubInformation.objects.get(id=pk)
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


class PresentationViewSet(viewsets.ModelViewSet):
    """Class PresentationViewSet."""

    queryset = Presentation.objects.all()
    serializer_class = PresentationSerializer
    permission_classes = (ReadPermission,)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
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


class ImportantMessageViewSet(viewsets.ModelViewSet):
    """Class ImportantMessageViewSet."""

    queryset = ImportantMessage.objects.all()
    serializer_class = ImportantMessageSerializer
    permission_classes = (ReadPermission, IsAuthenticated)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
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
