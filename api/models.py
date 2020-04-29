import datetime
from django.utils import timezone

from django.forms.models import model_to_dict
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


# class IPVisitor(models.Model):
#     pass


class BookAdviced(models.Model):
    name = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=255, blank=True)


class Article(models.Model):
    title = models.CharField(max_length=255, blank=True)
    content = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    #photo field


class ImportantMessage(models.Model):
    content = models.CharField(max_length=255, blank=True)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)


class Presentation(models.Model):
    tct = models.CharField(max_length=255, blank=True)
    darius = models.CharField(max_length=255, blank=True)
    technical = models.CharField(max_length=255, blank=True)


class TimeTable(models.Model):
    day = models.CharField(max_length=255, blank=True)
    from_hour = models.TimeField()
    to_hour = models.TimeField()
    year = models.IntegerField(default=datetime.datetime.now().year)


class Club(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    street = models.CharField(max_length=255, blank=True)
    number = models.CharField(max_length=255, blank=True)
    zip_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)


class Member(models.Model):
    user = models.ForeignKey(User, related_name='member', on_delete=models.CASCADE, null=True)
    postal_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    street = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    insurance_name = models.CharField(max_length=255, blank=True)
    insurance_number = models.CharField(max_length=255, blank=True)
    birthday = models.CharField(max_length=255, blank=True)
    sex = models.CharField(max_length=255, blank=True)
    level = models.CharField(max_length=255, blank=True)

    def get_user(self):
        return model_to_dict(self.user)

    def get_full_name(self):
        return self.user.first_name + " " + self.user.last_name


class Instructor(Member):
    biography = models.CharField(max_length=255, blank=True)

    def get_user(self):
        return model_to_dict(self.user)


class Course(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    place = models.CharField(max_length=255, blank=True)
    level = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)

    def get_full_name_instructor(self):
        return {'id': self.instructor.id, 'full_name': self.instructor.get_full_name()}


class Internship(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    place = models.CharField(max_length=255, blank=True)
    level = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    date_begin = models.DateTimeField(null=True, blank=True)
    date_end = models.DateTimeField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=5)
    theme = models.CharField(max_length=255, blank=True)


class Category(models.Model):
    name = models.CharField(max_length=255, blank=True)

    def get_products(self):
        return [model_to_dict(product) for product in self.product_set.all()]


class Product(models.Model):
    name = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_available = models.IntegerField()
    size = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def get_category(self):
        return model_to_dict(self.category, fields=['id', 'name'])


class Order(models.Model):
    date = models.DateTimeField(null=True, blank=True)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    is_bought = models.BooleanField(default=False)


class PendingSubscription(models.Model):
    email = models.EmailField()
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    birthday = models.DateTimeField()
    sex = models.CharField(max_length=255, blank=True)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)
    is_pending = models.BooleanField(default=True)
