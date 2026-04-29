from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    message = "شما دسترسی کافی به این api را ندارید"

    def has_permission(self, request, view):
        return request.user.groups.filter(name="owner").exists() or request.user.groups.filter(name="admin").exists()
    
    def has_object_permission(self, request, view, obj):
        return obj.sender == request.user