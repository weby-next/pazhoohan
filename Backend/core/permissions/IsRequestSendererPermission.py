from rest_framework.permissions import BasePermission


class IsRequestSenderer(BasePermission):
    message = "شما نمیتوانید درخواست های گرفته شده را پاک کنید" 

    def has_object_permission(self, request, view, obj):
        return obj.sender == request.user