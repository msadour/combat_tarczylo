from django.urls import path, re_path
from frontend.views import index

urlpatterns = [
    # path('', index)

    # match the root
    path(r'', index),
    # match all other pages
    path(r'<str>', index),

]