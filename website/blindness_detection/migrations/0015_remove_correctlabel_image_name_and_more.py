# Generated by Django 4.2.10 on 2024-04-02 23:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0014_canvasimage_retina_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='correctlabel',
            name='image_name',
        ),
        migrations.AddField(
            model_name='correctlabel',
            name='retina_photo',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='correct_label', to='blindness_detection.retinaphoto'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='gradcamimage',
            name='retina_photo',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='gradcam_image', to='blindness_detection.retinaphoto'),
        ),
    ]