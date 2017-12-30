from django.shortcuts import render, HttpResponse, render_to_response
from django.template import RequestContext
from django.views.generic import TemplateView

from .utils import load_currencies_info, get_courses
# def root(request):
#     return render(request, 'index.html')


class RootView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        currencies = load_currencies_info()
        courses = get_courses()

        # Right, Class Based Views are nice and handy I was told...
        args = locals()
        args.update(kwargs)
        args.pop('self')
        return super(TemplateView, self).get_context_data(**args)
