# Generated by Django 4.2.10 on 2024-07-05 06:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0027_patient_image_patient_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='canvasimage',
            name='retina_photo',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='canvas_image', to='blindness_detection.patient'),
        ),
        migrations.AlterField(
            model_name='correctlabel',
            name='retina_photo',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='correct_label', to='blindness_detection.patient'),
        ),
        migrations.AlterField(
            model_name='gradcamimage',
            name='retina_photo',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='gradcam_image', to='blindness_detection.patient'),
        ),
        migrations.AlterField(
            model_name='report',
            name='retina_photo',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='report', to='blindness_detection.patient'),
        ),
    ]