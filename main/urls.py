from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name="home"),
    path('login/', loginView, name="login"),
    path('signup/', signUpView, name="signup"),
    path('chat/', chat, name="chat"),
    path('logout/', logoutView, name='logout')
]
