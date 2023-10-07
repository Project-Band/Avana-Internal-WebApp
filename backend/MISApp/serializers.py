# serializers.py
from rest_framework import serializers
from .models import Employee, TermsAndCondition

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

class ApplicationSerializer(serializers.ModelSerializer):
    request = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    
    class Meta:
        model = Employee
        fields = ('id', 'name', 'request')
    
    def get_request(self, obj):
        # Combine the first, middle, and last names
        name = obj.first_name
        if obj.middle_name:
            name += ' ' + obj.middle_name
        name += ' ' + obj.last_name
        return name.strip()
    def get_name(self, obj):
        return 'Application'+str(obj.id)
        
class TermsAndConditionSerializer(serializers.ModelSerializer):
    desc = serializers.CharField(source='clause')  # to map 'clause' to 'desc' as per the frontend structure

    class Meta:
        model = TermsAndCondition
        fields = ('id', 'title', 'desc')    
        
