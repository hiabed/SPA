# Generated by Django 4.2.10 on 2024-09-25 14:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oauth', '0007_alter_user_info_friends'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_info',
            name='friends',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
