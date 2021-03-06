"""Member module."""

import os
from typing import Any

from django.contrib.auth import logout as django_logout
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import permission_classes, action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from api.features import get_max_id
from api.models import Member, Instructor
from api.permissions import UserPermission
from api.serializers import MemberSerializer, InstructorSerializer, AuthTokenSerializer


class MemberViewSet(viewsets.ModelViewSet):
    """Class MemberViewSet."""

    queryset = Member.objects.all().order_by("id")
    serializer_class = MemberSerializer
    permission_classes = (UserPermission,)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """
        List of member.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        return super().list(request, *args, **kwargs)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create a member.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("Member")
        new_member = Member.objects.create_user(**datas)

        serializer = MemberSerializer(new_member, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """Update a member.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        member = Member.objects.get(id=pk)
        self.check_object_permissions(request=request, obj=member)
        for attr, value in datas.items():
            if attr == "password":
                member.set_password(value)
            else:
                setattr(member, attr, value)
        member.save()
        serializer = MemberSerializer(member)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["PATCH"])
    def upload(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """Upload a profile picture.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        member = Member.objects.get(id=pk)

        if member.picture.name == "default.png":
            member.picture = None
        else:
            os.remove("media/" + member.picture.name)
        picture = request.data.get("picture")
        filename = "member_{}.{}".format(member.pk, "png")
        picture.name = filename

        member.picture = picture
        member.save()

        return Response({"message": "Picture uploaded"}, status=status.HTTP_200_OK)


class InstructorViewSet(viewsets.ModelViewSet):
    """Class InstructorViewSet."""

    queryset = Instructor.objects.all().order_by("id")
    serializer_class = InstructorSerializer
    permission_classes = (UserPermission,)  # IsAuthenticated)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """List of instructor.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        if request.query_params:
            search = {key: value for key, value in request.query_params.items()}
            self.queryset = self.queryset.filter(**search)
            serializer = InstructorSerializer(self.queryset, many=True)
            return Response(serializer.data, status=200)
        return super().list(request, *args, **kwargs)

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create an instructor.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        datas = request.data
        datas["id"] = get_max_id("Member")
        new_instructor = Instructor.objects.create(**datas)

        serializer = InstructorSerializer(new_instructor, many=False)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """Update an instructor.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
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

    @action(detail=True, methods=["PATCH"])
    def upload(
        self, request: Request, pk: int = None, *args: Any, **kwargs: Any
    ) -> Response:
        """Upload a profile picture.

        Args:
            request: request sent by the client.
            pk: id of the object to be updated.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        instructor = Instructor.objects.get(id=pk)

        if instructor.picture == "default.png":
            instructor.picture = None
        else:
            os.remove("media/" + instructor.picture.name)
        picture = request.data.get("picture")
        filename = "instructor_{}.{}".format(instructor.pk, "png")
        picture.name = filename

        instructor.picture = picture
        instructor.save()

        return Response({"message": "Picture uploaded"}, status=status.HTTP_200_OK)


@permission_classes((permissions.AllowAny,))
class CustomAuthToken(ObtainAuthToken):
    """Class CustomAuthToken."""

    authentication_classes = [TokenAuthentication]

    def post(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Create token for authentication.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        serializer = AuthTokenSerializer()

        try:
            user = serializer.validate(attrs=request.data)
        except Exception:
            return Response(status=404)

        request.user = user

        token, created = Token.objects.get_or_create(user=user)

        return Response(
            {
                "token": token.key,
                "username": user.username,
                "member_id": user.id,
                "is_admin": user.is_superuser,
            }
        )


@permission_classes((permissions.AllowAny,))
class LogoutViewSet(viewsets.ViewSet):
    """Class LogoutViewSet."""

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        """Log out.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        return self.logout(request)

    def logout(self, request: Request) -> Response:
        """Log out.

        Args:
            request: request sent by the client.
            args: Variable length argument list.
            options: Arbitrary keyword arguments.

        Returns:
            Response from the server.
        """
        try:
            request.user.auth_token.delete()
        except (AttributeError, ObjectDoesNotExist):
            pass
        if getattr(settings, "REST_SESSION_LOGIN", True):
            django_logout(request)

        response = Response(
            {"detail": "Successfully logged out."},
            status=status.HTTP_200_OK,
            headers={"Access-Control-Allow-Credentials": True},
        )

        return response
