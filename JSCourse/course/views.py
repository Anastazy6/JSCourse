from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'Layout/index.html')

def library(request):
    return render(request, 'Library/library.html')

def tictactoe(request):
    return render(request, 'TicTacToe/tictactoe.html', {
        "players": range(1, 3, 1) # Contains players: 1 and 2
    })