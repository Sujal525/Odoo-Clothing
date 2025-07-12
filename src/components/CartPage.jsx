import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Grid,
  CardMedia,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Stack,
  Container,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import PurchaseHistory from './PurchaseHistory';
import ClearAllIcon from '@mui/icons-material/ClearAll'; // add this icon


const availablePromoCodes = [
  { code: 'SUMMER25', description: '25% off summer sale', discount: 0.25 },
  { code: 'WELCOME10', description: '10% off for new customers', discount: 0.10 },
  { code: 'FREESHIP', description: 'Free shipping on orders above ₹5000', discount: 0 },
];

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useAuth0();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(false);

 const handlePromoApply = () => {
    const promo = availablePromoCodes.find(p => p.code.toLowerCase() === promoCode.trim().toLowerCase());

    if (!promo) {
      setSnack({ open: true, message: 'Invalid promo code!', severity: 'error' });
      setDiscount(0);
      setPromoApplied(null);
      return;
    }

    if (promo.code === 'FREESHIP') {
      setSnack({ open: true, message: 'Free shipping applied!', severity: 'success' });
      setDiscount(0);
      setPromoApplied(promo);
    } else {
      setDiscount(promo.discount);
      setPromoApplied(promo);
      setSnack({ open: true, message: `Promo code ${promo.code} applied!`, severity: 'success' });
    }
  };
  const handlePlaceOrder = async () => {
    if (!user?.sub) {
      setSnack({ open: true, message: 'You must be logged in to place an order.', severity: 'warning' });
      return;
    }

    try {
      const orderData = {
        items: cart,
        totalAmount: total,
        discount,
        promoCode: promoApplied?.code || '',
      };

      await axios.post(`http://localhost:5000/api/orders/${user.sub}`, orderData);

      clearCart();
      setOrderPlaced(true);
      setSnack({ open: true, message: 'Order placed successfully!', severity: 'success' });
      setRefreshHistory(prev => !prev);
    } catch (err) {
      console.error('Order placement error:', err.response?.data || err.message);
      setSnack({ open: true, message: 'Failed to place order. Please try again.', severity: 'error' });
    }
  };

   const handleClearHistory = async () => {
    if (!user?.sub) {
      setSnack({ open: true, message: 'You must be logged in to clear history.', severity: 'warning' });
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/orders/${user.sub}`);
      setSnack({ open: true, message: 'Purchase history cleared!', severity: 'success' });
      setRefreshHistory(prev => !prev); // refresh the history
    } catch (err) {
      console.error('Failed to clear history:', err);
      setSnack({ open: true, message: 'Failed to clear purchase history.', severity: 'error' });
    }
  };



  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/dashboard')}>
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Items in Cart
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {cart.map((item) => (
                  <Box
                    key={item.productId}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      borderRadius: 1,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2, borderRadius: 1 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" fontWeight="600">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ₹{item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Tooltip title="Remove Item">
                      <IconButton onClick={() => removeFromCart(item.productId)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Promo Codes List */}
            <Paper sx={{ mt: 4, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Available Promo Codes
              </Typography>
              <List dense>
                {availablePromoCodes.map((promo) => (
                  <ListItem key={promo.code} sx={{ bgcolor: promoApplied?.code === promo.code ? 'success.light' : 'inherit', borderRadius: 1, mb: 1 }}>
                    <ListItemText
                      primary={promo.code}
                      secondary={promo.description}
                      primaryTypographyProps={{ fontWeight: promoApplied?.code === promo.code ? 'bold' : 'normal' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* FAQ or Help Section */}
            <Paper sx={{ mt: 4, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Frequently Asked Questions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>How do I apply promo codes?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Enter a valid promo code in the box on the right and click "Apply". If valid, the discount will be applied to your order.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Can I remove items from the cart?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Yes! Click the red trash icon next to the item you want to remove.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, position: 'sticky', top: 16 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography>Subtotal: ₹{subtotal.toFixed(2)}</Typography>
                {promoApplied && discount > 0 && (
                  <Typography color="success.main">
                    Discount ({(discount * 100).toFixed(0)}%): -₹{discountAmount.toFixed(2)}
                  </Typography>
                )}
                <Typography variant="h6" mt={1}>
                  Total: ₹{total.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  size="small"
                  label="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                  disabled={promoApplied?.code === 'FREESHIP'}
                  helperText={promoApplied?.code === 'FREESHIP' ? 'Free Shipping applied, no discount code needed' : ''}
                />
                <Button variant="contained" onClick={handlePromoApply} disabled={!promoCode.trim()}>
                  Apply
                </Button>
              </Box>

              <Button variant="outlined" color="error" onClick={clearCart} fullWidth>
                Clear Cart
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handlePlaceOrder}
                fullWidth
                sx={{ mt: 2 }}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

       {/* Purchase History Section */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Purchase History</Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ClearAllIcon />}
            onClick={handleClearHistory}
          >
            Clear Purchase History
          </Button>
        </Box>
        <PurchaseHistory refreshTrigger={refreshHistory} />
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CartPage;