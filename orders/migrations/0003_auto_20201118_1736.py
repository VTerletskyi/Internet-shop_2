# Generated by Django 3.1.3 on 2020-11-18 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20201116_2319'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='total_amount',
            new_name='total_price',
        ),
        migrations.AlterField(
            model_name='productinorder',
            name='nmb',
            field=models.IntegerField(default=1),
        ),
    ]