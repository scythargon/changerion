import json
import time
from datetime import timedelta

from django.shortcuts import render, HttpResponse, render_to_response
from django.http import JsonResponse
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils import timezone

from .models import Order, Rate, ORDER_STATUS_NEW
from .utils import load_currencies_info, get_rates


class RootView(View):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        currencies = load_currencies_info()
        current_rates, rates = get_rates()
        return render(request, self.template_name, locals())


class OrderView(View):
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode('utf-8'))
        order = Order()
        order.rates = Rate.objects.get(pk=form_data['ratesId'])

        order.give = form_data['give']
        order.receive = form_data['receive']

        order.give_amount = form_data['giveAmount']
        order.receive_amount = form_data['receiveAmount']

        order.status = ORDER_STATUS_NEW

        order.wallet = form_data['wallet']
        order.email = form_data['email']
        order.number = int(time.time() * 100)
        order.save()

        seconds_left = int((timezone.now() + timedelta(minutes=10) - order.created_at).total_seconds())

        currencies = load_currencies_info()
        to_wallet = next(filter(lambda c: c.code == order.give, currencies))

        return JsonResponse({
            'status': 'ok',
            'number': order.number,
            'give': order.give,
            'receive': order.receive,
            'giveAmount': order.give_amount,
            'receiveAmount': order.receive_amount,
            'status': order.status,
            'ourWallet': to_wallet.wallet_address,
            'clientWallet': order.wallet,
            'secondsLeft': seconds_left,
        })
