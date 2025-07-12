const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Create a new order
router.post('/:userId', async (req, res) => {
  try {
    const { items, totalAmount, discount, promoCode } = req.body;
    const newOrder = new Order({
      userId: req.params.userId,
      items,
      totalAmount,
      discount,
      promoCode,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/orders/:userId
router.delete('/:userId', async (req, res) => {
  try {
    await Order.deleteMany({ userId: req.params.userId });
    res.status(200).json({ message: 'All orders deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete orders.' });
  }
});


module.exports = router;
