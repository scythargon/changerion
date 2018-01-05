from django.db import models
from django.contrib.postgres.fields import JSONField


class Rate(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    data = JSONField(default={})


ORDER_STATUS_NEW = 'new'  # Just created.
ORDER_STATUS_PAID = 'paid'  # User pressed "payed".
ORDER_STATUS_RECEIVED = 'received'  # We have received the money.
ORDER_STATUS_COMPLETED = 'completed'  # We have send the money back to the user.

ORDER_STATUS_CHOICES = (
    (ORDER_STATUS_NEW, ORDER_STATUS_NEW),
    (ORDER_STATUS_PAID, ORDER_STATUS_PAID),
    (ORDER_STATUS_RECEIVED, ORDER_STATUS_RECEIVED),
    (ORDER_STATUS_COMPLETED, ORDER_STATUS_COMPLETED),
)


class Order(models.Model):
    rates = models.ForeignKey(Rate, null=False, blank=False, on_delete=models.PROTECT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    give = models.CharField(max_length=5, null=False, blank=False)
    receive = models.CharField(max_length=5, null=False, blank=False)

    give_amount = models.DecimalField(max_digits=30, decimal_places=10, null=False, blank=False)
    receive_amount = models.DecimalField(max_digits=30, decimal_places=10, null=False, blank=False)

    status = models.CharField(choices=ORDER_STATUS_CHOICES, max_length=10, null=False, blank=False)

