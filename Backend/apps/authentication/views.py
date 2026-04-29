from .models import *
from rest_framework import generics, views
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from .services import *
from core.apiResponse.apiResponse import ApiResponse
from django.contrib.auth.models import Group


class SendOtp(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SendOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone_number = serializer.validated_data['phone_number']
        code = generate_otp(phone_number)

        return ApiResponse.success(
            message="Send OTP seccessfuly",
            data={
                'phone_number': f'{phone_number}',
                "expired_OTP": 120,
                "OTP_code": code
            }
        )


class VerifyOtp(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = VerifyOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        code = serializer.validated_data['code']

        verify = verify_otp(phone_number, code)

        if verify:

            user = verify["user"]
            
            tokens = get_tokens_for_user(user)
            

            if verify['created']:
                user.step_reg = 1
                user.save()

            return ApiResponse.success(
                message="User verified successfully",
                data={
                    "phone_number": phone_number,
                    "step_registeration": user.step_reg,
                    "status": user.status,
                    "registered": True if user.step_reg == 6 else False,
                    "tokens": tokens
                }
            )

        return ApiResponse.error(
            message="Verify user is failed!",
            errors={
                "otp": "Invalid phone number or verification code"
            }
        )
    

# نمونه درخواست:
# {
#   "first_name": "",
#   "last_name": "",
#   "national_code": "",
#   "nationality": "",
#   "gender": "",
#   "birth_date": ""
# }
class BasicInfo(generics.RetrieveUpdateAPIView):
    serializer_class = BasicInfoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        

        return ApiResponse.success(
            message="User basic info fetched successfully",
            data=serializer.data
        )
    

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        instance.step_reg = 2
        instance.save()

        return ApiResponse.success(
            message="User basic info update successfully",
            data=serializer.data
        )
    

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    

class SetUserRole(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SetUserRoleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        role_name = serializer.validated_data["role"]
        user = request.user
        role_group = Group.objects.get(name=role_name)


        user.groups.add(role_group)
        user.step_reg = 3
        user.save()
        return ApiResponse.success(
            message="نقش کاربر با موفقیت ثبت شد",
            data={
                "user_id": user.id,
                "roles_name": list(user.groups.values_list("name", flat=True)),
            }
        )
    

class GetCategories(generics.ListAPIView):
    serializer_class = CategoreisSerializer
    permission_classes = [AllowAny]
    queryset = Category.objects.all()


class PrimaryCategoryAPIView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        try:
            primary_category = UserCategory.objects.filter(
                user=user, 
                primary=True
            ).select_related('category').first()  

            data = {
                "id": primary_category.category.id,
                "name": primary_category.category.name,
                "name_persian": primary_category.category.description
            }

            return ApiResponse.success(
                message="fetch primary category successfully",
                data=data
            )

        except:
            return ApiResponse.error(
                message="primary category",
                errors={
                    "category_id": "User is not have primary category"
                }
            )
        
    def post(self, request):
        serializer = PrimaryCategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        category_id = serializer.validated_data['category_id']
        category = Category.objects.get(id=category_id)

        UserCategory.objects.filter(user=user, primary=True).update(primary=False)

        user_category, created = UserCategory.objects.update_or_create(
            user=user,
            category=category,
            defaults={"primary": True}
        )

        if created:
            user.step_reg = 4
            user.save()

        data = {
            "id": category.id,
            "name": category.name,
            "name_persian": category.description
        }

        return ApiResponse.success(
            message="Set primary category successfully",
            data=data
        )
    
# {
#   "height_cm": 170,
#   "weight_kg": 65,
#   "skin_color": "light",
#   "eye_color": "black",
#   "hair_color": "brown"
# }
class TechnicalInfoAPIView(generics.GenericAPIView):
    from .permissions import ModelPermission
    serializer_class = TechnicalInfoSerializer
    permission_classes = [IsAuthenticated, ModelPermission]

    def get_user(self):
        return self.request.user
    
    def get_object(self):
        return self.request.user.technical_info


    def post(self, request):
        user = self.get_user()

        if hasattr(user, "technical_info"):
            return ApiResponse.error(
                message="Thecnical Info already exists"
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)

        user.step_reg = 5
        user.save()

        return ApiResponse.success(
            message="Thechnical info created successfully",
            data=serializer.data
        )
    

    def patch(self, request):
        instance = self.get_object()

        if not instance:
            return ApiResponse.error(
                message="Techninal info not found"
            )
        
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return ApiResponse.success(
            message="Technical info updated successfully",
            data=serializer.data 
        )
    

    def get(self, request):
        technical_info = self.get_object()

        if not technical_info:
            return ApiResponse.error(
                message="technical info not found"
            )
        
        serializer = self.get_serializer(technical_info)

        return ApiResponse.success(
            message="Technical info fetched successfully",
            data=serializer.data
        )
    
# {
#   "company_type": "company",
#   "company_name": "شرکت اجی بل بل",
#   "email": "heidari@gmail.com",
#   "instagram": "",
#   "website": "",
#   "city": "Isfahan",
#   "address": "اصفهان نجف اباد بلوار ازادگان",
#   "description": ""
# }
class EmployerProfileAPIView(generics.GenericAPIView):
    from .permissions import EmployerPermission
    serializer_class = EmployerProfileSerializer
    permission_classes = [IsAuthenticated, EmployerPermission]

    def get_user(self):
        return self.request.user
    
    def get_object(self):
        return self.request.user.employer_profile


    def post(self, request):
        user = self.get_user()

        if hasattr(user, "employer_profile"):
            return ApiResponse.error(
                message="Employer profile already exists"
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)

        user.step_reg = 5
        user.save()

        return ApiResponse.success(
            message="Employer profile created successfully",
            data=serializer.data
        )
    

    def patch(self, request):
        instance = self.get_object()

        if not instance:
            return ApiResponse.error(
                message="Employer profile not found"
            )
        
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return ApiResponse.success(
            message="Employer profile updated successfully",
            data=serializer.data 
        )
    

    def get(self, request):
        employer_profile = self.get_object()

        if not employer_profile:
            return ApiResponse.error(
                message="Employer profile not found"
            )
        
        serializer = self.get_serializer(employer_profile)

        return ApiResponse.success(
            message="Employer profile fetched successfully",
            data=serializer.data
        )