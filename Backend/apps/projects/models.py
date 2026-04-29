from django.db import models
from apps.authentication.models import User, Category
from django_jalali.db.models import jDateTimeField
from core.validators.dateValidator import date_validator


class Project(models.Model):
    # فیلدهای کارفرمای پروژه و مدل پروژه
    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="employer_projects")
    model = models.ForeignKey(User, on_delete=models.CASCADE, related_name="model_projects",
                              null=True, blank=True)
    
    # مسخصات پروژه
    name = models.CharField(max_length=255)
    description = models.TextField()
    budget = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="projects")
    start_date = models.CharField(max_length=10, validators=[date_validator])
    end_date = models.CharField(max_length=10, validators=[date_validator])
    CHOICE_STATUS = [
        ("pendding", "درحال بررسی"),
        ("accept", "قبول شده"),
        ("rejected", "رد شده"),
        ("in_progress", "در حال اجرا"),     
        ("completed", "تکمیل شده")
    ]
    status = models.CharField(max_length=20, choices=CHOICE_STATUS, default=CHOICE_STATUS[0][0])

    # فیلدهای مستحب
    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-created']
        indexes = [
            models.Index(fields=['status', 'employer']),          
            models.Index(fields=['status', 'category']),          
            models.Index(fields=['status', 'model']),          
            models.Index(fields=['status', 'budget']),        
        ]
    

class ProjectRequest(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="requests") 
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_requests")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver_requests")

    CHOICE_STATUS = [
        ("pendding", "درانتظار"),
        ("accepted", "قبول شده"),
        ("rejected", "رد شده"),
        ("expired", "این پروژه را مدل دیگری برداشت")
    ]
    status = models.CharField(max_length=20, choices=CHOICE_STATUS, default=CHOICE_STATUS[0][0])

    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.project.name} - {self.sender} -> {self.receiver}"
    
    class Meta:
        ordering = ['-created']
        indexes = [
            models.Index(fields=['sender']),
            models.Index(fields=['receiver']),
            models.Index(fields=['project']),
        ]
        unique_together = ['project', 'receiver', 'sender']