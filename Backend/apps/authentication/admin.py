from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Permission

admin.site.register(Permission)


class UserCategoryInline(admin.TabularInline):
    model = UserCategory
    extra = 1

class ImagePortfolioInline(admin.TabularInline):
    model = ImagePortfolio
    extra = 0


@admin.register(User)
class UserAdmin(UserAdmin):
    # هنگام ویرایش user 
    fieldsets = (
        (None, {'fields': ('phone_number', 'password', 'first_name', 'last_name', 'national_code', 'nationality', 'birth_date', 'gender', 'status', 'temp', 'step_reg')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', )}),
    )

    # هنگام ساخت user جدید
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2', 'first_name', 'last_name', 'national_code', 'nationality', 'birth_date', 'gender', 'status'),
        }),
    )

    list_display = ['id' ,'phone_number', 'first_name', 'last_name', 'national_code', 'status','date_joined']
    ordering = ['-date_joined',]
    inlines = [UserCategoryInline, ImagePortfolioInline]


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ['id', 'phone_number', 'code', 'created_at']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description', 'created']


@admin.register(UserCategory)
class UserCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'category', 'primary', 'created']


@admin.register(TechnicalInfo)
class TechnicalInfoAdmin(admin.ModelAdmin):
    list_display = ['user', 'height_cm', 'weight_kg', 'hair_color', 'eye_color', 'skin_color', 'created', 'updated']


@admin.register(ImagePortfolio)
class ImagePortfolioAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_body_url', 'full_shot_url', 'created', 'updated']


@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'company_type', 'company_name', 'created', 'updated']