const mongoose = require('mongoose');

// Define a helper to generate a random product ID
const generateRandomId = () => Math.floor(100000 + Math.random() * 900000); // 6-digit random number

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.Mixed, required: false },
  title: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});

// Add a pre-validation hook to assign a random productId if it's missing
OrderItemSchema.pre('validate', function (next) {
  if (!this.productId) {
    this.productId = generateRandomId();
  }
  next();
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
