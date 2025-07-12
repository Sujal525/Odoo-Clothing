const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  title: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [CartItemSchema],
});

module.exports = mongoose.model('Cart', CartSchema);
