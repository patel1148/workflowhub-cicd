
from django.db import models
from django.contrib.auth.models import User


class WorkflowItem(models.Model):
    """
    Model representing a workflow or task item in WorkFlowHub.
    Supports title, description, status lifecycle tracking,
    ownership, and timestamps.
    """

    STATUS_PENDING = 'Pending'
    STATUS_IN_PROGRESS = 'In Progress'
    STATUS_COMPLETED = 'Completed'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_IN_PROGRESS, 'In Progress'),
        (STATUS_COMPLETED, 'Completed'),
    ]

    title = models.CharField(
        max_length=200,
        help_text="Title of the workflow item"
    )

    description = models.TextField(
        blank=True,
        help_text="Detailed description of the workflow item"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING,
        help_text="Current lifecycle status of the workflow item"
    )

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='workflow_items',
        help_text="User who created and owns this workflow item"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Workflow Item'
        verbose_name_plural = 'Workflow Items'

    def __str__(self):
        return f"{self.title} [{self.status}]"
