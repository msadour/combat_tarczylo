from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from api.views.article import ArticleViewSet
from api.views.member import MemberViewSet, InstructorViewSet, LogoutViewSet
from api.views.service import CourseViewSet, InternshipViewSet
from api.views.club import ClubViewSet, PresentationViewSet, ImportantMessageViewSet
from api.views.shop import ProductViewSet, OrderViewSet, CategoryViewSet
from api.views.book import BookViewSet
from api.views.timetable import TimeTableViewSet

router = DefaultRouter()
router.register(r'article', ArticleViewSet, basename='article')
router.register(r'member', MemberViewSet, basename='member')
router.register(r'instructor', InstructorViewSet, basename='instructor')
router.register(r'course', CourseViewSet, basename='course')
router.register(r'internship', InternshipViewSet, basename='internship')
router.register(r'club', ClubViewSet, basename='club')
router.register(r'important_message', ImportantMessageViewSet, basename='important_message')
router.register(r'presentation', PresentationViewSet, basename='presentation')
router.register(r'product', ProductViewSet, basename='product')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'book', BookViewSet, basename='book')
router.register(r'time_table', TimeTableViewSet, basename='time_table')
router.register(r'logout', LogoutViewSet, basename='logout')

urlpatterns = router.urls

urlpatterns += [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('logout', Logout.as_view(), name='logout'),
]