from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User
from .models import *
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


def verify(request, auth_token):
    try:
        employee = Employee.objects.filter(auth_token = auth_token).first()
        if employee:
            employee.is_verified = True
            employee.save()
            return redirect('/register_success')
        else:
            return redirect('/error')
    except Exception as e:
            print(e)

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

# Helper Methods

def send_email_after_registration(email, token):
    subject = 'Verify your account'
    message = f'Use this link to verify your account  http://127.0.0.1:8000/verify/{token}. T&C will also be sent here.'
    email_from = settings.EMAIL_HOST_USER
    recepient_list = [email]
    send_mail(subject=subject, message=message, from_email=email_from, recipient_list=recepient_list)
    
    
