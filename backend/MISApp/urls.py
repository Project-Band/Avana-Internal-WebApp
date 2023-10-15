# map url to view

from django.urls import path
from . import views


# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)


urlpatterns = [
    # Register
    path('registerinfo/', ProgrammerRegistrationView.as_view(), name='programmer_registration'),
    # login,
    path('login/', views.login_view, name='login'),
    # verify
    path ('verify/<auth_token>', views.verify, name = 'verify'),
    
    # user page
    path('<str:username>/', views.user_projects_view, name='user_projects'),
    # Homepage
    path('', views.HomePageAPIView.as_view(), name = 'employee_info'),
    # request emroll
    path('enroll_requests', views.test_enroll_request_view, name='request_enroll'),
    
    
    # Applications
    # path('application', views.ApplicationAPIView.as_view(), name = 'applications'),
    path('application', views.get_applications, name = 'applications'),
    #accept
    path('accept_application', views.accept_application, name = 'accept_application'),
    # reject
    path('reject_application', views.reject_application, name = 'reject_application'),
    
    # Terms and Conditions
    path('termsandconditions', views.get_terms_and_conditions, name='terms_and_conditions_list'),

    
    
    
    # admin page
    path('useradmin/<str:username>/', views.AdminPageView.as_view(), name='admin_page'),
    
    
]