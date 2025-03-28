# Generated by Django 5.1.7 on 2025-03-25 05:09

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_alter_saving_goal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='type',
            field=models.CharField(choices=[('income', 'Income'), ('spending', 'Spending'), ('loans', 'Loans'), ('saving', 'Saving')], max_length=10),
        ),
        migrations.CreateModel(
            name='UserState',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_locked', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_state', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
