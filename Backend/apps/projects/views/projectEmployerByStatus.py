from rest_framework.generics import ListAPIView
from ..serializer.projectSerializer import ProjectSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions.isEmployerPermission import IsEmployer
from ..models import Project


class ProjectEmployerListView(ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsEmployer]

    def get_queryset(self):
        queryset = Project.objects.filter(employer=self.request.user)
        status_param = self.request.query_params.get("status")

        if status_param:
            queryset = Project.objects.filter(status=status_param, employer=self.request.user)

        return queryset