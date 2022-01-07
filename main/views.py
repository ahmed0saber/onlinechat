from django.contrib import messages
from django.shortcuts import render
from django.contrib.auth import login, logout, authenticate
from .decorators import *
from .forms import signUpForm
from .models import message

# Create your views here.
@restrict_logged
def home(request):
    return render(request, "main/home.html")

@restrict_unlogged
def chat(request):
    counter = message.objects.count()
    latest = message.objects.filter(id__gt=counter-100)
    return render(request, 'main/chat.html', {'messages':latest})

@restrict_logged
def loginView(request):
    if request.method == "POST":
        user_name = request.POST.get("username")
        user_pass = request.POST.get("password")
        print(user_name, user_pass)
        user = authenticate(request, username=user_name, password=user_pass)
        if user:
            print(user)
            login(request, user)
            return redirect('chat')
        else:
            messages.error(request, "The username or password you entered is not correct")

    return render(request, 'main/login.html')

@restrict_logged
def signUpView(request):
    form = signUpForm()
    if request.method == 'POST':
        form = signUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    return render(request, 'main/signup.html', {'form':form})

@restrict_unlogged
def logoutView(request):
    logout(request)
    return redirect('home')