# Generated by Django 2.0.3 on 2018-10-30 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0030_auto_20181030_1105'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('female', 'Female'), ('male', 'Male'), ('not-specified', 'Not sepcified')], max_length=80, null=True),
        ),
    ]
