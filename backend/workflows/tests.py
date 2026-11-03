from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import WorkflowItem

class WorkflowHubBackendTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@workflowhub.local',
            password='Password123!'
        )
        self.workflow_item = WorkflowItem.objects.create(
            title='Initial Workflow Task',
            description='Test description for pipeline validation',
            status=WorkflowItem.STATUS_PENDING,
            owner=self.user
        )

    def test_health_check_endpoint(self):
        """Test the /api/health/ service probe"""
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')
        self.assertEqual(response.data['service'], 'workflowhub-api')

    def test_user_registration(self):
        """Test user registration endpoint"""
        data = {
            'username': 'newdeveloper',
            'email': 'developer@workflowhub.local',
            'password': 'SecurePassword456!',
            'password_confirm': 'SecurePassword456!'
        }
        response = self.client.post('/api/auth/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertTrue(User.objects.filter(username='newdeveloper').exists())

    def test_user_registration_mismatched_password(self):
        """Test registration rejection on password mismatch"""
        data = {
            'username': 'failuser',
            'email': 'fail@workflowhub.local',
            'password': 'Password123!',
            'password_confirm': 'DifferentPassword456!'
        }
        response = self.client.post('/api/auth/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_login_success(self):
        """Test user authentication with valid credentials"""
        data = {
            'username': 'testuser',
            'password': 'Password123!'
        }
        response = self.client.post('/api/auth/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_user_login_failure(self):
        """Test user authentication with incorrect password"""
        data = {
            'username': 'testuser',
            'password': 'WrongPassword!'
        }
        response = self.client.post('/api/auth/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_workflow_item(self):
        """Test creating a new workflow item via API"""
        data = {
            'title': 'Implement CI/CD pipeline',
            'description': 'Configure GitHub Actions and CircleCI runners',
            'status': 'Pending'
        }
        response = self.client.post('/api/workflows/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Implement CI/CD pipeline')
        self.assertEqual(response.data['status'], 'Pending')

    def test_retrieve_workflow_item_list(self):
        """Test listing workflow items"""
        response = self.client.get('/api/workflows/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check results in paginated or non-paginated format
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertGreaterEqual(len(results), 1)

    def test_update_workflow_item_status(self):
        """Test updating a workflow status from Pending to In Progress, then Completed"""
        # Update to In Progress
        patch_data = {'status': 'In Progress'}
        response = self.client.patch(
            f'/api/workflows/{self.workflow_item.id}/',
            patch_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.workflow_item.refresh_from_db()
        self.assertEqual(self.workflow_item.status, 'In Progress')

        # Update to Completed
        patch_data = {'status': 'Completed'}
        response = self.client.patch(
            f'/api/workflows/{self.workflow_item.id}/',
            patch_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.workflow_item.refresh_from_db()
        self.assertEqual(self.workflow_item.status, 'Completed')

    def test_edit_workflow_item_details(self):
        """Test updating title and description of a workflow item"""
        patch_data = {
            'title': 'Updated Title for Task',
            'description': 'Updated detailed instructions'
        }
        response = self.client.patch(
            f'/api/workflows/{self.workflow_item.id}/',
            patch_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.workflow_item.refresh_from_db()
        self.assertEqual(self.workflow_item.title, 'Updated Title for Task')

    def test_delete_workflow_item(self):
        """Test deleting a workflow item"""
        response = self.client.delete(f'/api/workflows/{self.workflow_item.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(WorkflowItem.objects.filter(id=self.workflow_item.id).exists())

    def test_filter_workflow_items_by_status(self):
        """Test querying items filtered by status"""
        WorkflowItem.objects.create(
            title='Completed Task',
            description='Already finished',
            status='Completed'
        )
        response = self.client.get('/api/workflows/?status=Completed')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        for item in results:
            self.assertEqual(item['status'], 'Completed')
