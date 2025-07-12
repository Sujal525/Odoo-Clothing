# Team Name : ShreeNath Innovators

## Team Members : Sujal Dhruve
##              : Devang Chudasama

## Problem StateMent 3 : 👕 ReWear: Sustainable Clothing Exchange Platform


# 🛍️ ClothStore – Sustainable Clothing E-Commerce Platform

Welcome to ClothStore — a full-stack MERN application that enables users to browse, add, and purchase clothing items, apply promo codes, and track their order history. It also promotes sustainable shopping by making user experience intuitive and efficient.

---

## 🚀 Features

### 👤 Authentication
- Integrated with Auth0 for secure login/logout and user management.
- User-specific cart and purchase history.

### 🛒 Shopping Cart
- Add, remove, and adjust quantity of products.
- Real-time total calculation.
- Promo code discount support.

### 💳 Order Placement
- Orders stored securely in MongoDB.
- Tracks user ID, items, discounts, and total.
- Status tracking supported (default: Completed).

### 🎟️ Promo Code System
- Supports multiple promo codes:
  - `SUMMER25`: 25% off
  - `WELCOME10`: 10% off for new users
  - `FREESHIP`: Free shipping on orders above ₹5000

### 📜 Purchase History
- View all past orders.
- Option to clear history for the logged-in user.

### 🧹 Cart Management
- Remove individual items or clear the entire cart with one click.

---

## 🛠️ Tech Stack

| Layer        | Technology         |
| ------------ | ------------------ |
| Frontend     | React + MUI        |
| Backend      | Node.js + Express  |
| Database     | MongoDB + Mongoose |
| Auth         | Auth0              |
| HTTP Client  | Axios              |

---

## 📁 Project Structure

```
/client
  └── src
      ├── components
      ├── context
      ├── pages
      └── App.jsx

/server
  ├── models
  ├── routes
  ├── controllers
  └── server.js
```

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/clothstore.git
cd clothstore
```

### 2. Setup Server
```bash
cd server
npm install
touch .env
# Add MONGO_URI in .env
npm run dev
```

### 3. Setup Client
```bash
cd client
npm install
npm start
```

---

## 🔐 Environment Variables

On the backend (server/.env):
```
MONGO_URI=<your_mongodb_connection_string>
```

On the frontend (client/.env):
```
REACT_APP_AUTH0_DOMAIN=<your_auth0_domain>
REACT_APP_AUTH0_CLIENT_ID=<your_auth0_client_id>
```

---

## 🌐 API Endpoints

### Orders
- `POST /api/orders/:userId` → Place new order
- `GET /api/orders/:userId` → Get all orders
- `DELETE /api/orders/:userId` → Clear user order history

---

## 📸 Screenshots

| Feature               | Preview                |
|----------------------|------------------------|
| Cart Page            | 🛒 Add, remove, apply promos |
| Order Summary        | 💳 Checkout overview   |
| Purchase History     | 📜 List & clear orders |

---

## 📚 Future Improvements

- Razorpay/Stripe integration
- Admin panel for inventory management
- User feedback & rating system
- Email confirmation after order placement

---

## 🤝 Contributing

We welcome contributions! Fork the repo, create a new branch, and submit a pull request.

---

## 🧑‍💻 Developed By

- 👨‍💻 Devang Chudasama
- 👨‍💻 [Your Teammate’s Name]

---

## 📄 License

MIT License
