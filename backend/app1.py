# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)

# Base API for clothing categories
CATEGORIES = [
    'mens-shirts', 'mens-shoes', 'mens-watches',
    'womens-dresses', 'womens-shoes', 'womens-watches',
    'tops'
]

BASE_URL = "https://dummyjson.com/products/category/"

SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Beige']

def fetch_and_expand_data():
    """Fetch all clothing categories and enrich products with size, color, and variation."""
    all_products = []

    for category in CATEGORIES:
        try:
            res = requests.get(f"{BASE_URL}{category}")
            res.raise_for_status()
            data = res.json().get("products", [])

            for product in data:
                product['sizes'] = random.sample(SIZES, k=random.randint(2, 5))
                product['colors'] = random.sample(COLORS, k=random.randint(2, 5))
                product['category'] = category
                product['stock'] = random.randint(10, 100)
                product['rating'] = round(random.uniform(3.5, 5.0), 1)

                # Duplicate product slightly to simulate a large catalog
                for i in range(3):  # replicate 3 times with minor variations
                    new_product = product.copy()
                    new_product['id'] = f"{product['id']}-{i}"
                    new_product['title'] += f" Variant {i+1}"
                    new_product['price'] += i * 20
                    all_products.append(new_product)

        except requests.RequestException as e:
            print(f"Error fetching category {category}: {e}")

    return all_products

# Cache expanded clothing data
PRODUCTS = fetch_and_expand_data()

@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search', '').lower()

    filtered = PRODUCTS

    if category:
        filtered = [p for p in filtered if p['category'] == category]

    if search:
        filtered = [
            p for p in filtered
            if search in p['title'].lower() or search in p['description'].lower()
        ]

    return jsonify({ "products": filtered })

@app.route('/api/categories', methods=['GET'])
def get_categories():
    return jsonify({ "categories": CATEGORIES })

if __name__ == '__main__':
    app.run(debug=True, port=5002)