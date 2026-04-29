from rest_framework.generics import ListAPIView
from ..serializer.projectSerializer import ProjectSerializer
from rest_framework.permissions import IsAuthenticated
from core.permissions.IsModelPermission import IsModel
from ..models import Project


class ProjectModelListView(ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsModel]

    def get_queryset(self):
        queryset = Project.objects.filter(status="accept")
        status_params = self.request.query_params.get("status")

        if status_params:
            queryset = Project.objects.filter(status=status_params, model=self.request.user)
        return queryset