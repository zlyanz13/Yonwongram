# Generated by Django 2.0.3 on 2018-03-31 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_auto_20180331_1453'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('not-specified', 'Not sepcified')], max_length=80, null=True),
        ),
    ]
