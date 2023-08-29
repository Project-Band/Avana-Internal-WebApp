from django.db import models
from django.contrib.auth.models import User

# Choices
GENDER_CHOICES =[
    ('M', "Male"),
    ('F', "Female"),
    ('O', "Other"),
]

USER_STATUS_CHOICES = [
    ('P', "Programmer"),
    ('A', "Architects"),
    ('W', "Waiting Approval"),
]

PROJECT_STATUS = [
        ('A', "Active"),
        ('C', "Completed"),
        ('S', 'Scrapped'),
    ]
ENROLLMENT_STATUS = [
        ('R', "Requested"),
        ('A', "Approved"),
    ]
# Employee Model
class Employee(models.Model):
    # user model and verification
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank= True, null=True)
    auth_token = models.CharField(max_length=100, blank= True, null=True)
    is_verified = models.BooleanField(default=False)
    
    # other information
    first_name = models.CharField(max_length=100, blank=True, null=True)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    home_address = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='O')
    profile_image = models.ImageField(blank=True, null=True)
    user_status = models.CharField(max_length=1, choices=USER_STATUS_CHOICES, default='W')
    
    def __str__(self):
        return self.user.username
    
# Project Model
class Project(models.Model):
    project_name = models.CharField(max_length=100)
    project_description = models.TextField(max_length=1000)
    project_start_date = models.DateField()
    project_end_date = models.DateField()
    project_status = models.CharField(max_length=1, choices=PROJECT_STATUS, default = 'A')
    
# Terms and Conditions Model
class TermsAndConditions(models.Model):
    title = models.CharField(max_length=50)
    clause = models.CharField(max_length=1000)
    
# Enroll Model
class ProjectEnroll(models.Model):
    Employee = models.ForeignKey(Employee)
    Project = models.ForeignKey(Project)
    enrollmentStatus = models.CharField(max_length=1, choices=ENROLLMENT_STATUS, default = 'R')