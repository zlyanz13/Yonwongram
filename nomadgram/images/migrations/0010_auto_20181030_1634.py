# Generated by Django 2.0.3 on 2018-10-30 07:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0009_auto_20181023_2324'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='location',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='locations.Location'),
        ),
    ]
