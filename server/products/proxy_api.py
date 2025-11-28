import requests

BASE_URL = "https://example.com/api/products/"


def get_all_products():
    return requests.get(BASE_URL).json()


def get_product(pk):
    return requests.get(f"{BASE_URL}{pk}/").json()


def add_product(payload):
    return requests.post(BASE_URL, json=payload).json()


def update_product(pk, payload):
    return requests.put(f"{BASE_URL}{pk}/", json=payload).json()


def delete_product(pk):
    return requests.delete(f"{BASE_URL}{pk}/").json()
