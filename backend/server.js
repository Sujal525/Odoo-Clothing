require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cartRoutes = require('./routes/CartRoutes');
const orderRoutes = require('./routes/OrderRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
