from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WorkflowItemViewSet,
    RegisterView,
    LoginView,
    LogoutView,
    CurrentUserView,
    HealthCheckView
)

router = DefaultRouter()
router.register(r'workflows', WorkflowItemViewSet, basename='workflow')

urlpatterns = [
    # Health probe
    path('health/', HealthCheckView.as_view(), name='health-check'),

    # Authentication Endpoints
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('auth/logout/', LogoutView.as_view(), name='auth-logout'),
    path('auth/me/', CurrentUserView.as_view(), name='auth-current-user'),

    # CRUD Workflows / Tasks Endpoints
    path('', include(router.urls)),
]
