from django.apps import apps


def get_max_id(model):
    model = apps.get_model('api', model)
    if len(model.objects.all()) == 0:
        return 1
    return model.objects.all().order_by("-id")[0].id + 1
