"""Views module."""

from django.shortcuts import render


def index(request, page=""):
    """Render to frontend page.

    Args:
        request: Request from client.
        page: Name of page.

    Returns:
        Render page.
    """
    return render(request, "frontend/index.html")
