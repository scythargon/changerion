from django.contrib import admin

from .models import Rate, Order


@admin.register(Rate)
class RateAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass
