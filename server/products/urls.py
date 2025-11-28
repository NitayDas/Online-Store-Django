from django.urls import path
from .views import ProductsFromAPI, ProductDetailsAPI, AddProductAPI

urlpatterns = [
    path("products/", ProductsFromAPI.as_view()),
    path("products/add/", AddProductAPI.as_view()),
    path("products/<int:pk>/", ProductDetailsAPI.as_view()),
]
