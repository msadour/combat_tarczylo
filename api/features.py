"""Features module."""
from typing import Any

from django.apps import apps


def get_max_id(model_str: str) -> Any:
    """Return the max ID of the model.

    Args:
        model_str:

    Returns:
        Max ID.
    """
    model = apps.get_model("api", model_str)
    if len(model.objects.all()) == 0:
        return 1
    return model.objects.all().order_by("-id")[0].id + 1
