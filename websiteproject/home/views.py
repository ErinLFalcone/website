from django.shortcuts import render

def home(request):
    context = {
        "test_text":"This is a test."
    }
    return render(request, "home/home.html", context)