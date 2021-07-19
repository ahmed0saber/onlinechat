from django.urls import path
from .views import *

urlpatterns = [
    path('messages/', main, name='older')
]
