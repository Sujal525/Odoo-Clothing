const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Get cart for a user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update or create cart for a user
router.post('/:userId', async (req, res) => {
  try {
    const { items } = req.body;
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { new: true, upsert: true }
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
