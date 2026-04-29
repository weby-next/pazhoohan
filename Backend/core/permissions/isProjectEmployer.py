from rest_framework import permissions

class IsProjectEmployer(permissions.BasePermission):
    message = "شما دسترسی مجاز را به این object ندارید"

    def has_object_permission(self, request, view, obj):
        return obj.employer == request.user