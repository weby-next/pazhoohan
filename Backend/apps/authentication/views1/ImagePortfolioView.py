from ..models import ImagePortfolio, User
from core.apiResponse.apiResponse import ApiResponse
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from ..serializers1.ImagePortfolioSerializer import ImagePortfolioSerializer
from rest_framework.permissions import IsAuthenticated

class ImagePortfolioAPIView(GenericAPIView):
    serializer_class = ImagePortfolioSerializer
    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]

    def get_user(self):
        return self.request.user

    def get(self, request):
        user = self.get_user()
        instance = getattr(user, "images_portfolio", None)

        if not instance:
            return ApiResponse.error(
                message="Portfolio images not found"
            )

        serializer = self.get_serializer(instance)

        return ApiResponse.success(
            message="portfolio fetched successfully",
            data=serializer.data
        )
    

    def post(self, request):
        user = self.get_user()

        if hasattr(user, "images_portfolio"):
            return ApiResponse.error(
                message="portfolio allready exists"
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(user=user)

        user.step_reg = 6
        user.save()

        return ApiResponse.success(
            message="portfolio created successfully",
            data=serializer.data
        )
    

    def patch(self, request):
        user = self.get_user()

        instance = getattr(user, "images_portfolio", None)

        if not instance:
            return ApiResponse.error(
                message="portfolio not found"
            )
        
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return ApiResponse.success(
            message="updated portfolio successfully",
            data=serializer.data
        )
    

    
    