# Generated by Django 4.2.10 on 2024-07-07 01:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0037_rename_patient_correctlabel_retina_photo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='correctlabel',
            old_name='retina_photo',
            new_name='patient',
        ),
    ]
