"""Models module."""

import datetime
from typing import List, Dict, Any

from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.forms.models import model_to_dict
from django.db import models
from django.contrib.auth.models import PermissionsMixin

from api.managers import CustomUserManager


class BookAdviced(models.Model):
    """Class BookAdviced."""

    name = models.CharField(max_length=255, blank=True)
    author = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    url = models.CharField(max_length=255, blank=True)


class Article(models.Model):
    """Class Article."""

    title = models.CharField(max_length=255, blank=True)
    content = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)


class ImportantMessage(models.Model):
    """Class ImportantMessage."""

    content = models.CharField(max_length=255, blank=True)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)
    is_active = models.BooleanField(default=False)


class Presentation(models.Model):
    """Class Presentation."""

    name_club = models.CharField(max_length=255, blank=True)
    tct = models.CharField(max_length=255, blank=True)
    darius = models.CharField(max_length=255, blank=True)
    technical = models.CharField(max_length=255, blank=True)


class TimeTable(models.Model):
    """Class TimeTable."""

    day = models.CharField(max_length=255, blank=True)
    from_hour = models.TimeField()
    to_hour = models.TimeField()
    year = models.IntegerField(default=datetime.datetime.now().year)

    def display_as_str(self) -> str:
        """Return a time table as the format 'DAY HH:HH:HH HH:HH:HH'.

        Returns:
            This is a description of what is returned.
        """
        from_hour_formated = self.from_hour.__format__("%H:%M")
        to_hour_formated = self.to_hour.__format__("%H:%M")
        return str(self.day) + " " + from_hour_formated + " - " + to_hour_formated


class ClubInformation(models.Model):
    """Class Club."""

    street = models.CharField(max_length=255, blank=True)
    number = models.CharField(max_length=255, blank=True)
    zip_code = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)


class Member(AbstractBaseUser, PermissionsMixin):
    """Class Member."""

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
    have_paid = models.BooleanField(default=False)
    picture = models.ImageField(upload_to="", default="default.png")

    USERNAME_FIELD = "username"

    objects = CustomUserManager()

    def get_full_name(self) -> Any:
        """Return the fullname.

        Returns:
            Full name
        """
        return self.first_name + " " + self.last_name

    def get_image_file(self) -> str:
        """Return the image file name.

        Returns:
            Image file name
        """
        return "member_" + self.id


class Instructor(Member):
    """Class Instructor."""

    biography = models.CharField(max_length=255, blank=True)


class Course(models.Model):
    """Class Course."""

    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    place = models.CharField(max_length=255, blank=True)
    level = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)

    def get_full_name_instructor(self) -> Dict:
        """Return the fullname.

        Returns:
            Full name
        """
        return {"id": self.instructor.id, "full_name": self.instructor.get_full_name()}


class Internship(models.Model):
    """Class Internship."""

    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    place = models.CharField(max_length=255, blank=True)
    level = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True)
    time_table = models.ManyToManyField(TimeTable)
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    date_begin = models.DateTimeField(blank=True, default=datetime.datetime.now())
    date_end = models.DateTimeField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    theme = models.CharField(max_length=255, blank=True)
    picture = models.ImageField(upload_to="", default="default.png")

    def display_date_as_str(self) -> str:
        """Return a time table as the format 'DAY HH:HH HH:HH'.

        Returns:
            This is a description of what is returned.
        """
        if self.date_begin:
            date_begin_formated = self.date_begin.__format__("%d/%m/%Y")
            if self.date_end:
                date_end_formated = self.date_end.__format__("%d/%m/%Y")
                return "From " + date_begin_formated + " to " + date_end_formated
            else:
                return date_begin_formated

    def get_date_begin_formated(self) -> str:
        """Make format begining date as YYYY-MM-DD.

        Returns:
            Date formated.
        """
        return self.date_begin.__format__("%Y-%m-%d")

    def get_date_end_formated(self) -> str:
        """Make format end date as YYYY-MM-DD.

        Returns:
            Date formated.
        """
        if self.date_end:
            return self.date_end.__format__("%Y-%m-%d")


class Category(models.Model):
    """Class Category."""

    name = models.CharField(max_length=255, blank=True)

    def get_products(self) -> List:
        """Return all product of this category.

        Returns:
            List of products.
        """
        return [model_to_dict(product) for product in self.product_set.all()]

    def delete_all_products(self) -> None:
        """Delete all product of this category."""
        self.product_set.all().delete()


class Product(models.Model):
    """Class Product."""

    name = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_available = models.IntegerField()
    size = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    picture = models.ImageField(upload_to="", default="default.png")

    def get_category(self) -> Any:
        """Return the category of this product.

        Returns:
            Category object.
        """
        return model_to_dict(self.category, fields=["id", "name"])


class Order(models.Model):
    """Class Order."""

    member = models.ForeignKey(Member, on_delete=models.CASCADE, null=True)
    products = models.ManyToManyField(Product)
    is_bought = models.BooleanField(default=False)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)


class PendingSubscription(models.Model):
    """Class PendingSubscription."""

    email = models.EmailField()
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    birthday = models.DateTimeField()
    sex = models.CharField(max_length=255, blank=True)
    date_creation = models.DateTimeField(null=True, blank=True, default=timezone.now)
    is_pending = models.BooleanField(default=True)
