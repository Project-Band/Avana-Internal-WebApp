from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import *
from .serializers import *

class HomePageAPIView(generics.ListAPIView):
    serializer_class = EmployeeSerializer
    def list(self, request, *args, **kwargs):
        architect_users = Employee.objects.filter(user_status='A')
        programmer_users = Employee.objects.filter(user_status='P')
        architect_serializer = self.get_serializer(architect_users, many=True)
        programmer_serializer = self.get_serializer(programmer_users, many=True)
        return Response({
            'programmers': programmer_serializer.data,
            'architects': architect_serializer.data
        })
        
class ApplicationAPIView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    def list(self, request, *args, **kwargs):
        return Response(Employee.objects.filter(user_status='W'))

class TermsAndConditionListView(generics.ListAPIView):
    serializer_class = TermsAndConditionSerializer
    def list(self, request, *args, **kwargs):
        return Response(TermsAndCondition.objects.all())

class ProgrammerRegistrationView(generics.CreateAPIView):
    serializer_class = EmployeeRegistrationSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)

        # Extract user-related data from serializer
        user_data = {
            'username': serializer.validated_data['username'],
            'password': serializer.validated_data['password'],
            'email': serializer.validated_data['emailAddress']
        }
        # define auth token
        auth_token = str(uuid.uuid4())
        employee_data = {
            'first_name': serializer.validated_data['firstName'],
            'last_name': serializer.validated_data['lastName'],
            'auth_token': auth_token,
            'home_address': serializer.validated_data['homeAddress'],
            'phone_number': serializer.validated_data['phone'],
            'gender': serializer.validated_data['gender'],
            'is_verified': serializer.validated_data['verified']
        }

        with transaction.atomic():
            # Create User object and set password
            user = User(username=user_data['username'], email=user_data['email'])
            user.set_password(user_data['password'])
            user.save()

            # Create Employee object and associate with User
            Employee.objects.create(user=user, **employee_data)

            # Send Verification Email
            send_email_after_registration(user_data['email'], auth_token)
            
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def user_projects_view(request, username):
    user = get_object_or_404(User, username=username)
    employee = get_object_or_404(Employee, user=user)

     # Check if the user is an admin
    if employee.user_status == 'X':  # 'X' for Admin
        # Indicate a redirect to the client
        return Response({"redirect": f"/useradmin/{username}"}, status=status.HTTP_302_FOUND)
    
    # Check if the user has an appropriate status
    if employee.user_status not in ['P', 'A']:  # 'P' for Programmer, 'A' for Architect
        return Response({"error": "Access denied for this user status"}, status=status.HTTP_403_FORBIDDEN)

    # Projects the user is enrolled in (with approved status)
    enrolled_projects = Project.objects.filter(employees=employee, projectenroll__enrollmentStatus='A')
    
    # Projects the user is NOT enrolled in
    not_enrolled_projects = Project.objects.exclude(employees=employee)
    
    return Response({
        "user": {
            "username": user.username,
            "first_name": employee.first_name,
            "last_name": employee.last_name,
            "email": employee.user.email,
            # add others according to react
            'others': "whatever frontend demands",
        },
        "enrolled_projects": ProjectSerializer(enrolled_projects, many=True).data,
        "not_enrolled_projects": ProjectSerializer(not_enrolled_projects, many=True).data,
    })


class AdminPageView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # # Check if the user is an admin
        # user = request.user
        # employee = Employee.objects.filter(user=user).first()
        
        # if not employee or employee.user_status != 'X':  # Check existence and status 'X' for Admin
        #     return Response({"error": "Access denied for this user status"}, status=status.HTTP_403_FORBIDDEN)


        # New applicants
        new_applicants = Employee.objects.filter(is_verified=True, user_status='W')
        new_applicants_data = [{"name": f"{applicant.first_name} {applicant.last_name}", "email": applicant.user.email, "username": applicant.user.username} for applicant in new_applicants]

        # Terms and conditions
        terms_and_conditions = TermsAndCondition.objects.all()
        terms_data = [{"title": term.title, "clause": term.clause} for term in terms_and_conditions]

        # Programmer and Architect profiles
        programmers_and_architects = Employee.objects.filter(user_status__in=['P', 'A'])
        pa_data = [{"name": f"{pa.first_name} {pa.last_name}", "email": pa.user.email, "username": pa.user.username} for pa in programmers_and_architects]

        # All projects
        all_projects = Project.objects.all()
        projects_data = [{"name": project.project_name, "description": project.project_description} for project in all_projects]

        # Pending enrollment requests
        pending_enrollments = ProjectEnroll.objects.filter(enrollmentStatus='R')
        pending_data = [{"employee_name": f"{enrollment.Employee.first_name} {enrollment.Employee.last_name}", "project_name": enrollment.Project.project_name} for enrollment in pending_enrollments]

        return Response({
            'newapplicant': new_applicants_data,
            'termsandconditions': terms_data,
            'programmersprofile': pa_data,
            'projects': projects_data,
            'pendingenrollment': pending_data,
        })
         
# Helper Methods

def send_email_after_registration(email, token):
    subject = 'Verify your account'
    message = f'Use this link to verify your account  http://127.0.0.1:8000/verify/{token}. T&C will also be sent here.'
    email_from = settings.EMAIL_HOST_USER
    recepient_list = [email]
    send_mail(subject=subject, message=message, from_email=email_from, recipient_list=recepient_list)
 
def verify(request, auth_token):
    try:
        employee = Employee.objects.filter(auth_token = auth_token).first()
        if employee:
            if employee.is_verified:
                return HttpResponse("Your account is already verified.")
            employee.is_verified = True
            employee.save()
            return HttpResponse("Your account is verified.")
        else:
            return HttpResponse("Invalid verification link.")
    except Exception as e:
            print(e)
            return HttpResponse("An error occurred during verification. Please try again.")   
    
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User

import uuid
from django.conf import settings
from django.core.mail import send_mail, send_mass_mail
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
# Create your views here.


def display_homepage(request):
    architect_users = Employee.objects.filter(user_status='A')
    programmer_users = Employee.objects.filter(user_status='P')
    
    context = {
        'architect_users': architect_users,
        'programmer_users': programmer_users,
    }
    return render(request, 'homepage.html', context=context)

def programmer_signup(request):
    context = {}
    
    if request.method == 'POST':
        # Get form data
        
        # Get User information
        username = request.POST.get('username')
        password = request.POST.get('password')
        personal_email = request.POST.get('personal_email_address')
        
        # Get personal information
        first_name = request.POST.get('first_name')
        middle_name = request.POST.get('middle_name')
        last_name = request.POST.get('last_name')
        home_address = request.POST.get('home_address')
        phone_number = request.POST.get('phone_number')
        gender = request.POST.get('gender')
        profile_image = request.FILES.get('profile_image')
        try:
            # check if user/email is already registered
            if User.objects.filter(username=username).first():
                messages.success(request, 'Username is already in use')
                return redirect('/register')
            
            if User.objects.filter(email=personal_email).first():
                messages.success(request, 'Email is already in use')
                return redirect('/register')
            # Create user instance
            user = User.objects.create(username=username, email=personal_email)
            user.set_password(password)
            # Save user instance to the database
            user.save()
            auth_token = str(uuid.uuid4())
            profile = Employee.objects.create(
                user = user,
                auth_token = auth_token,
                
                first_name=first_name,
                middle_name=middle_name,
                last_name=last_name,
                home_address=home_address,
                phone_number=phone_number,
                gender=gender,
                profile_image=profile_image
            )
            profile.save()
            send_email_after_registration(personal_email, auth_token)
            return redirect('/email_validate')
        except Exception as e:
            print(e)
        
        # Redirect to a success page or perform other actions
    return render(request, 'programmer_signup.html', context=context)

def programmer_login(request):
    context = {}
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.objects.filter(username=username).first()
        if user is None:
            messages.success(request, 'User not found')
            return redirect('/login')
        employee_obj = Employee.objects.filter(user = user).first()
        if employee_obj is None:
            messages.success(request, 'Employee not found')
            return redirect('/login')
        if not employee_obj.is_verified:
            messages.success(request, 'Email is not verified. Check your email(and Spam).')
            return redirect('/login')
        print(employee_obj.user_status)
        if employee_obj.user_status == 'W':
            messages.success(request, 'User is not approved by admin yet')
            return redirect('/login')
        
        
        auth_user = authenticate(username = username, password = password)
        if auth_user:
            return redirect('user_profile', user_id=employee_obj.user.id)
            # messages.success(request, 'User is not approved by admin yet')
            # return redirect('/login')
    return render(request, 'programmer_login.html', context=context)

def register_success(request):
    context = {}
    
    if request.method == 'POST':
        user_name = request.POST.get('user')
    return render(request, 'register_success.html', context=context)

def email_validation(request):
    context = {}
    return render(request, 'email_validation.html', context=context)


def error_page(request):
    return render(request, 'error.html')

@login_required
def user_profile(request, user_id):
    logged_in_user_id = request.user.id
    employee = get_object_or_404(Employee, user_id=user_id)
    
    # if logged_in_user_id != user_id:
    #     return HttpResponse("You don't have permission to access this page.")
    
    context = {'employee': employee}
    return render(request, 'user_profile.html', context=context)


# views.py
from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
