# serializers.py
from rest_framework import serializers
from .models import Employee, TermsAndCondition, GENDER_CHOICES, Project


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    img = serializers.ImageField(source='profile_image')
    
    class Meta:
        model = Employee
        fields = ('id', 'name', 'img', 'username')
        
    def get_name(self, obj):
        # Combine the first, middle, and last names
        name = obj.first_name
        if obj.middle_name:
            name += ' ' + obj.middle_name
        name += ' ' + obj.last_name
        return name.strip()
    def get_username(self, obj):
        return obj.user.username
        
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
    file = serializers.ImageField()

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
    
    
def geturl(obj):
    if obj.profile_image:
        return obj.profile_image.url
    return None

def getsectionimageurl(obj):
    return obj.project_section_image.url
    if obj.project_section_image:
        return obj.project_section_image.url
    return None

def parse_nested_formdata(formdata):
    data = {}
    for key in formdata:
        parts = key.split('[')
        if len(parts) > 1:
            main_key = parts[0]
            sub_keys = [part.replace(']', '') for part in parts[1:]]
            sub_data = data.setdefault(main_key, [])

            current_level = sub_data
            for i, sub_key in enumerate(sub_keys):
                if sub_key.isdigit():
                    sub_key = int(sub_key)
                    while len(current_level) <= sub_key:
                        current_level.append({})
                    if i == len(sub_keys) - 1:
                        current_level[sub_key] = formdata.getlist(key)[0] if len(formdata.getlist(key)) == 1 else formdata.getlist(key)
                    else:
                        current_level = current_level[sub_key]
                else:
                    if isinstance(current_level, list):
                        if not current_level:
                            current_level.append({})
                        if i == len(sub_keys) - 1:
                            current_level[0][sub_key] = formdata.get(key)
                        else:
                            current_level = current_level[0].setdefault(sub_key, [])
                    elif isinstance(current_level, dict):
                        if i == len(sub_keys) - 1:
                            current_level[sub_key] = formdata.get(key)
                        else:
                            current_level = current_level.setdefault(sub_key, [])
        else:
            data[key] = formdata.get(key)
    return data