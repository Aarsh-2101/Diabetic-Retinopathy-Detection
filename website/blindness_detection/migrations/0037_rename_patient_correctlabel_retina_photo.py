# Generated by Django 4.2.10 on 2024-07-07 01:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0036_rename_retina_photo_correctlabel_patient'),
    ]

    operations = [
        migrations.RenameField(
            model_name='correctlabel',
            old_name='patient',
            new_name='retina_photo',
        ),
    ]
