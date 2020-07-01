"""Serializers module."""
from typing import Any, Dict

from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

from rest_framework import serializers

from .models import (
    BookAdviced,
    Article,
    ImportantMessage,
    Presentation,
    TimeTable,
    ClubInformation,
    Member,
    Instructor,
    Course,
    Order,
    PendingSubscription,
    Internship,
    Category,
    Product,
)


class BookAdvicedSerializer(serializers.ModelSerializer):
    """Class BookAdvicedSerializer."""

    class Meta:
        """Class Meta."""

        model = BookAdviced
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    """Class ArticleSerializer."""

    class Meta:
        """Class Meta."""

        model = Article
        fields = "__all__"


class ImportantMessageSerializer(serializers.ModelSerializer):
    """Class ImportantMessageSerializer."""

    class Meta:
        """Class Meta."""

        model = ImportantMessage
        fields = "__all__"


class PresentationSerializer(serializers.ModelSerializer):
    """Class PresentationSerializer."""

    class Meta:
        """Class Meta."""

        model = Presentation
        fields = "__all__"


class TimeTableSerializer(serializers.ModelSerializer):
    """Class TimeTableSerializer."""

    time_table_str = serializers.CharField(source="display_as_str")

    class Meta:
        """Class Meta."""

        model = TimeTable
        fields = "__all__"


class ClubSerializer(serializers.ModelSerializer):
    """Class ClubSerializer."""

    time_table = TimeTableSerializer(many=True)

    class Meta:
        """Class Meta."""

        model = ClubInformation
        fields = [
            "id",
            "street",
            "number",
            "zip_code",
            "city",
            "country",
            "time_table",
        ]


class MemberSerializer(serializers.ModelSerializer):
    """Class MemberSerializer."""

    full_name = serializers.CharField(source="get_full_name")
    is_active = serializers.BooleanField()

    class Meta:
        """Class Meta."""

        model = Member
        fields = "__all__"


class InstructorSerializer(serializers.ModelSerializer):
    """Class InstructorSerializer."""

    full_name = serializers.CharField(source="get_full_name")

    class Meta:
        """Class Meta."""

        model = Instructor
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "postal_code",
            "city",
            "street",
            "country",
            "phone",
            "insurance_name",
            "insurance_number",
            "birthday",
            "sex",
            "level",
            "biography",
            "full_name",
            "is_active",
        ]


class CourseSerializer(serializers.ModelSerializer):
    """Class CourseSerializer."""

    instructor = InstructorSerializer(many=False)
    time_table = TimeTableSerializer(many=True)

    class Meta:
        """Class Meta."""

        model = Course
        fields = [
            "id",
            "name",
            "description",
            "place",
            "level",
            "category",
            "time_table",
            "instructor",
        ]


class InternshipSerializer(serializers.ModelSerializer):
    """Class InternshipSerializer."""

    instructor = InstructorSerializer(many=False)
    time_table = TimeTableSerializer(many=True)
    date_begin = serializers.DateTimeField(format="%d/%m/%Y")
    date_end = serializers.DateTimeField(format="%d/%m/%Y")
    date_begin_formated = serializers.CharField(source="get_date_begin_formated")
    date_end_formated = serializers.CharField(source="get_date_end_formated")
    dates = serializers.CharField(source="display_date_as_str")

    class Meta:
        """Class Meta."""

        model = Internship
        fields = [
            "id",
            "name",
            "description",
            "place",
            "level",
            "category",
            "time_table",
            "instructor",
            "date_begin",
            "date_end",
            "price",
            "theme",
            "dates",
            "date_begin_formated",
            "date_end_formated",
            "picture",
        ]


class ProductSerializer(serializers.ModelSerializer):
    """Class ProductSerializer."""

    class Meta:
        """Class Meta."""

        model = Product
        fields = [
            "id",
            "name",
            "price",
            "quantity_available",
            "size",
            "picture",
        ]


class CategorySerializer(serializers.ModelSerializer):
    """Class CategorySerializer."""

    products = ProductSerializer(source="get_products", many=True)

    class Meta:
        """Class Meta."""

        model = Category
        fields = ["id", "name", "products"]


class OrderSerializer(serializers.ModelSerializer):
    """Class OrderSerializer."""

    member = MemberSerializer(many=False)
    products = ProductSerializer(many=True)

    class Meta:
        """Class Meta."""

        model = Order
        fields = ["id", "member", "products", "is_bought"]


class PendingSubscriptionSerializer(serializers.ModelSerializer):
    """Class PendingSubscriptionSerializer."""

    class Meta:
        """Class Meta."""

        model = PendingSubscription
        fields = "__all__"


class AuthTokenSerializer(serializers.Serializer):
    """class AuthTokenSerializer."""

    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, trim_whitespace=False
    )

    def authenticate_user(self, username: str = None, password: str = None) -> Any:
        """Authenticate a user.

        Args:
            username:
            password:

        Returns:
            User.
        """
        try:
            # Try to find a user matching your username
            user = Member.objects.get(username=username)

            if check_password(password, user.password):
                return user
            else:
                return None
        except Exception:
            return None

    def validate(self, attrs: Dict) -> User:
        """Validate a user.

        Args:
            attrs: Arbitrary keyword arguments.

        Returns:
            User.
        """
        username = attrs.get("username")
        password = attrs.get("password")

        user = self.authenticate_user(username=username, password=password)
        if not user or not user.have_paid:
            msg = "Unable to authenticate with provided credentials"
            raise serializers.ValidationError(msg, code="authorization")

        return user
