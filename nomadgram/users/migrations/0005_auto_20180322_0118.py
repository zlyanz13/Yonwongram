# Generated by Django 2.0.3 on 2018-03-21 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20180322_0109'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('not-specified', 'Not sepcified'), ('female', 'Female'), ('male', 'Male')], max_length=80, null=True),
        ),
    ]
