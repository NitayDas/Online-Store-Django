import requests



BASE_URL = "https://fakestoreapi.com/products"

def get_all_products():
    try:
        response = requests.get(BASE_URL, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        return {"error": "Failed to fetch products"}
    except ValueError as e:
        print("JSON decode error:", e)
        return {"error": "Invalid JSON response"}




def get_products_by_category(category):
    try:
        response = requests.get(f"{BASE_URL}/category/{category}", timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        return {"error": f"Failed to fetch products for category '{category}'"}
    except ValueError as e:
        print("JSON decode error:", e)
        return {"error": "Invalid JSON response"}




def get_product(pk):
    try:
        response = requests.get(f"{BASE_URL}{pk}/", timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        return {"error": f"Failed to fetch product {pk}"}
    except ValueError as e:
        print("JSON decode error:", e)
        return {"error": "Invalid JSON response"}





def add_product(payload):
    try:
        files = {}
        data = payload.copy()

        # If there's an image file, pop it from data and add to files
        if "image" in payload:
            files["image"] = payload.pop("image")

        response = requests.post(BASE_URL, data=data, files=files, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        return {"error": "Failed to add product"}
    except ValueError as e:
        print("JSON decode error:", e)
        return {"error": "Invalid JSON response"}





def update_product(pk, payload):
    try:
        files = {}
        data = payload.copy()

        # If there's an image file, pop it from payload and add to files
        if "image" in payload:
            files["image"] = payload.pop("image")

        response = requests.put(f"{BASE_URL}{pk}/", data=data, files=files, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        return {"error": f"Failed to update product {pk}"}
    except ValueError as e:
        print("JSON decode error:", e)
        return {"error": "Invalid JSON response"}




def delete_product(pk):
    try:
        response = requests.delete(f"{BASE_URL}{pk}/", timeout=5)
        response.raise_for_status()
        # Some APIs return an empty response for DELETE
        try:
            return response.json()
        except ValueError:
            return {"message": f"Product {pk} deleted successfully"}
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        return {"error": f"Failed to delete product {pk}"}
