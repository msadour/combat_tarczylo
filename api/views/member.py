from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from api.models import Member, Instructor
from api.serializers import MemberSerializer, InstructorSerializer


@permission_classes((permissions.AllowAny,))
class MemberViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Member.objects.all()
        serializer = MemberSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Member.objects.all()
        member = get_object_or_404(queryset, pk=pk)
        serializer = MemberSerializer(member)
        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class InstructorViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Instructor.objects.all()
        serializer = InstructorSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Instructor.objects.all()
        instructor = get_object_or_404(queryset, pk=pk)
        serializer = InstructorSerializer(instructor)
        return Response(serializer.data)
