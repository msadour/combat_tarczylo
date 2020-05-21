"""Urls module."""

from django.urls import path
from frontend.views import index

urlpatterns = [
    path(r"", index),
    path(r"<page>", index),
]
