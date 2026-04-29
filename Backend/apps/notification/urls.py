from django.urls import path
from rest_framework.routers import DefaultRouter
from .views.notificationViewSet import NotificationView
from .views.notificationRecipientView import NotificationRecipientViewSet


router = DefaultRouter()

router.register("notifications", NotificationView, basename="notification")
router.register("recipients", NotificationRecipientViewSet, basename="notification_recipient")

urlpatterns = [

]

urlpatterns += router.urls