import json

from django.shortcuts import render, HttpResponse, render_to_response
from django.http import JsonResponse
from django.views.generic import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

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
        order.save()

        return JsonResponse({'status': 'ok'})
