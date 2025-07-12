const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  clothType: String,
  fabricType: String,
  size: String,
  condition: String,
  imageUrls: [String],
  owner: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
