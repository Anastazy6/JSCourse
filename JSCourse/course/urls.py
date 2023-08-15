from django.urls import path
from . import views

urlpatterns = [
    
    path(   
        '',
        views.index,
        name="index"
    ), 
    path(  
        'library',
        views.library,
        name='library'
    ),
    path(  
        'tictactoe',
        views.tictactoe,
        name='tictactoe'
    ),
    path(   
        'forms-practice',
        views.forms_practice,
        name='forms-practice'
    ),
    path(   
        'admin-dashboard',
        views.admin_dashboard,
        name='admin-dashboard'
    )
]