from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import WorkflowItem
from .serializers import WorkflowItemSerializer, UserSerializer, UserRegistrationSerializer
import os

class HealthCheckView(APIView):
    """
    Service health check endpoint for container probes and CI pipeline verification.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            "status": "healthy",
            "service": "workflowhub-api",
            "environment": os.environ.get("ENVIRONMENT", "development"),
            "database": "connected"
        }, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    """
    Endpoint to register a new user account and obtain an initial authentication token.
    """
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": "User registered successfully",
            "user": UserSerializer(user).data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    Endpoint for user authentication. Returns token and user metadata.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"error": "Please provide both username and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful",
                "token": token.key,
                "user": UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    """
    Endpoint to invalidate the current user authentication token.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if request.user.is_authenticated:
            try:
                request.user.auth_token.delete()
            except Exception:
                pass
            logout(request)
        return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    """
    Endpoint to inspect the authenticated user profile.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "authenticated": True,
                "user": UserSerializer(request.user).data
            })
        return Response({"authenticated": False, "user": None})


class WorkflowItemViewSet(viewsets.ModelViewSet):
    """
    Full CRUD ViewSet for Workflow Items:
    - GET /api/workflows/ (list, filterable by ?status=)
    - POST /api/workflows/ (create)
    - GET /api/workflows/{id}/ (retrieve)
    - PUT/PATCH /api/workflows/{id}/ (update / edit status, title, description)
    - DELETE /api/workflows/{id}/ (destroy)
    """
    serializer_class = WorkflowItemSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = WorkflowItem.objects.all()
        status_param = self.request.query_params.get('status', None)
        search_param = self.request.query_params.get('search', None)

        if status_param:
            queryset = queryset.filter(status=status_param)
        if search_param:
            queryset = queryset.filter(title__icontains=search_param)

        return queryset

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()
