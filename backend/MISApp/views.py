from django.shortcuts import  get_object_or_404
from django.contrib.auth import authenticate, login
from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import *
from .serializers import *
import uuid
   
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

@api_view(['GET'])
def get_applications(request):
    if request.method == 'GET':
        new_applicants = Employee.objects.filter(is_verified=True, user_status='W')
        print(new_applicants)
        new_applicants_data = [
            {
                "first_name": applicant.first_name,
                "middle_name": applicant.middle_name if applicant.middle_name else '',  
                "last_name": applicant.last_name, 
                "email": applicant.user.email, 
                "username": applicant.user.username,
                "phone": applicant.phone_number,
                "home_address":applicant.home_address,
                "gender": applicant.gender
            } 
            for applicant in new_applicants
        ]
        print('Success')
        return Response(new_applicants_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def accept_application(request):
    try:
        username = request.data.get("username")
        user = get_object_or_404(User, username=username)
        employee = get_object_or_404(Employee, user=user)
        mail = user.email
        employee.user_status = 'P'
        employee.save()
        send_email_after_registration(mail, mailtype='AfterAccept')
        return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist or Employee.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def reject_application(request):
    try:
        username = request.data.get("username")
        user = get_object_or_404(User, username=username)
        mail = user.email
        # Delete user
        user.delete()
        send_email_after_registration(mail, mailtype='AfterReject')
        return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_enroll_requests(request):
    if request.method == 'GET':
        new_applicants = ProjectEnroll.objects.filter(enrollmentStatus='R')
        new_applicants_data = [
            {
                "project": applicant.Project.project_name,
                "employee": applicant.Employee.first_name + ' ' + applicant.Employee.last_name,  
                "username": applicant.Employee.user.username
            } 
            for applicant in new_applicants
        ]
        return Response(new_applicants_data, status=status.HTTP_200_OK)
@api_view(['POST'])
def accept_enroll_request(request):
    try:
        project_name = request.data.get("project")
        username = request.data.get("username")
        
        user = get_object_or_404(User, username = username) 
        employee = get_object_or_404(Employee, user=user)
        project = get_object_or_404(Project, project_name=project_name)
        
        enrollmentObj = get_object_or_404(ProjectEnroll, Employee = employee, Project = project)
        enrollmentObj.enrollmentStatus = 'A'
        enrollmentObj.save()
        
        send_email_after_registration(user.email, mailtype='AfterAccept')
        return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist or Employee.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def reject_enroll_request(request):
    try:
        project_name = request.data.get("project")
        username = request.data.get("username")
        
        user = get_object_or_404(User, username = username) 
        employee = get_object_or_404(Employee, user=user)
        project = get_object_or_404(Project, project_name=project_name)
        
        enrollmentObj = get_object_or_404(ProjectEnroll, Employee = employee, Project = project)
        enrollmentObj.enrollmentStatus = 'D'
        enrollmentObj.save()
        
        send_email_after_registration(user.email, mailtype='AfterReject')
        return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist or Employee.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def delete_user(request):
    try:
        username = request.data.get("username")
        user = get_object_or_404(User, username=username)
        mail = user.email
        # Delete user
        user.delete()
        send_email_after_registration(mail, mailtype='AfterDelete')
        return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def upgrade_user(request):
    try:
        username = request.data.get("username")
        user = get_object_or_404(User, username=username)
        employee = get_object_or_404(Employee, user=user)
        mail = user.email
        if employee.user_status == 'P':
            employee.user_status = 'A'
        elif employee.user_status == 'A':
            employee.user_status = 'P'
        employee.save()
        send_email_after_registration(mail, mailtype='AfterUpgrade')
        return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist or Employee.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])  
def send_personal_email(request):
    try:
        username = request.data.get("username")
        subject = request.data.get("subject")
        content = request.data.get("content")
        
        user = get_object_or_404(User, username=username)
        mail = user.email
            
        email_from = settings.EMAIL_HOST_USER
        recepient_list = [mail]
        send_mail(subject=subject, message=content, from_email=email_from, recipient_list=recepient_list)
        return Response({"message": "Mail Sent"}, status=status.HTTP_200_OK)
    except User.DoesNotExist or Employee.DoesNotExist:
        return Response({"error": "Mail not sent"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_terms_and_conditions(request):
     if request.method == 'GET':
        terms_conditions = TermsAndCondition.objects.all()
        serialized_terms = TermsAndConditionsSerializer(terms_conditions, many=True)
        return Response(serialized_terms.data, status=status.HTTP_200_OK)
       

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
            # 'is_verified': serializer.validated_data['verified']
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
    # print(username, password)
    user = authenticate(username=username, password=password)
    print(user)
    if user:
        login(request, user)
        employee = get_object_or_404(Employee, user=user)
        if employee.user_status == 'X': 
            return Response({"title": "Admin"}, status=status.HTTP_302_FOUND)
        return Response({"title": "User"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def user_projects_view(request, username):
    user = get_object_or_404(User, username=username)
    employee = get_object_or_404(Employee, user=user)
    print(username)
     # Check if the user is an admin
    if employee.user_status == 'X':  # 'X' for Admin
        # Indicate a redirect to the client
        print('Admin')
        return Response({"redirect": f"/useradmin/{username}"}, status=status.HTTP_302_FOUND)
    
    # Check if the user has an appropriate status
    if employee.user_status not in ['P', 'A']:  # 'P' for Programmer, 'A' for Architect
        return Response({"error": "Access denied for this user status"}, status=status.HTTP_403_FORBIDDEN)

    # Projects the user is enrolled in (with approved status)
    enrolled_projects = Project.objects.filter(employees=employee, projectenroll__enrollmentStatus='A')
    # Projects the user is enrolled in (with approved status)
    requested_projects = Project.objects.filter(employees=employee, projectenroll__enrollmentStatus = 'R')
    
    # Projects the user is NOT enrolled in
    not_enrolled_projects = Project.objects.exclude(employees=employee)
    
    return Response({
        "username": user.username,
        "firstName": employee.first_name,
        "lastName": employee.last_name,
        "email": employee.user.email,
        "title": employee.user_status,
        "homeAddress": employee.home_address,
        "phone": employee.phone_number,
        
        "enrolled_projects": ProjectSerializer(enrolled_projects, many=True).data,
        "requested_projects": ProjectSerializer(requested_projects, many=True).data,
        "not_enrolled_projects": ProjectSerializer(not_enrolled_projects, many=True).data,
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

class RequestEnrollView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = EnrollRequestSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            project_name = serializer.validated_data['project_name']
            with transaction.atomic():
                try:
                    user = User.objects.get(username=username)
                    employee = Employee.objects.get(user=user)
                    project = Project.objects.get(project_name=project_name)
                    existing_request = ProjectEnroll.objects.filter(Employee=employee, Project=project).first()
                    if existing_request:
                        return Response({"error": "An enrollment request already exists."}, status=status.HTTP_400_BAD_REQUEST)
                    ProjectEnroll.objects.create(Employee=employee, Project=project, enrollmentStatus='R')
                except User.DoesNotExist:
                    return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
                except Employee.DoesNotExist:
                    return Response({"error": "Employee does not exist."}, status=status.HTTP_404_NOT_FOUND)
                except Project.DoesNotExist:
                    return Response({"error": "Project does not exist."}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({"message": "Enrollment request created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
# Helper Methods

def send_email_after_registration(email, token = None, mailtype = 'AfterRegistration'):
    subject = 'Verify your account'
    message = f'Use this link to verify your account  http://127.0.0.1:8000/verify/{token}. T&C will also be sent here.'
    if mailtype == 'AfterAccept':
        message = f'Your application has been accepted.'
    elif mailtype == 'AfterReject':
        message = f'Your application has been rejected. Please try again.'
    elif mailtype == 'AfterDelete':
        message = f'Your account has been deleted.'
    elif mailtype == 'AfterUpgrade':
        message = f'You have been promoted to an Architect.'
        
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

@api_view(['POST'])
def create_project(request):
    project_name = request.data.get('projectTitle')
    project_start_date = request.data.get('startDate')
    project_end_date = request.data.get('endDate')
    sections = request.data.get('sections')
    
    with transaction.atomic():
        try:
            # Create a new enrollment request with "Requested" status
            Project.objects.create(project_name=project_name, project_start_date=project_start_date, project_end_date=project_end_date)
        except:
            return Response({"error": "Couldn't create project."}, status=status.HTTP_404_NOT_FOUND)
        current_project = Project.objects.get(project_name=project_name)
        try:
            for section in sections:
                ProjectSection.objects.create(
                    project=current_project, 
                    project_section_name=section.get('sectionTitle'), 
                    project_section_description=section.get('sectionDesc')
                )
        except:
            return Response({"error": "Cannot create one of the sections."}, status=status.HTTP_404_NOT_FOUND)

    return Response({"message": "Enrollment request created successfully."}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_project(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        
        def get_section(project):
            sections = ProjectSection.objects.filter(project = project)
            filtered_section = [{
                "section_title": section.project_section_name,
                "sectionDesc": section.project_section_description
            } for section in sections]
            return filtered_section
            
        def get_enrollment(project, status):
            enrolls = ProjectEnroll.objects.filter(Project = project, enrollmentStatus = status)
            employee_data = [{
                "name": enroll.Employee.first_name + ' ' + enroll.Employee.last_name,
                "status": enroll.enrollmentStatus
            }
                             for enroll in enrolls]
            return employee_data
        
        project_data = [
            {
                "project_name": project.project_name,
                "start_date": project.project_start_date,  
                "end_date": project.project_end_date, 
                "section":  get_section(project),
                "current_members": get_enrollment(project, 'A')
            } 
            for project in projects
        ]
        print(project_data)
        return Response(project_data, status=status.HTTP_200_OK)

from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer