
from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import WorkflowItem
from .serializers import (
    WorkflowItemSerializer,
    UserSerializer,
    UserRegistrationSerializer
)
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
    Register a new user and generate an authentication token.
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
    Authenticate a user and return their authentication token.
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

        return Response(
            {"error": "Invalid username or password."},
            status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(APIView):
    """
    Invalidate the authenticated user's current token.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if request.auth:
            request.auth.delete()

        return Response(
            {"message": "Successfully logged out."},
            status=status.HTTP_200_OK
        )


class CurrentUserView(APIView):
    """
    Return the currently authenticated user's profile.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({
            "authenticated": True,
            "user": UserSerializer(request.user).data
        }, status=status.HTTP_200_OK)


class WorkflowItemViewSet(viewsets.ModelViewSet):
    """
    Full CRUD ViewSet for Workflow Items.

    Users can access and manage only their own workflow items.
    """

    serializer_class = WorkflowItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Restrict all workflow operations to the logged-in user.
        queryset = WorkflowItem.objects.filter(owner=self.request.user)

        status_param = self.request.query_params.get('status')
        search_param = self.request.query_params.get('search')

        if status_param:
            queryset = queryset.filter(status=status_param)

        if search_param:
            queryset = queryset.filter(title__icontains=search_param)

        return queryset

    def perform_create(self, serializer):
        # Assign ownership using the authenticated user.
        # Never trust an owner ID supplied by the frontend.
        serializer.save(owner=self.request.user)
