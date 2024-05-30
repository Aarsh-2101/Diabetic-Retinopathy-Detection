# Generated by Django 4.2.10 on 2024-05-30 20:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blindness_detection', '0024_report'),
    ]

    operations = [
        migrations.AddField(
            model_name='retinaphoto',
            name='dob',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='retinaphoto',
            name='gender',
            field=models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=10),
        ),
        migrations.AddField(
            model_name='retinaphoto',
            name='location',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='retinaphoto',
            name='name',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
