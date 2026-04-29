from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager
from django_jalali.db.models import jDateTimeField, jDateField
from django.utils import timezone
from .validators import *
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid


class User(AbstractBaseUser, PermissionsMixin):
    # Basic data
    phone_number = models.CharField(max_length=11, unique=True, validators=[phone_validator])
    first_name = models.CharField(max_length=70, null=True, blank=True)
    last_name = models.CharField(max_length=70,null=True, blank=True)
    national_code = models.CharField(max_length=10, validators=[nationalCode_validator], null=True, blank=True)
    nationality = models.CharField(max_length=150, null=True, blank=True)
    birth_date = models.CharField(max_length=10, validators=[date_validator], null=True, blank=True)
    CHOICES_GENDER = [
        ("female", "زن"),
        ("male", "مرد"),
    ]
    gender = models.CharField(max_length=6, choices=CHOICES_GENDER, null=True, blank=True)
    CHOICES_STATUS = [
        ("accept", "تایید شده"),
        ("reject", "رد شده"),
        ("pendding", "درحال بررسی"),
    ]
    status = models.CharField(max_length=8, choices=CHOICES_STATUS, default=CHOICES_STATUS[2][0])
    CHOICES_WORK_STATUS = [
        ("unemployed", "غیر کارفرما"),
        ("employed", "کارفرما"),
        ("student", 'دانشجو'),
        ("other", "دیگر")
    ]
    work_status = models.CharField(max_length=10, choices=CHOICES_WORK_STATUS, null=True, blank=True)

    # user_categories
    categories = models.ManyToManyField('Category', through='UserCategory', related_name='users')


    temp = models.CharField(max_length=500, null=True, blank=True)
    step_reg = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(6)
        ],
        null=True, blank=True
    )
    
    # ------------------------------------------------------------

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    date_joined = jDateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.phone_number

    
class OTP(models.Model):
    phone_number = models.CharField(max_length=11, validators=[phone_validator])
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return (timezone.now() - self.created_at).seconds > 120
    
    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['phone_number'])]


class Category(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=250, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
        indexes = [models.Index(fields=['name'])]

    def __str__(self):
        return self.name
    

class UserCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_categories")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="user_categories")
    primary = models.BooleanField(default=False)
    created = jDateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'category']


class TechnicalInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="technical_info")
    height_cm = models.PositiveIntegerField()
    weight_kg = models.PositiveIntegerField()
    skin_color = models.CharField(max_length=150)
    eye_color = models.CharField(max_length=150)
    hair_color = models.CharField(max_length=150)

    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    def __str__(self):
        return self.user.phone_number
    
    class Meta:
        ordering = ['-created']
    

def portfolio_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"

    return f"portfolio/user_{instance.user.id}/{filename}"

class ImagePortfolio(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="images_portfolio")
    full_body_url = models.ImageField(upload_to=portfolio_upload_path)
    full_shot_url = models.ImageField(upload_to=portfolio_upload_path)

    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    def __str__(self):
        return self.user.phone_number
    
    class Meta:
        ordering = ['-created']


class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="employer_profile")

    COMPANY_TYPE_CHOICES = [
        ("individual", "شخص حقیقی"),
        ("company", "شرکت"),
        ("agency", "آژانس")
    ]
    company_type = models.CharField(max_length=20, choices=COMPANY_TYPE_CHOICES)
    company_name = models.CharField(max_length=255)

    email = models.EmailField()
    website = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)

    city = models.CharField(max_length=255)
    address = models.TextField()

    description = models.TextField(null=True, blank=True)

    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    def __str__(self):
        return self.user.phone_number
    
    class Meta:
        ordering = ['-created']