from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .proxy_api import (
    get_all_products,
    get_product,
    add_product,
    update_product,
    delete_product,
    get_products_by_category
)



# GET all products
class ProductsFromAPI(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        category = request.query_params.get("category")
        if category:
            products = get_products_by_category(category)
        else:
            products = get_all_products()
        return Response(products)

    def post(self, request):
        created = add_product(request.data)
        return Response(created, status=status.HTTP_201_CREATED)



# GET detail, UPDATE, DELETE
class ProductDetailsAPI(APIView):

    def get(self, request, pk):
        data = get_product(pk)
        return Response(data)


    def put(self, request, pk):
        updated = update_product(pk, request.data)
        return Response(updated)


    def delete(self, request, pk):
        deleted = delete_product(pk)
        return Response(deleted, status=status.HTTP_204_NO_CONTENT)
