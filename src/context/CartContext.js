// src/contexts/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      axios.get(`http://localhost:5000/api/cart/${user.sub}`)
        .then(res => setCart(res.data.items || []))
        .catch(err => console.error(err));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      axios.post(`http://localhost:5000/api/cart/${user.sub}`, { items: cart })
        .catch(err => console.error(err));
    }
  }, [cart, isAuthenticated, user]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // React.createElement version of JSX:
  return React.createElement(
    CartContext.Provider,
    { value: { cart, addToCart, removeFromCart, clearCart } },
    children
  );
};