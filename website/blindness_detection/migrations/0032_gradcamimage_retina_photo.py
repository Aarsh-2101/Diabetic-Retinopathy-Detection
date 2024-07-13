# Generated by Django 4.2.10 on 2024-07-06 22:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0031_remove_patient_id_patient_patient_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='gradcamimage',
            name='retina_photo',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='gradcam_image', to='blindness_detection.patient'),
            preserve_default=False,
        ),
    ]
