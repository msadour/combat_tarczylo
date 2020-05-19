from django.contrib.auth import logout as django_logout
from django.conf import settings

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from api.features import get_max_id
from api.models import Member, Instructor
from api.serializers import MemberSerializer, InstructorSerializer, AuthTokenSerializer


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):

        serializer = AuthTokenSerializer()
        user = serializer.validate(attrs=request.data)

        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {"token": token.key, "username": user.username, "member_id": user.id}
        )


@permission_classes((permissions.AllowAny,))
class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by("id")
    serializer_class = MemberSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas["id"] = get_max_id("Member")
        new_member = Member.objects.create_user(**datas)

        serializer = MemberSerializer(new_member, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        datas = request.data
        member = Member.objects.get(id=pk)
        for attr, value in datas.items():
            if attr == "password":
                member.set_password(value)
            else:
                setattr(member, attr, value)
        member.save()
        serializer = MemberSerializer(member)

        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all().order_by("id")
    serializer_class = InstructorSerializer

    def create(self, request, *args, **kwargs):
        datas = request.data
        datas["id"] = get_max_id("Member")
        new_instructor = Instructor.objects.create(**datas)

        serializer = InstructorSerializer(new_instructor, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        datas = request.data
        instructor = Instructor.objects.get(id=pk)
        for attr, value in datas.items():
            if attr == "password":
                instructor.set_password(value)
            else:
                setattr(instructor, attr, value)
        instructor.save()
        serializer = InstructorSerializer(instructor)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class LogoutViewSet(viewsets.ViewSet):
    def create(self, request, *args, **kwargs):
        return self.logout(request)

    def logout(self, request):

        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass
        if getattr(settings, "REST_SESSION_LOGIN", True):
            django_logout(request)

        response = Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_200_OK
        )

        return response
