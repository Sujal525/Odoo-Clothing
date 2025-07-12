require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Item = require('./models/Item'); // ✅ Item model

const cartRoutes = require('./routes/CartRoutes');
const orderRoutes = require('./routes/OrderRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Optional: make io available to other modules
app.set('io', io);

// ✅ Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  socket.on('new_item_uploaded', async (itemData) => {
    try {
      console.log('📦 Item received via socket:', itemData);

      // Save to MongoDB
      const savedItem = await Item.create({
        ...itemData,
        imageUrls: itemData.images, // 🔄 Convert 'images' to 'imageUrls' for DB schema compatibility
      });

      // Emit to all other connected clients (not sender)
      socket.broadcast.emit('item_uploaded_broadcast', savedItem);

      console.log('✅ Item saved and broadcasted:', savedItem._id);
    } catch (err) {
      console.error('❌ Error saving item:', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// ✅ Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
