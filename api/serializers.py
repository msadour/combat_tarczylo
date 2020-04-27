from rest_framework import serializers
from .models import *


class BookAdvicedSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookAdviced
        fields = ['name', 'author', 'category', 'url']


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ['title', 'content', 'category']


class ImportantMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImportantMessage
        fields = ['content', 'date_creation']


class PresentationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Presentation
        fields = ['text']


class TimeTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeTable
        fields = '__all__'


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = ['name', 'description', 'street', 'number', 'zip_code', 'city', 'country', 'time_table']


class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Member
        fields = ['id', 'postal_code', 'city', 'street', 'country', 'phone', 'insurance_name', 'insurance_number',
                  'birthday', 'sex', 'date_creation', 'level']


class InstructorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instructor
        fields = ['id', 'postal_code', 'city', 'street', 'country', 'phone', 'insurance_name', 'insurance_number',
                  'birthday', 'sex', 'date_creation', 'level', 'biography']


class CourseSerializer(serializers.ModelSerializer):

    instructor = InstructorSerializer(many=False)
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

    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):

    category = CategorySerializer(many=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'quantity_available', 'size', 'category']


class OrderSerializer(serializers.ModelSerializer):

    member = MemberSerializer(many=False)
    products = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'member', 'products']


class PendingSubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = PendingSubscription
        fields = ['id', 'email', 'first_name', 'last_name', 'birthday', 'sex', 'date_creation']
