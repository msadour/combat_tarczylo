from django.forms import model_to_dict
from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes, action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from django.contrib.auth.models import User

from api.models import Member, Instructor
from api.serializers import MemberSerializer, InstructorSerializer


@permission_classes((permissions.AllowAny,))
class MemberViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([member.id for member in Member.objects.all()]) + 1
        datas['id'] = new_id
        user_data = datas.pop('user')
        new_member = Member.objects.create(**datas)
        user = User.objects.create_user(**user_data)
        new_member.user = user
        new_member.save()

        serializer = MemberSerializer(new_member, many=False)

        return Response(serializer.data)

    def list(self, request):
        queryset = Member.objects.all()
        serializer = MemberSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Member.objects.all()
        member = get_object_or_404(queryset, pk=pk)
        serializer = MemberSerializer(member)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        member = Member.objects.get(id=pk)
        member.user.delete()
        member.delete()

        return Response({"message": "Member deleted"})

    def patch(self, request, pk=None):
        datas = request.data
        member = Member.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(member, attr, value)
        member.save()
        serializer = MemberSerializer(member)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class InstructorViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([instructor.id for instructor in Instructor.objects.all()]) + 1
        datas['id'] = new_id
        user_data = datas.pop('user')
        new_instructor = Instructor.objects.create(**datas)
        user = User.objects.create_user(**user_data)
        new_instructor.user = user
        new_instructor.save()

        serializer = MemberSerializer(new_instructor, many=False)

        return Response(serializer.data)

    def list(self, request):
        queryset = Instructor.objects.all()
        serializer = InstructorSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Instructor.objects.all()
        instructor = get_object_or_404(queryset, pk=pk)
        serializer = InstructorSerializer(instructor)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        instructor = Instructor.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(instructor, attr, value)
        instructor.save()
        serializer = InstructorSerializer(instructor)

        return Response(serializer.data)
