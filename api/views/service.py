import re

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.features import get_max_id
from api.models import Course, Internship, Instructor
from api.serializers import CourseSerializer, InternshipSerializer, TimeTable


@permission_classes((permissions.AllowAny,))
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        instructor_id = datas.pop('instructor')
        time_tables = datas.pop('time_table')
        instructor = Instructor.objects.get(id=int(instructor_id))
        datas['instructor'] = instructor
        datas['id'] = get_max_id('Course')
        new_course = Course.objects.create(**datas)

        for time_table in time_tables:
            time_table_str = re.split(r'\s', time_table)
            info_time_table = {'day': time_table_str[0], 'from_hour': time_table_str[1], 'to_hour': time_table_str[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
            new_course.time_table.add(new_time_table)

        serializer = CourseSerializer(new_course, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, pk=None):
        datas = request.data
        course = Course.objects.get(id=pk)
        for attr, value in datas.items():
            if attr == 'add_time_table':
                for time_table in value:
                    time_table_str = re.split(r'\s', time_table)
                    info_time_table = {'day': time_table_str[0], 'from_hour': time_table_str[1], 'to_hour': time_table_str[2]}
                    new_time_table = TimeTable.objects.create(**info_time_table)
                    course.time_table.add(new_time_table)
            else:
                setattr(course, attr, value)
        course.save()
        serializer = CourseSerializer(course)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas['id'] = get_max_id('Internship')
        instructor_id = datas.pop('instructor')
        instructor = Instructor.objects.get(id=instructor_id)
        datas['instructor_id'] = instructor.id
        time_tables = datas.pop('time_table')
        new_internship = Internship.objects.create(**datas)

        for time_table in time_tables:
            time_table_str = re.split(r'\s', time_table)
            info_time_table = {'day': time_table_str[0], 'from_hour': time_table_str[1], 'to_hour': time_table_str[2]}
            new_time_table = TimeTable.objects.create(**info_time_table)
            new_internship.time_table.add(new_time_table)

        serializer = InternshipSerializer(new_internship, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, pk=None):
        datas = request.data
        internship = Internship.objects.get(id=pk)
        for attr, value in datas.items():
            if attr == 'add_time_table':
                for time_table in value:
                    time_table_str = re.split(r'\s', time_table)
                    info_time_table = {'day': time_table_str[0], 'from_hour': time_table_str[1], 'to_hour': time_table_str[2]}
                    new_time_table = TimeTable.objects.create(**info_time_table)
                    internship.time_table.add(new_time_table)
            else:
                setattr(internship, attr, value)
        internship.save()
        serializer = InternshipSerializer(internship)

        return Response(serializer.data)
