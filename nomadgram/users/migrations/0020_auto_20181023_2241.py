# Generated by Django 2.0.3 on 2018-10-23 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_auto_20180401_1919'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('not-specified', 'Not sepcified'), ('female', 'Female'), ('male', 'Male')], max_length=80, null=True),
        ),
    ]