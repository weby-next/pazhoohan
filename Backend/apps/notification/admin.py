from django.contrib import admin
from .models import *


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "sender", "title", "message", "is_global", "role", "category", "user"]


@admin.register(NotificationRecipient)
class NotificationRecipientAdmin(admin.ModelAdmin):
    list_display = ["id", "notification", "receiver", "is_seen", "created"]
    