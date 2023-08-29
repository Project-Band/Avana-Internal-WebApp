# map url to view

from django.urls import path
from . import views

urlpatterns = [
    path('', views.display_homepage, name = 'homepage'),
    path('register/', views.programmer_signup, name='register'),
    path('login/', views.programmer_login, name='login'),
    path('email_validate/', views.email_validation, name='email_validate'),
    path('register_success/', views.register_success, name='register_success'),
    
    path ('verify/<auth_token>', views.verify, name = 'verify'),
    path('error/', views.error_page, name = 'error'),
    
    path('user/<int:user_id>/', views.user_profile, name='user_profile'),
]