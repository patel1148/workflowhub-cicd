from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('workflows', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(
            code=lambda apps, schema_editor: (
                apps.get_model('workflows', 'WorkflowItem')
                .objects.filter(owner__isnull=True)
                .delete()
            ),
            reverse_code=migrations.RunPython.noop,
        ),
        migrations.AlterField(
            model_name='workflowitem',
            name='owner',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='workflow_items',
                to='auth.user',
            ),
        ),
    ]