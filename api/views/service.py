"""Service module."""

import re
from typing import Any

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.request import Request
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Course, Internship, Instructor
from api.serializers import CourseSerializer, InternshipSerializer, TimeTable


@permission_classes((permissions.AllowAny,))
class CourseViewSet(viewsets.ModelViewSet):
    """Class CourseViewSet."""

    queryset = Course.objects.all().order_by("id")
    serializer_class = CourseSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        Create a course.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        instructor_id = datas.pop("instructor")
        time_tables = datas.pop("time_table")
        instructor = Instructor.objects.get(id=int(instructor_id))
        datas["instructor"] = instructor
        datas["id"] = get_max_id("Course")
        new_course = Course.objects.create(**datas)

        for time_table in time_tables:
            info = re.split(r"\s", time_table)
            info_time_table = {"day": info[0], "from_hour": info[1], "to_hour": info[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
            new_course.time_table.add(new_time_table)

        serializer = CourseSerializer(new_course, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """
        Update a course.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        course = Course.objects.get(id=pk)
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
                    course.time_table.add(new_time_table)
            else:
                setattr(course, attr, value)
        course.save()
        serializer = CourseSerializer(course)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class InternshipViewSet(viewsets.ModelViewSet):
    """Class InternshipViewSet."""

    queryset = Internship.objects.all().order_by("id")
    serializer_class = InternshipSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        Create an internship.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("Internship")
        instructor_id = datas.pop("instructor")
        instructor = Instructor.objects.get(id=instructor_id)
        datas["instructor_id"] = instructor.id
        time_tables = datas.pop("time_table")
        new_internship = Internship.objects.create(**datas)

        for time_table in time_tables:
            info = re.split(r"\s", time_table)
            info_time_table = {"day": info[0], "from_hour": info[1], "to_hour": info[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
            new_internship.time_table.add(new_time_table)

        serializer = InternshipSerializer(new_internship, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """
        Update an internship.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        internship = Internship.objects.get(id=pk)
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
                    internship.time_table.add(new_time_table)
            else:
                setattr(internship, attr, value)
        internship.save()
        serializer = InternshipSerializer(internship)

        return Response(serializer.data)
