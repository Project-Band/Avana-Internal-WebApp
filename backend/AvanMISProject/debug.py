
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



@csrf_exempt
@api_view(['POST'])
def test_enroll_request_view(request):
    username = request.data.get("username")
    project_name = request.data.get("project_name")
    print(username, project_name)
    if not username or not project_name:
        return Response({"error": "Both username and project name are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    with transaction.atomic():
        try:
            # Get User and related Employee
            user = User.objects.get(username=username)
            employee = Employee.objects.get(user=user)

            # Get Project
            project = Project.objects.get(project_name=project_name)

            # Check if enrollment request already exists
            existing_request = ProjectEnroll.objects.filter(Employee=employee, Project=project).first()
            if existing_request:
                return Response({"error": "An enrollment request already exists."}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new enrollment request with "Requested" status
            ProjectEnroll.objects.create(Employee=employee, Project=project, enrollmentStatus='R')
        
        except User.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Employee.DoesNotExist:
            return Response({"error": "Employee does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Project.DoesNotExist:
            return Response({"error": "Project does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "Enrollment request created successfully."}, status=status.HTTP_200_OK)