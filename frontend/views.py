from django.shortcuts import render


def index(request, str=''):
    return render(request, "frontend/index.html")
