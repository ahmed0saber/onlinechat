from django.shortcuts import redirect

def restrict_logged(func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('chat')
        else:
            return func(request, *args, **kwargs)
    return wrapper_func

def restrict_unlogged(func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        else:
            return redirect('home')
    return wrapper_func