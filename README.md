# Team Name : ShreeNath Innovators

## Team Members : Sujal Dhruve, Devang Chudasama
               

## Problem StateMent 3 : 👕 ReWear: Sustainable Clothing Exchange Platform

## Link Of Our Project : https://drive.google.com/file/d/1ZTR8zIl1_7JoD_H5V6iLorODe1IdB8Yv/view?usp=sharing


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

### Admin Panel
- To approve or deny any suspicious customers , orders and listings. 

---

## 🛠️ Tech Stack

| Layer        | Technology                 |
| ------------ | ---------------------------|
| Frontend     | React + MUI                |
| Backend      | Flask + Node.js + Express  |
| Database     | MongoDB + Mongoose         |
| Auth         | Auth0                      |
| HTTP Client  | Axios                      |

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
git clone https://github.com/Sujal525/OdooClothing.git
cd OdooClothing
```

### 2. Setup Backend
```
1.In First Command Terminal
cd backend
python app.py
```

```
2.In Second Command Terminal
cd backend
python app1.py
```

```
3.In Third Command Terminal
cd backend
npm install
node server.js
```

### 3. Setup Frontend
```
4.In Fourth Command Terminal
npm install
npm run dev
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


## 📚 Future Improvements

- Razorpay/Stripe integration
- Admin panel for inventory management
- User feedback & rating system
- Email confirmation after order placement
- AI integration for Quality Of Clothes
- Deep Learning model for Cloth Overlay on Users

---

## 🧑‍💻 Developed By

- 👨‍💻 Devang Chudasama
- 👨‍💻 Sujal Dhruve

---

