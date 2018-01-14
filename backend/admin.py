from django.contrib import admin

from .models import Rate, Order


@admin.register(Rate)
class RateAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
