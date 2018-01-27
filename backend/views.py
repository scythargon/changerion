import json
import time
from decimal import Decimal

from django.shortcuts import render, HttpResponse, render_to_response
from django.http import JsonResponse
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import (Order, Rate,
    ORDER_STATUS_NEW,
    ORDER_STATUS_CANCELED,
    ORDER_STATUS_PAID,
    ORDER_STATUS_TIMEOUT)

from .utils import load_currencies_info, get_rates, send_telegram


class RootView(View):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        currencies = load_currencies_info()
        current_rates, rates = get_rates()
        order_data = '""'
        order_pk = request.session.get('order_pk', None)
        if order_pk is not None:
            order = Order.objects.get(pk=order_pk)
            if order.seconds_left > 0 or order.status:
                order_data = order.to_dict()
            else:
                order.status = ORDER_STATUS_TIMEOUT
                order.save()
                print('deleting session')
                del request.session['order_pk']

        return render(request, self.template_name, locals())


class OrderView(View):
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode('utf-8'))
        order = Order()
        order.rates = Rate.objects.get(pk=form_data['ratesId'])

        order.give = form_data['give']
        order.receive = form_data['receive']

        order.give_amount = Decimal(form_data['giveAmount'])
        order.receive_amount = Decimal(form_data['receiveAmount'])

        order.status = ORDER_STATUS_NEW

        order.wallet = form_data['wallet']
        order.email = form_data['email']
        order.number = int(time.time() * 100)
        order.save()

        request.session['order_pk'] = order.pk

        return JsonResponse(order.to_dict())

    def delete(self, request, *args, **kwargs):
        order_pk = request.session.get('order_pk', None)
        if order_pk is not None:
            order = Order.objects.get(pk=order_pk)
            if order.status != ORDER_STATUS_NEW:
                # Unable to cancel not a new order.
                return HttpResponse(status=401)
            order.status = ORDER_STATUS_CANCELED
            order.save()
            print(f'canceled order #{order.pk}')
            print('deleting session')
            del request.session['order_pk']
            return HttpResponse(status=204)
        return HttpResponse(status=401)

    def put(self, request, *args, **kwargs):
        """Used to confirm orders."""
        order_pk = request.session.get('order_pk', None)
        if order_pk is not None:
            order = Order.objects.get(pk=order_pk)
            order.status = ORDER_STATUS_PAID
            order.save()
            print(f'paid order #{order.pk}')
            send_telegram(order)
            print('sent telegram')
            return JsonResponse(order.to_dict())
        return HttpResponse(status=401)
