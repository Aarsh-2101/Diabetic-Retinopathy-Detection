# Generated by Django 4.2.10 on 2024-04-08 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0017_correctlabel_retina_photo'),
    ]

    operations = [
        migrations.CreateModel(
            name='ZipFile2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
