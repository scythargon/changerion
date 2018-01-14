from django.shortcuts import render, HttpResponse, render_to_response
from django.http import JsonResponse
from django.template import RequestContext
from django.views.generic import TemplateView, View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from .utils import load_currencies_info, get_rates
# def root(request):
#     return render(request, 'index.html')


class RootView(View):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, *args, **kwargs):
        currencies = load_currencies_info()
        rates = get_rates()
        return render(request, self.template_name, locals())


class OrderView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({'status': 'ok'})

    def post(self, request, *args, **kwargs):
        return JsonResponse({'status': 'ok'})
