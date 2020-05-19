import datetime
import re

from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.forms.models import model_to_dict
from django.db import models
from django.contrib.auth.models import PermissionsMixin

from api.managers import CustomUserManager


class BookAdviced(models.Model):
    name = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=255, blank=True)


class Article(models.Model):
    title = models.CharField(max_length=255, blank=True)
    content = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)


class ImportantMessage(models.Model):
    content = models.CharField(max_length=255, blank=True)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)
    is_active = models.BooleanField(default=False)


class Presentation(models.Model):
    tct = models.CharField(max_length=255, blank=True)
    darius = models.CharField(max_length=255, blank=True)
    technical = models.CharField(max_length=255, blank=True)


class TimeTable(models.Model):
    day = models.CharField(max_length=255, blank=True)
    from_hour = models.TimeField()
    to_hour = models.TimeField()
    year = models.IntegerField(default=datetime.datetime.now().year)

    def display_as_str(self):
        return str(self.day) + " " + str(self.from_hour) + " " + str(self.to_hour)


class Club(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    street = models.CharField(max_length=255, blank=True)
    number = models.CharField(max_length=255, blank=True)
    zip_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)


class Member(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    postal_code = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    street = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=255, blank=True)
    insurance_name = models.CharField(max_length=255, blank=True)
    insurance_number = models.CharField(max_length=255, blank=True)
    birthday = models.CharField(max_length=255, blank=True)
    sex = models.CharField(max_length=255, blank=True)
    level = models.CharField(max_length=255, blank=True)

    USERNAME_FIELD = "username"

    objects = CustomUserManager()

    def get_full_name(self):
        return self.first_name + " " + self.last_name


class Instructor(Member):
    biography = models.CharField(max_length=255, blank=True)


class Course(models.Model):
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    place = models.CharField(max_length=255, blank=True)
    level = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)

    def get_full_name_instructor(self):
        return {"id": self.instructor.id, "full_name": self.instructor.get_full_name()}


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

    def add_time_table(self, time_tables):
        for time_table in time_tables:
            time_table_str = re.split(r"\s", time_table)
            new_time_table = TimeTable(time_table_str=time_table_str)
            self.time_table.add(new_time_table)


class Category(models.Model):
    name = models.CharField(max_length=255, blank=True)

    def get_products(self):
        return [model_to_dict(product) for product in self.product_set.all()]

    def delete_all_products(self):
        self.product_set.all().delete()


class Product(models.Model):
    name = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_available = models.IntegerField()
    size = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def get_category(self):
        return model_to_dict(self.category, fields=["id", "name"])


class Order(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, null=True)
    products = models.ManyToManyField(Product)
    is_bought = models.BooleanField(default=False)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)


class PendingSubscription(models.Model):
    email = models.EmailField()
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    birthday = models.DateTimeField()
    sex = models.CharField(max_length=255, blank=True)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)
    is_pending = models.BooleanField(default=True)
