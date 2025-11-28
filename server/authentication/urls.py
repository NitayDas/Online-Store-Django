# authentication/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *



urlpatterns = [
    path('user/', UserProfileView.as_view(), name='user-profile'),
    path("user/<int:pk>/", UpdateUserByIdView.as_view(), name="user-update"),
    path('change-password/', PasswordChangeView.as_view(), name='change-password'),

    # JWT auth
    path("login/", TokenObtainPairView.as_view(), name="jwt-login"),
    path("refresh/", TokenRefreshView.as_view(), name="jwt-refresh"),

]