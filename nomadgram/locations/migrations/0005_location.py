# Generated by Django 2.0.3 on 2018-10-30 01:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0004_auto_20181024_1253'),
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=140)),
                ('station', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='locations.Station')),
            ],
        ),
    ]