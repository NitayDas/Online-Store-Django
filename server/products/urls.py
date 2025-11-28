from django.urls import path
from .views import ProductsFromAPI, ProductDetailsAPI

urlpatterns = [
    path("products/", ProductsFromAPI.as_view()),
    path("products/<int:pk>/", ProductDetailsAPI.as_view()),
]
