from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.authentication.models import User
from .models import Notification, NotificationRecipient


@receiver(post_save, sender=Notification)
def create_notification_recipient(sender, instance, created, **kwargs):
    if created:
        users = User.objects.none()

        if instance.user:
            users = User.objects.filter(id=instance.user.id)

        elif instance.is_global:
            users = User.objects.filter(groups__name__in=["model", "employer", "instructor"]).distinct()

        elif instance.role:
            users = User.objects.filter(groups__name=instance.role).distinct()

            if instance.category:
                users = users.filter(user_categories__category__id=instance.category.id).distinct()

        recipients = [NotificationRecipient(
            notification=instance,
            receiver=user
        ) for user in users]

        NotificationRecipient.objects.bulk_create(recipients)
    