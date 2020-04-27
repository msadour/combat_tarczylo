from rest_framework.routers import DefaultRouter

from api.views.article import ArticleViewSet
from api.views.member import MemberViewSet, InstructorViewSet
from api.views.service import CourseViewSet, InternshipViewSet
from api.views.club import ClubViewSet
from api.views.shop import ProductViewSet, OrderViewSet
from api.views.book import BookViewSet

router = DefaultRouter()
router.register(r'article', ArticleViewSet, basename='article')
router.register(r'member', MemberViewSet, basename='member')
router.register(r'instructor', InstructorViewSet, basename='instructor')
router.register(r'course', CourseViewSet, basename='course')
router.register(r'internship', InternshipViewSet, basename='internship')
router.register(r'club', ClubViewSet, basename='club')
router.register(r'product', ProductViewSet, basename='product')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'book', BookViewSet, basename='book')

urlpatterns = router.urls