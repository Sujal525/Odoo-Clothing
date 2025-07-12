// src/pages/UploadClothingPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

// Connect to your backend Socket.IO server
const socket = io('http://localhost:5000');

const UploadClothingPage = () => {
  const { user } = useAuth0();  // Auth0 user
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clothType: '',
    fabricType: '',
    size: '',
    condition: 'Gently Used'
  });

  // Handle multiple file selection & preview
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const readers = files.map(file =>
      new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      })
    );
    Promise.all(readers).then(previews => {
      setImagePreviews(prev => [...prev, ...previews]);
    });
  };

  // Remove a preview
  const handleRemoveImage = (idx) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // On form submit, emit the data via socket
  const handleSubmit = (e) => {
    e.preventDefault();

    const itemData = {
      name: formData.name,
      description: formData.description,
      clothType: formData.clothType,
      fabricType: formData.fabricType,
      size: formData.size,
      condition: formData.condition,
      imageUrls: imagePreviews,         // match Dashboard expectation
      owner: user.sub,                  // critical for Dashboard filter
      createdAt: new Date().toISOString()
    };

    console.log('Emitting:', itemData);
    socket.emit('new_item_uploaded', itemData);

    // Reset
    setFormData({
      name: '',
      description: '',
      clothType: '',
      fabricType: '',
      size: '',
      condition: 'Gently Used'
    });
    setImagePreviews([]);
    alert('Item uploaded and sent via socket!');
  };

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 10 }, background: '#f1f8e9', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 4, background: '#e8f5e9', borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 4, textAlign: 'center' }}>
            Upload Your Clothing for Sale
          </Typography>

          <Stack spacing={4} component="form" onSubmit={handleSubmit}>
            {/* Image Previews */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: '#2e7d32' }}>
                Upload or Capture Images
              </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: 2,
                mb: 2,
                justifyContent: 'center',
                justifyItems: 'center'
              }}>
                {imagePreviews.length > 0 ? imagePreviews.map((src, idx) => (
                  <Box key={idx} sx={{
                    width: 100,
                    height: 100,
                    background: url(${src}) no-repeat center/cover,
                    borderRadius: 2,
                    border: '2px solid #c8e6c9',
                    position: 'relative'
                  }}>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(idx)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        background: 'rgba(255,255,255,0.7)'
                      }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )) : (
                  <Box sx={{
                    width: 100,
                    height: 100,
                    border: '2px dashed #c8e6c9',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff'
                  }}>
                    <Typography variant="body2">No images</Typography>
                  </Box>
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="outlined" component="label" sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}>
                  Upload Images
                  <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                </Button>
                <Button variant="outlined" onClick={() => alert('Camera not implemented')} sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}>
                  Capture with Camera
                </Button>
              </Box>
            </Box>

            {/* Form Fields */}
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Type of Cloth</InputLabel>
              <Select name="clothType" value={formData.clothType} onChange={handleChange} required>
                <MenuItem value="Shirt">Shirt</MenuItem>
                <MenuItem value="Pants">Pants</MenuItem>
                <MenuItem value="Dress">Dress</MenuItem>
                <MenuItem value="Jacket">Jacket</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Fabric Type</InputLabel>
              <Select name="fabricType" value={formData.fabricType} onChange={handleChange} required>
                <MenuItem value="Cotton">Cotton</MenuItem>
                <MenuItem value="Polyester">Polyester</MenuItem>
                <MenuItem value="Wool">Wool</MenuItem>
                <MenuItem value="Blend">Blend</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select name="size" value={formData.size} onChange={handleChange} required>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select name="condition" value={formData.condition} onChange={handleChange}>
                <MenuItem value="Gently Used">Gently Used</MenuItem>
                <MenuItem value="Like New">Like New</MenuItem>
                <MenuItem value="Used">Used</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}>
              Upload Item
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default UploadClothingPage;