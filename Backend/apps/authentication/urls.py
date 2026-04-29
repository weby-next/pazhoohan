from django.urls import path
from . import views
from .views1 import ImagePortfolioView 
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('refresh-token/', TokenRefreshView.as_view()),
    path('send-otp/', views.SendOtp.as_view()),
    path('verify-otp/', views.VerifyOtp.as_view()),
    path('basic-info/', views.BasicInfo.as_view()),
    path('set-role/', views.SetUserRole.as_view()),
    path('categories/', views.GetCategories.as_view()),
    path('p-category/', views.PrimaryCategoryAPIView.as_view()),
    path('technical-info/', views.TechnicalInfoAPIView.as_view()),
    path('image-portfolio/', ImagePortfolioView.ImagePortfolioAPIView.as_view()),
    path('employer-profile/', views.EmployerProfileAPIView.as_view()),
]