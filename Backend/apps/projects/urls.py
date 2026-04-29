from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

# روتر برای پروژه
router.register("projects", ProjectViewSet, basename="projects")
# روتر برای درخواست اهای پروژه
router.register("project/requests", ProjectRequestView, basename="project_requests")


# آدرس های پروژه
urlpatterns = [
    path("projects-employer", ProjectEmployerListView.as_view()),
    path("projects-model", ProjectModelListView.as_view()),
]

urlpatterns += router.urls