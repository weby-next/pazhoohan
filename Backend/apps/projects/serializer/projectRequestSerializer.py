from rest_framework import serializers
from ..models import ProjectRequest


class ProjectRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRequest
        fields = "__all__"
        read_only_fields = ['sender', 'receiver']