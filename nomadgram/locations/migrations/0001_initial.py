# Generated by Django 2.0.3 on 2018-10-23 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Subway',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('station_cd', models.IntegerField()),
                ('station_nm', models.CharField(max_length=40)),
                ('line_num', models.CharField(max_length=4)),
            ],
            options={
                'ordering': ['-station_nm'],
            },
        ),
    ]
