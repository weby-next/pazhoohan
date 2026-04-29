from rest_framework.viewsets import ModelViewSet
from ..serializer.projectSerializer import ProjectSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import Project
from core.permissions.isEmployerPermission import IsEmployer
from core.permissions.isProjectEmployer import IsProjectEmployer
from core.apiResponse.apiResponse import ApiResponse
from rest_framework.decorators import action
from django.db import transaction


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        if self.action == "list":
            employer = self.request.user
            return Project.objects.filter(employer=employer)
        return Project.objects.all().select_related("employer", "model", "category")
    

    def get_permissions(self):
        if self.action in ["list", "create"]:
            return [IsAuthenticated(), IsEmployer()]
        elif self.action in ["update", 'partial_update', "destroy", "bulk-delete"]:
            return [IsAuthenticated(), IsEmployer(), IsProjectEmployer()]
        return [IsAuthenticated()]


    def destroy(self, request, *args, **kwargs):
        project = self.get_object()

        if project.status in ["in_progress", "completed"]:
            return ApiResponse.error(
                message="امکان حذف پروژه در حال اجرا یا کامل شده نیست",
            )
        
        project_id = project.id 
        project_name = project.name 

        project.delete()
        return ApiResponse.success(
            message="پروژه با موفقیت حذف شد",
            data={
                'id': project_id,
                'name': project_name,
            }
        )
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        return ApiResponse.success(
            message="project fetched successfully",
            data=serializer.data
        )
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(employer=request.user)
        return ApiResponse.success(
            message="create project successfully",
            data=serializer.data
        )
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return ApiResponse.success(
            message="updated project successfully",
            data=serializer.data
        )
    
    @action(detail=False, methods=["post"], url_path="bulk-delete")
    def bulk_delete(self, request):
        ids = request.data.get("ids", [])
        
        if not ids:
            return ApiResponse.error(
                message="فیلد ids اجباری است",
            )
        
        projects = Project.objects.filter(id__in=ids, employer=request.user)

        if not projects:
            return ApiResponse.error(
                message="شما به object های فوق دسترسی ندارید"
            )


        forbidden = projects.filter(status__in=['in_progress', 'completed'])
        if forbidden.exists():
            return ApiResponse.error(
                message="برخی پروژه ها قابل حذف نیستند"
            )
         
        with transaction.atomic():
            count_delete = projects.delete()[0]

        return ApiResponse.success(
            message="پروژه های انتخاب شده با موفقیت حذف شد",
            data={
                "count_deleted": count_delete
            }
        )