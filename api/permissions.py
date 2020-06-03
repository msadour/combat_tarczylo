"""Permissions."""

from typing import Any

from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.viewsets import ModelViewSet


class ReadPermission(permissions.BasePermission):
    """Class ContentPermission."""

    def has_permission(self, request: Request, view: ModelViewSet) -> Any:
        """Check permission for CRUD.

        Args:
            request: request sent by the client.
            view: Variable length argument list.

        Returns:
            Boolean that check if user has permission for CRUD.
        """
        if request.method == "GET":
            return True
        elif request.method in ["POST", "DELETE", "PATCH"]:
            return request.user.is_superuser
        return False


class UserPermission(permissions.BasePermission):
    """Class UserPermission."""

    def has_permission(self, request: Request, view: ModelViewSet) -> Any:
        """Check permission for CRUD.

        Args:
            request: request sent by the client.
            view: Variable length argument list.

        Returns:
            Boolean that check if user has permission for CRUD.
        """
        return True

    def has_object_permission(
        self, request: Request, view: ModelViewSet, obj: Any
    ) -> Any:
        """Check permission, for CRUD, for one object.

        Args:
            request: request sent by the client.
            view: Variable length argument list.
            obj:

        Returns:
            Boolean that check if user has permission for CRUD.
        """
        if request.method == "PATCH":
            return obj == request.user
        if request.method == "POST":
            return True
        return obj == request.user or request.user.is_superuser
