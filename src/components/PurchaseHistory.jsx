import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const PurchaseHistory = ({ refreshTrigger }) => {
  const { user } = useAuth0();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.sub) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${user.sub}`);
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchOrders();
  }, [user?.sub, refreshTrigger]);

  if (!orders.length) {
    return (
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6">No purchase history available.</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={4}>
        {orders.map((order) => (
          <Paper key={order._id} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Invoice #{order._id.slice(-6).toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {new Date(order.createdAt).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              {order.items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.productId}>
                  <Box>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="body2">Qty: {item.quantity}</Typography>
                    <Typography variant="body2">Price: ₹{item.price.toFixed(2)}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography>Subtotal: ₹{order.totalAmount.toFixed(2)}</Typography>
              {order.discount > 0 && (
                <Typography>
                  Discount ({(order.discount * 100).toFixed(0)}%): -₹{(order.totalAmount * order.discount).toFixed(2)}
                </Typography>
              )}
              <Typography variant="h6">
                Total: ₹{(order.totalAmount - order.totalAmount * order.discount).toFixed(2)}
              </Typography>
              {order.promoCode && (
                <Typography variant="body2" color="text.secondary">
                  Promo Code: {order.promoCode}
                </Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default PurchaseHistory;
