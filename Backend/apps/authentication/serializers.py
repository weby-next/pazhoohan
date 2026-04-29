from rest_framework import serializers
from .models import *
from django.core.validators import RegexValidator
from .services import generate_otp
from .validators import phone_validator, otp_validator
import re


class SendOtpSerializer(serializers.Serializer):
    phone_number = serializers.CharField(
        validators=[phone_validator],
        help_text='شماره تلفن کاربر'
    )


class VerifyOtpSerializer(serializers.Serializer):
    phone_number = serializers.CharField(validators=[phone_validator])
    code = serializers.CharField(validators=[otp_validator])
    

class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'national_code', 'nationality', 'gender',
                  'birth_date')
        
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field in self.fields.values():
            field.required = True


class SetUserRoleSerializer(serializers.Serializer):
    role = serializers.ChoiceField(
        choices=['employer', 'instructor', 'model'],
        error_messages={
            'invalid_choice': 'نقش انتخاب شده معتبر نیست'
        }
    )


class CategoreisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'is_active']


class PrimaryCategorySerializer(serializers.Serializer):
    category_id = serializers.IntegerField()


    def validate_category_id(self, value):
        try:
            category = Category.objects.get(id=value, is_active=True)
        except Category.DoesNotExist:
            raise serializers.ValidationError("دسته بندی مورد نظر یافت نشد")
        
        return value
    

class TechnicalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalInfo
        fields = "__all__"
        read_only_fields = ['user', 'created', 'updated']
        

class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = "__all__"
        read_only_fields = ['user', 'created', 'updated']