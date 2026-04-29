from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ProjectRequest, Project
from django.db import transaction

@receiver(post_save, sender=ProjectRequest)
def update_project_model_on_accept(sender, instance, created, **kwargs):
    if instance.status != "accepted":
        return

    # تراکنش اتمیک برای جلوگیری از race conditions
    with transaction.atomic():
        # قفل رکورد پروژه تا تمام عملیات داخل همین بلاک انجام شود
        project = Project.objects.select_for_update().get(id=instance.project.id)

        # بررسی اینکه آیا پروژه قبلا توسط مدل دیگری گرفته شده
        if project.model:
            # اگر قبلاً مدل داشته، وضعیت درخواست فعلی باید به expired تغییر کند
            instance.status = "expired"
            instance.save(update_fields=["status"])
            return

        # تعیین مدل پروژه بر اساس سمت درخواست
        if instance.sender.groups.filter(name="employer").exists():
            selected_model = instance.receiver
        else:
            selected_model = instance.sender

        # تنظیم فیلدها
        project.model = selected_model
        project.status = "in_progress"
        project.save(update_fields=["model", "status"])

        # بروزرسانی سایر درخواست‌های در انتظار برای همین پروژه
        ProjectRequest.objects.filter(
            project=project,
        ).exclude(id=instance.id).update(
            status="expired"
        )