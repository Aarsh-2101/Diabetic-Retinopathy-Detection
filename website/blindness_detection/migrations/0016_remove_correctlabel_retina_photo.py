# Generated by Django 4.2.10 on 2024-04-02 23:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0015_remove_correctlabel_image_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='correctlabel',
            name='retina_photo',
        ),
    ]