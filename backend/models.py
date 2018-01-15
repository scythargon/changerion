from datetime import timedelta

from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils import timezone
from django.conf import settings


class Rate(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    data = JSONField(default={})


ORDER_STATUS_NEW = 'new'  # Just created.
ORDER_STATUS_PAID = 'paid'  # User pressed "payed".
ORDER_STATUS_CANCELED = 'canceled'  # Order got canceled.
ORDER_STATUS_TIMEOUT = 'timeout'  # Order timed out.
ORDER_STATUS_RECEIVED = 'received'  # We have received the money.
ORDER_STATUS_COMPLETED = 'completed'  # We have send the money back to the user.

ORDER_STATUS_CHOICES = (
    (ORDER_STATUS_NEW, ORDER_STATUS_NEW),
    (ORDER_STATUS_PAID, ORDER_STATUS_PAID),
    (ORDER_STATUS_CANCELED, ORDER_STATUS_CANCELED),
    (ORDER_STATUS_TIMEOUT, ORDER_STATUS_TIMEOUT),
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

    wallet = models.CharField(max_length=255, null=False, blank=False, default='')
    email = models.CharField(max_length=255, null=False, blank=False, default='')

    number = models.BigIntegerField(null=False, blank=False, default=0)

    def __str__(self):
        return f'#{self.pk}: {self.give} -> {self.receive}'

    @property
    def seconds_left(self):
        return int((timedelta(minutes=settings.TIME_TO_COMPLETE_ORDER) + self.created_at - timezone.now()).total_seconds())

    def to_dict(self):
        from .utils import load_currencies_info, format_decimal

        currencies = load_currencies_info()
        to_wallet = next(filter(lambda c: c.code == self.give, currencies))
        return {
            'number': self.number,
            'give': self.give,
            'receive': self.receive,
            'giveAmount': format_decimal(self.give_amount),
            'receiveAmount': format_decimal(self.receive_amount),
            'status': self.status,
            'ourWallet': to_wallet.wallet_address,
            'clientWallet': self.wallet,
            'secondsLeft': self.seconds_left,
        }
