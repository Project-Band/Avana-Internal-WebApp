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
    # Homepage
    path('', views.HomePageAPIView.as_view(), name = 'HomePage'),
    # Applications
    path('application/', views.ApplicationAPIView.as_view(), name = 'applications'),
    # Terms and Conditions
    path('terms-and-conditions/', TermsAndConditionListView.as_view(), name='terms_and_conditions_list'),
    # Register
     path('registerinfo/', ProgrammerRegistrationView.as_view(), name='programmer_registration'),
    # api
    path('api/', include(router.urls)),
    # verify
    path ('verify/<auth_token>', views.verify, name = 'verify'),
    # login,
    path('login/', views.login_view, name='login'),
    # user page
    path('<str:username>/', views.user_projects_view, name='user_projects'),
    # admin page
    path('useradmin/<str:username>/', views.AdminPageView.as_view(), name='admin_page'),
    # request emroll
    path('enroll_requests', views.test_enroll_request_view, name='request_enroll'),
    
]

# urlpatterns = [
#     # Homepage
#     path('', views.HomePageAPIView.as_view(), name = 'HomePage'),
#     # 
#     # path('', views.display_homepage, name = 'homepage'),
#     path('register/', views.programmer_signup, name='register'),
#     path('login/', views.programmer_login, name='login'),
#     path('email_validate/', views.email_validation, name='email_validate'),
#     path('register_success/', views.register_success, name='register_success'),
    
#     
#     path('error/', views.error_page, name = 'error'),
    
#     path('user/<int:user_id>/', views.user_profile, name='user_profile'),
    
#     
# ]