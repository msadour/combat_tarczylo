from django.urls import path
from frontend.views import index

urlpatterns = [
    # path('', index)
    # match the root
    path(r"", index),
    # match all other pages
    path(r"<str>", index),
]
