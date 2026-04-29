from rest_framework.permissions import BasePermission


class IsRequestReceiverer(BasePermission):
    message = "شما نمیتوانید درخواست گرفته شده را آپدیت کنید" 

    def has_object_permission(self, request, view, obj):
        return obj.receiver == request.user