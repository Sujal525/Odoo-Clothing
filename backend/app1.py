# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

USER_IDS = ["auth0|user123", "auth0|user456"]
USER_PROFILES = {
    "auth0|user123": {"points": 150, "avatar": None},
    "auth0|user456": {"points": 80, "avatar": None},
}

CATEGORIES = [
    "mens-shirts", "mens-shoes", "mens-watches",
    "womens-dresses", "womens-shoes", "womens-watches",
    "tops",
]
BASE_URL = "https://dummyjson.com/products/category/"

SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
COLORS = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Beige"]

def fetch_and_expand_data():
    products = []
    for cat in CATEGORIES:
        try:
            resp = requests.get(f"{BASE_URL}{cat}")
            resp.raise_for_status()
            for p in resp.json().get("products", []):
                enriched = {
                    **p,
                    "sizes": random.sample(SIZES, k=3),
                    "colors": random.sample(COLORS, k=3),
                    "category": cat,
                    "stock": random.randint(5, 50),
                    "rating": round(random.uniform(3.5, 5.0), 1),
                    "owner": random.choice(USER_IDS),
                    "status": random.choice(["pending", "in_progress", "active"]),
                    "images": p.get("images", []),
                }
                products.append(enriched)
        except Exception as e:
            print(f"Error fetching {cat}: {e}")
    return products

PRODUCTS = fetch_and_expand_data()

SWAPS = [
    {
        "id": "swap1",
        "user": "auth0|user123",
        "withUserName": "Alice",
        "yourItemTitle": "Shirt Variant A",
        "theirItemTitle": "Dress Variant B",
        "status": "pending",
        "completedAt": None,
    },
    {
        "id": "swap2",
        "user": "auth0|user123",
        "withUserName": "Bob",
        "yourItemTitle": "Watch Variant X",
        "theirItemTitle": "Top Variant Y",
        "status": "in_progress",
        "completedAt": None,
    },
    {
        "id": "swap3",
        "user": "auth0|user123",
        "withUserName": "Charlie",
        "yourItemTitle": "Shoes Variant M",
        "theirItemTitle": "Bag Variant N",
        "status": "completed",
        "completedAt": (datetime.utcnow() - timedelta(days=1)).isoformat(),
    },
]

# Sample purchases
PURCHASES = [
    {
        "id": "p1",
        "user": "auth0|user123",
        "itemTitle": "Elegant Dress Variant 1",
        "purchasedAt": (datetime.utcnow() - timedelta(days=3)).isoformat(),
        "pointsSpent": 50
    },
    {
        "id": "p2",
        "user": "auth0|user123",
        "itemTitle": "Casual Shirt Variant 2",
        "purchasedAt": (datetime.utcnow() - timedelta(days=7)).isoformat(),
        "pointsSpent": 30
    },
]

@app.route("/api/users/<user_id>/profile", methods=["GET"])
def get_profile(user_id):
    return jsonify(USER_PROFILES.get(user_id, {"points": 0, "avatar": None}))

@app.route("/api/items", methods=["GET"])
def get_items():
    owner = request.args.get("owner")
    filtered = [p for p in PRODUCTS if p["owner"] == owner] if owner else PRODUCTS
    return jsonify({"items": filtered})

@app.route("/api/swaps", methods=["GET"])
def get_swaps():
    user = request.args.get("user")
    status = request.args.get("status", "")
    statuses = [s.strip() for s in status.split(",") if s]
    swaps = [s for s in SWAPS if s["user"] == user] if user else SWAPS
    if statuses:
        swaps = [s for s in swaps if s["status"] in statuses]
    return jsonify({"swaps": swaps})

@app.route("/api/purchases", methods=["GET"])
def get_purchases():
    user = request.args.get("user")
    filtered = [p for p in PURCHASES if p["user"] == user] if user else PURCHASES
    return jsonify({"purchases": filtered})

@app.route("/api/items/<int:item_id>", methods=["GET"])
def get_single_item(item_id):
    item = next((item for item in PRODUCTS if item["id"] == item_id), None)
    if item:
        return jsonify(item)
    return jsonify({"error": "Item not found"}), 404


if __name__ == "__main__":
    app.run(debug=True, port=5002)
