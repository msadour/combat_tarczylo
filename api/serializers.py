from rest_framework import serializers
from .models import *


class BookAdvicedSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookAdviced
        fields = ['id', 'name', 'author', 'category', 'url']


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'category']


class ImportantMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImportantMessage
        fields = ['id', 'content', 'date_creation']


class PresentationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Presentation
        fields = ['id', 'tct', 'darius', 'technical']


class TimeTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeTable
        fields = '__all__'


class ClubSerializer(serializers.ModelSerializer):
    time_table = TimeTableSerializer(many=True)

    class Meta:
        model = Club
        fields = ['id', 'name', 'description', 'street', 'number', 'zip_code', 'city', 'country', 'time_table']


class MemberSerializer(serializers.ModelSerializer):

    user = serializers.CharField(source="get_user")

    class Meta:
        model = Member
        fields = ['id', 'user', 'postal_code', 'city', 'street', 'country', 'phone', 'insurance_name', 'insurance_number',
                  'birthday', 'sex', 'level']


class InstructorSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="get_user")

    class Meta:
        model = Instructor
        fields = ['id', 'user', 'postal_code', 'city', 'street', 'country', 'phone', 'insurance_name', 'insurance_number',
                  'birthday', 'sex', 'level', 'biography']


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
        fields = ['id', 'email', 'first_name', 'last_name', 'birthday', 'sex', 'date_creation']
