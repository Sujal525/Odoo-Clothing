const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  title: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  promoCode: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'completed' },
});

module.exports = mongoose.model('Order', OrderSchema);
