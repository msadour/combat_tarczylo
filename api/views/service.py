import re

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Course, Internship, Instructor
from api.serializers import CourseSerializer, InternshipSerializer, TimeTable


@permission_classes((permissions.AllowAny,))
class CourseViewSet(viewsets.ViewSet):

    def create(self, request):
        datas = request.data
        instructor_id = datas.pop('instructor')
        time_tables = datas.pop('time_table')
        instructor = Instructor.objects.get(id=int(instructor_id))
        datas['instructor'] = instructor
        datas['id'] = get_max_id('Course')
        new_course = Course.objects.create(**datas)

        for time_table in time_tables:
            if isinstance(time_table, str):
                info = re.split(r'\s', time_table)
                info_time_table = {'day': info[0], 'from_hour': info[1], 'to_hour': info[2]}
                new_time_table = TimeTable.objects.create(**info_time_table)
            else:
                new_time_table = TimeTable.objects.create(**time_table)
            new_course.time_table.add(new_time_table)

        serializer = CourseSerializer(new_course, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = Course.objects.all()
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Course.objects.all()
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        course = Course.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(course, attr, value)
        course.save()
        serializer = CourseSerializer(course)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        Course.objects.get(id=pk).delete()
        return Response({"message": "Course deleted"}, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class InternshipViewSet(viewsets.ViewSet):

    def create(self, request):
        datas = request.data
        datas['id'] = get_max_id('Internship')
        instructor_id = datas.pop('instructor')
        instructor = Instructor.objects.get(id=instructor_id)
        datas['instructor_id'] = instructor.id
        time_tables = datas.pop('time_table')
        new_internship = Internship.objects.create(**datas)

        for time_table in time_tables:
            if isinstance(time_table, str):
                info = re.split(r'\s', time_table)
                info_time_table = {'day': info[0], 'from_hour': info[1], 'to_hour': info[2]}
                new_time_table = TimeTable.objects.create(**info_time_table)
            else:
                new_time_table = TimeTable.objects.create(**time_table)
            new_internship.time_table.add(new_time_table)

        serializer = InternshipSerializer(new_internship, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = Internship.objects.all()
        serializer = InternshipSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Internship.objects.all()
        internship = get_object_or_404(queryset, pk=pk)
        serializer = InternshipSerializer(internship)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        internship = Internship.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(internship, attr, value)
        internship.save()
        serializer = InternshipSerializer(internship)

        return Response(serializer.data)

    def delete(self, request, pk=None):
        Internship.objects.get(id=pk).delete()
        return Response({"message": "Internship deleted"}, status=status.HTTP_200_OK)
