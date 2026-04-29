from rest_framework import permissions

class ModelPermission(permissions.BasePermission):
    message = "شما دسترسی کافی به این api را ندارید"

    def has_permission(self, request, view):
        return request.user.groups.filter(name="model").exists()
    

class EmployerPermission(permissions.BasePermission):
    message = "شما دسترسی کافی به این api را ندارید"

    def has_permission(self, request, view):
        return request.user.groups.filter(name="employer").exists()