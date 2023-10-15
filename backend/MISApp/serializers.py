# serializers.py
from rest_framework import serializers
from .models import Employee, TermsAndCondition, GENDER_CHOICES, Project


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    img = serializers.ImageField(source='profile_image')
    
    class Meta:
        model = Employee
        fields = ('id', 'name', 'img')
        
    def get_name(self, obj):
        # Combine the first, middle, and last names
        name = obj.first_name
        if obj.middle_name:
            name += ' ' + obj.middle_name
        name += ' ' + obj.last_name
        return name.strip()
        
class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndCondition
        fields = ['title', 'clause']
        
class EnrollRequestSerializer(serializers.ModelSerializer):
    pass


class EmployeeRegistrationSerializer(serializers.Serializer):
    firstName = serializers.CharField(max_length=100)
    lastName = serializers.CharField(max_length=100)
    homeAddress = serializers.CharField(max_length=100)
    emailAddress = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    phone = serializers.CharField(max_length=10)
    username = serializers.CharField()
    gender = serializers.ChoiceField(choices=[(choice[0], choice[0]) for choice in GENDER_CHOICES])

    def create(self, validated_data):
        # This will not actually be used for creating objects directly,
        # as we'll handle that in our view.
        pass

    def update(self, instance, validated_data):
        # This serializer will be used only for registration (i.e., creation),
        # so we won't implement updating here.
        pass
    
    class Meta:
        model = Employee
        fields = ('id', 'firstName', 'lastName', 'homeAddress', 'emailAddress', 'password', 'phone', 'username', 'gender')

class ProjectSerializer(serializers.ModelSerializer):
    enrolled_employees = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ('id', 'project_name', 'project_description', 'project_start_date', 'project_end_date', 'project_status', 'enrolled_employees')

    def get_enrolled_employees(self, obj):
        # Filtering only the approved employees for a given project
        employees = Employee.objects.filter(projectenroll__Project=obj, projectenroll__enrollmentStatus='A')
        return EmployeeSerializer(employees, many=True).data
    
class EnrollRequestSerializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    project_name = serializers.CharField(required = True)