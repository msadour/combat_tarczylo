
from django.contrib.auth import (
    logout as django_logout, authenticate, get_user_model
)
from django.conf import settings

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from api.models import Member, Instructor
from api.serializers import MemberSerializer, InstructorSerializer, AuthTokenSerializer


#
# class MemberDetailViewSet(APIView):
#
#     def post(self, request, *args, **kwargs):
#         user = Token.objects.get(key=request.data['jwt']).user
#         print(user)


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):

        serializer = AuthTokenSerializer()
        user = serializer.validate(attrs=request.data)

        token, created = Token.objects.get_or_create(user=user)
        # member = Member.objects.get(user=user)
        return Response({
            'token': token.key,
            # 'user_id': user.pk,
            'username': user.username,
            'member_id': user.id
        })


@permission_classes((permissions.AllowAny,))
class MemberViewSet(viewsets.ViewSet):

    authentication_classes = (TokenAuthentication,)

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([member.id for member in Member.objects.all()]) + 1
        datas['id'] = new_id
        new_member = Member.objects.create(**datas)
        new_member.save()

        serializer = MemberSerializer(new_member, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = Member.objects.all()
        serializer = MemberSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, username=None):
        queryset = Member.objects.all()
        member = get_object_or_404(queryset, pk=pk)
        serializer = MemberSerializer(member)
        return Response(serializer.data)

    def patch(self, request, pk=None):
        datas = request.data
        member = Member.objects.get(id=pk)
        for attr, value in datas.items():
            setattr(member, attr, value)
        member.save()
        serializer = MemberSerializer(member)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        member = Member.objects.get(id=id)
        member.delete()

        return Response({"message": "Member deleted"})


@permission_classes((permissions.AllowAny,))
class InstructorViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        datas = request.data
        new_id = max([instructor.id for instructor in Instructor.objects.all()]) + 1
        datas['id'] = new_id
        new_instructor = Instructor.objects.create(**datas)
        new_instructor.save()

        serializer = MemberSerializer(new_instructor, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

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

    def delete(self, request, *args, **kwargs):
        id = request.data["id"]
        instructor = Instructor.objects.get(id=id)
        instructor.delete()

        return Response({"message": "Instructor deleted"})


@permission_classes((permissions.AllowAny,))
class LogoutViewSet(viewsets.ViewSet):

    def create(self, request, *args, **kwargs):
        return self.logout(request)

    def logout(self, request):

        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass
        if getattr(settings, 'REST_SESSION_LOGIN', True):
            django_logout(request)

        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        # if getattr(settings, 'REST_USE_JWT', False):
        #     from rest_framework_jwt.settings import api_settings as jwt_settings
        #     if jwt_settings.JWT_AUTH_COOKIE:
        #         response.delete_cookie(jwt_settings.JWT_AUTH_COOKIE)
        return response
