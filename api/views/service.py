"""Service module."""

import re
from datetime import datetime
from typing import Any

from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.request import Request
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Course, Internship, Instructor
from api.permissions import ReadPermission
from api.serializers import CourseSerializer, InternshipSerializer, TimeTable


class CourseViewSet(viewsets.ModelViewSet):
    """Class CourseViewSet."""

    queryset = Course.objects.all().order_by("id")
    serializer_class = CourseSerializer
    permission_classes = (ReadPermission,)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """List of course.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        if request.query_params:
            search = request.query_params
            self.queryset = self.queryset.filter(
                Q(name__contains=search["search"])
                | Q(description__contains=search["search"])
                | Q(place=search["search"])
                | Q(level=search["search"])
                | Q(category=search["search"])
            )
            serializer = CourseSerializer(self.queryset, many=True)
            return Response(serializer.data, status=200)
        return super().list(request, *args, **kwargs)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a course.

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
        """Update a course.

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


class InternshipViewSet(viewsets.ModelViewSet):
    """Class InternshipViewSet."""

    queryset = Internship.objects.all().order_by("id")
    serializer_class = InternshipSerializer
    permission_classes = (ReadPermission,)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """List of internship.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        if request.query_params:
            search = request.query_params
            self.queryset = self.queryset.filter(
                Q(name__contains=search["search"])
                | Q(description__contains=search["search"])
                | Q(place=search["search"])
                | Q(level=search["search"])
                | Q(theme=search["search"])
                | Q(category=search["search"])
            )
            serializer = InternshipSerializer(self.queryset, many=True)
            return Response(serializer.data, status=200)
        return super().list(request, *args, **kwargs)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create an internship.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("Internship")
        datas["date_end"] = (
            None
            if datas["date_end"]
            else datetime.strptime(datas["date_end"], "%Y-%m-%d")
        )
        datas["date_begin"] = datetime.strptime(datas["date_begin"], "%Y-%m-%d")
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
        """Update an internship.

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
                if attr in ["date_begin", "date_end"]:
                    value = datetime.datetime.strptime(value, "%Y-%m-%d")
                setattr(internship, attr, value)
        internship.save()
        serializer = InternshipSerializer(internship)

        return Response(serializer.data)
