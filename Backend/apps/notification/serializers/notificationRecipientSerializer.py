from rest_framework import serializers
from ..models import NotificationRecipient
from .notificationSerializer import NotificationSerializer

class NotificationRecipientSerializer(serializers.ModelSerializer):
    notification = NotificationSerializer(read_only=True)

    class Meta:
        model = NotificationRecipient
        fields = ["id", "is_seen", "seen_at", "created", "notification", 'receiver']