from rest_framework.permissions import BasePermission


class IsReceiverNotification(BasePermission):
    message = "شما دسترسی به این obj ندارید" 

    def has_object_permission(self, request, view, obj):
        return obj.receiver == request.user