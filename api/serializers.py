from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *


class BookAdvicedSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookAdviced
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = '__all__'


class ImportantMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImportantMessage
        fields = '__all__'


class PresentationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Presentation
        fields = '__all__'


class TimeTableSerializer(serializers.ModelSerializer):

    time_table_str = serializers.CharField(source='display_as_str')

    class Meta:
        model = TimeTable
        fields = '__all__'


class ClubSerializer(serializers.ModelSerializer):
    time_table = TimeTableSerializer(many=True)

    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'street', 'number', 'zip_code', 'city', 'country', 'time_table']


class MemberSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(source="get_full_name")

    class Meta:
        model = Member
        fields = ['id', 'email', 'username','password', 'first_name', 'last_name', 'postal_code', 'city', 'street', 'country', 'phone',
                  'insurance_name', 'insurance_number', 'birthday', 'sex', 'level', 'full_name', 'is_active']


class InstructorSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(source="get_full_name")

    class Meta:
        model = Instructor
        fields = ['id', 'email', 'password','first_name', 'last_name', 'postal_code', 'city', 'street', 'country', 'phone',
                  'insurance_name', 'insurance_number', 'birthday', 'sex', 'level', 'biography', 'full_name',
                  'is_active']


class CourseSerializer(serializers.ModelSerializer):

    instructor = serializers.CharField(source="get_full_name_instructor")
    time_table = TimeTableSerializer(many=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'place', 'level', 'category', 'time_table', 'instructor']


class InternshipSerializer(serializers.ModelSerializer):

    instructor = InstructorSerializer(many=False)
    time_table = TimeTableSerializer(many=True)

    class Meta:
        model = Internship
        fields = ['id', 'name', 'description', 'place', 'level', 'category', 'time_table', 'instructor',
                  'date_begin', 'date_end', 'price', 'theme']


class CategorySerializer(serializers.ModelSerializer):

    products = serializers.CharField(source='get_products')

    class Meta:
        model = Category
        fields = ['id', 'name', 'products']


class ProductSerializer(serializers.ModelSerializer):

    category = serializers.CharField(source='get_category')

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'quantity_available', 'size', 'category']


class OrderSerializer(serializers.ModelSerializer):

    member = MemberSerializer(many=False)
    products = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'member', 'products', 'is_bought']


class PendingSubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PendingSubscription
        fields = '__all__'


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object.

    Attributes:
        email (str):
        password (str):
    """

    username = serializers.CharField()
    password = serializers.CharField(style={"input_type": "password"}, trim_whitespace=False)

    def authenticate_user(self, username=None, password=None):
        try:
            # Try to find a user matching your username
            user = Member.objects.get(username=username)

            if check_password(password, user.password):
                return user
            else:
                return None
        except:
            return None

    def validate(self, attrs):

        username = attrs.get("username")
        password = attrs.get("password")

        user = self.authenticate_user(username=username, password=password)
        if not user:
            msg = "Unable to authenticate with provided credentials"
            raise serializers.ValidationError(msg, code="authorization")

        return user
