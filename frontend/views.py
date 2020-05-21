"""Views module."""
from django.http import HttpResponse
from django.shortcuts import render


def index(request, page: str = "") -> HttpResponse:
    """Render to frontend page.

    Args:
        request: Request from client.
        page: Name of page.

    Returns:
        Render page.
    """
    return render(request, "frontend/index.html")
