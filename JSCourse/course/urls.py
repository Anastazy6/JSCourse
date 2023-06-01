from django.urls import path
from . import views

urlpatterns = [
    
    path(   '',
            views.index,
            name="index"
    ), 
    path(  'library',
            views.library,
            name='library'
    ),
    path(  'tictactoe',
            views.tictactoe,
            name='tictactoe'
    )

]