
# # Register your models here.
# class  UserAdmin(admin.ModelAdmin):
#     list_display = ['first_name', 'last_name', 'is_verified', 'user_status']

# admin.site.register(models.Employee, UserAdmin)

from django.contrib import admin
from MISApp import models
from django.contrib.auth.models import User, Group

# admin.site.unregister(User)
# admin.site.unregister(Group)
# =================================================================
# # Header
# class AdminAreaHeader(admin.AdminSite):
#     site_header = 'Avana Admin Area'

# # New Registration Application
# class EmployeeAdmin(admin.ModelAdmin):
#     list_display = ('user', 'first_name', 'last_name', 'user_status')  # Fields to display
#     list_filter = ('user_status',)  # Field to filter by
    
#     # Custom queryset to only show employees that are "Waiting Approval"
#     def get_queryset(self, request):
#         return super().get_queryset(request).filter(user_status='W')
    
#     # Custom action for setting user status to "Programmer"
#     def make_programmer(self, request, queryset):
#         queryset.update(user_status='P')
    
#     # Custom action for setting user status to "Architect"
#     def make_architect(self, request, queryset):
#         queryset.update(user_status='A')
    
#     # Adding custom actions to the admin interface
#     actions = [make_programmer, make_architect]
    
#     make_programmer.short_description = "Mark selected employees as Programmers"
#     make_architect.short_description = "Mark selected employees as Architects"
# admin.site.register(models.Employee, EmployeeAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'is_verified', 'user_status']
admin.site.register(models.Employee, UserAdmin)

class ProjectAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'project_end_date', 'project_status']
admin.site.register(models.Project, ProjectAdmin)

class TnCAdmin(admin.ModelAdmin):
    list_display = ['title']
admin.site.register(models.TermsAndConditions, TnCAdmin)

class EnrollAdmin(admin.ModelAdmin):
    list_display = ['enrollmentStatus', 'Project', 'Employee']
admin.site.register(models.ProjectEnroll, EnrollAdmin)

