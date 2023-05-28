from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'course/index.html')

def library(request):
    return render(request, 'course/library.html')