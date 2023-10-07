
from django.contrib import admin
from MISApp import models
from django.contrib.auth.models import User, Group

class UserAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'is_verified', 'user_status']
admin.site.register(models.Employee, UserAdmin)

class ProjectAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'project_end_date', 'project_status']
admin.site.register(models.Project, ProjectAdmin)

class TnCAdmin(admin.ModelAdmin):
    list_display = ['title']
admin.site.register(models.TermsAndCondition, TnCAdmin)

class EnrollAdmin(admin.ModelAdmin):
    list_display = ['enrollmentStatus', 'Project', 'Employee']
admin.site.register(models.ProjectEnroll, EnrollAdmin)

