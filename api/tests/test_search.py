"""Test searching."""

from __future__ import absolute_import
import os
import django

from rest_framework.test import APIClient, APITestCase

from api.tests.factories.book import BookAdvicedFactory
from api.tests.factories.member import MemberFactory, InstructorFactory
from api.tests.factories.article import ArticleFactory
from api.tests.factories.service import CourseFactory, InternshipFactory
from api.tests.factories.shop import ProductFactory

os.environ["DJANGO_SETTINGS_MODULE"] = "combat_tarczylo.settings"
django.setup()

client = APIClient()


class SearchTestCase(APITestCase):
    """class ArticleTestCase."""

    def setUp(self) -> None:
        """Set up attributes for tests."""
        self.client = APIClient()
        self.user_test = MemberFactory()
        self.client.force_authenticate(user=self.user_test)

    def test_search_article(self) -> None:
        """Test search of articles.

        Raises:
            AssertError: Assertion failed.
        """
        ArticleFactory(title="title1")
        ArticleFactory(title="title2")
        response = self.client.get("/api_tct/article/?criteria=title&value=title1")

        assert len(response.data) == 1

    def test_search_book(self) -> None:
        """Test search of books.

        Raises:
            AssertError: Assertion failed.
        """
        BookAdvicedFactory(name="name1")
        BookAdvicedFactory(name="name2")
        BookAdvicedFactory(name="name3")
        response = self.client.get("/api_tct/book/?criteria=name&value=name1")

        assert len(response.data) == 1

    def test_search_member(self) -> None:
        """Test search of members.

        Raises:
            AssertError: Assertion failed.
        """
        MemberFactory(city="Berlin")
        MemberFactory(city="Berlin")
        MemberFactory(city="Paris")
        InstructorFactory(country="Poland")
        InstructorFactory(country="France")
        InstructorFactory(country="France")

        response_member = self.client.get("/api_tct/member/?criteria=city&value=Berlin")
        response_instructor = self.client.get(
            "/api_tct/instructor/?criteria=country&value=Poland"
        )

        assert len(response_member.data) == 2
        assert len(response_instructor.data) == 1

    def test_search_services(self) -> None:
        """Test search of service.

        Raises:
            AssertError: Assertion failed.
        """
        CourseFactory(name="course1")
        CourseFactory(name="course1")
        CourseFactory(name="course1")
        CourseFactory(name="course3")
        InternshipFactory(name="internship1")
        InternshipFactory(name="internship1")
        InternshipFactory(name="internship1")
        InternshipFactory(name="internship2")

        response_course = self.client.get(
            "/api_tct/course/?criteria=name&value=course1"
        )
        response_internship = self.client.get(
            "/api_tct/internship/?criteria=name&value=internship2"
        )

        assert len(response_course.data) == 3
        assert len(response_internship.data) == 1

    def test_search_product(self) -> None:
        """Test search of products.

        Raises:
            AssertError: Assertion failed.
        """
        ProductFactory(name="product1")
        ProductFactory(name="product1")
        ProductFactory(name="product1")
        ProductFactory(name="product1")
        ProductFactory(name="product2")

        response = self.client.get("/api_tct/product/?criteria=name&value=product1")

        assert len(response.data) == 4
