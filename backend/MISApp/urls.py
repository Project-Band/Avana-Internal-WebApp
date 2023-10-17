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

    # Programmer Profile
    path('delete', views.delete_user, name = 'delete_user_profile'),
    path('upgrade', views.upgrade_user, name = 'upgrade_user'),
    path('sendpersonalmail', views.send_personal_email, name = 'send_personal_email'),
    
    # Enroll Requests
    path('get_enroll_requests', views.get_enroll_requests, name = 'get_enroll_requests'),
    path('accept_enrollment', views.accept_enroll_request, name = 'accept_enroll_requests'),
    path('reject_enrollment', views.reject_enroll_request, name = 'reject_enroll_requests'),
    # admin page
    path('useradmin/<str:username>/', views.AdminPageView.as_view(), name='admin_page'),
    
    
]