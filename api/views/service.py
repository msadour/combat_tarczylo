from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import Course, Internship
from api.serializers import CourseSerializer, InternshipSerializer


@permission_classes((permissions.AllowAny,))
class CourseViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Course.objects.all()
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Course.objects.all()
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class InternshipViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Internship.objects.all()
        serializer = InternshipSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Internship.objects.all()
        internship = get_object_or_404(queryset, pk=pk)
        serializer = InternshipSerializer(internship)
        return Response(serializer.data)
