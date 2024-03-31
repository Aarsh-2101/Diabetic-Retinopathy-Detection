# Generated by Django 4.2.10 on 2024-03-30 22:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blindness_detection', '0010_retinaphoto_user_alter_correctlabel_correct_label'),
    ]

    operations = [
        migrations.AlterField(
            model_name='canvasimage',
            name='created_by',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.PROTECT, related_name='canvas_images', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]