# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-14 17:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_add_wallet_and_email_fields_to_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='number',
            field=models.BigIntegerField(default=0),
        ),
    ]
