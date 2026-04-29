import random
from .models import OTP, User
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def generate_otp(phone):
    code = str(random.randint(100000, 999999))
    OTP.objects.create(phone_number=phone, code=code)
    print(f'OTP for {phone}: {code}')
    return code


def verify_otp(phone, code):
    code = OTP.objects.filter(phone_number=phone, code=code).last()
    
    if not code or code.is_expired():
        return False
    
    else:
        user, created = User.objects.get_or_create(phone_number=phone)
        return {
            'user': user,
            'created': created
        }