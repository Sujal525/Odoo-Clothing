import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Stack, Chip, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const UploadClothingPage = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clothType: '',
    fabricType: '',
    size: '',
    condition: 'Gently Used'
  });

  // Handle multiple image uploads
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(newPreviews).then(previews => {
      setImagePreviews(prev => [...prev, ...previews]);
    });
  };

  // Remove an image preview
  const handleRemoveImage = (indexToRemove) => {
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Simulated camera capture (placeholder - requires getUserMedia API for real implementation)
  const handleCameraCapture = () => {
    alert('Camera capture feature is not fully implemented. Please upload images instead.');
    // To implement real camera access, use navigator.mediaDevices.getUserMedia
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (placeholder - replace with API call)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { imagePreviews, ...formData });
    // Add API call here to submit data to backend
    alert('Item uploaded successfully! (Simulated)');
  };

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 10 },
        background: '#f1f8e9',
        minHeight: '100vh'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            maxWidth: 800,
            mx: 'auto',
            p: 4,
            background: '#e8f5e9',
            borderRadius: 2,
            boxShadow: 2
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 4, textAlign: 'center' }}>
            Upload Your Clothing for Sale
          </Typography>
          <Stack spacing={4} component="form" onSubmit={handleSubmit}>
            {/* Image Upload/Preview Section */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: '#2e7d32' }}>
                Upload or Capture Images
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: 2,
                  mb: 2,
                  justifyContent: 'center', // Centers the initial empty square
                  justifyItems: 'center' // Centers each item within the grid
                }}
              >
                {imagePreviews.map((preview, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 100,
                      height: 100,
                      background: `url(${preview}) no-repeat center/cover`,
                      borderRadius: 2,
                      border: '2px solid #c8e6c9',
                      position: 'relative'
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: '#2e7d32',
                        background: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.9)' }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                {imagePreviews.length === 0 && (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: '2px dashed #c8e6c9',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#fff'
                    }}
                  >
                    <Typography variant="body2">No images uploaded</Typography>
                  </Box>
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ color: '#2e7d32', borderColor: '#2e7d32', '&:hover': { borderColor: '#1b5e20', color: '#1b5e20' } }}
                >
                  Upload Images
                  <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCameraCapture}
                  sx={{ color: '#2e7d32', borderColor: '#2e7d32', '&:hover': { borderColor: '#1b5e20', color: '#1b5e20' } }}
                >
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
              sx={{ background: '#fff' }}
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
              sx={{ background: '#fff' }}
            />
            <FormControl fullWidth sx={{ background: '#fff' }}>
              <InputLabel>Type of Cloth</InputLabel>
              <Select
                name="clothType"
                value={formData.clothType}
                onChange={handleChange}
                required
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 200 } }
                }}
                sx={{ '& .MuiSelect-select': { py: 1.5, textAlign: 'left' } }}
              >
                <MenuItem value="Shirt">Shirt</MenuItem>
                <MenuItem value="Pants">Pants</MenuItem>
                <MenuItem value="Dress">Dress</MenuItem>
                <MenuItem value="Jacket">Jacket</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ background: '#fff' }}>
              <InputLabel>Type of Fabric</InputLabel>
              <Select
                name="fabricType"
                value={formData.fabricType}
                onChange={handleChange}
                required
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 200 } }
                }}
                sx={{ '& .MuiSelect-select': { py: 1.5, textAlign: 'left' } }}
              >
                <MenuItem value="Cotton">Cotton</MenuItem>
                <MenuItem value="Polyester">Polyester</MenuItem>
                <MenuItem value="Wool">Wool</MenuItem>
                <MenuItem value="Blend">Blend</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ background: '#fff' }}>
              <InputLabel>Size</InputLabel>
              <Select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 200 } }
                }}
                sx={{ '& .MuiSelect-select': { py: 1.5, textAlign: 'left' } }}
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ background: '#fff' }}>
              <InputLabel>Condition</InputLabel>
              <Select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 200 } }
                }}
                sx={{ '& .MuiSelect-select': { py: 1.5, textAlign: 'left' } }}
              >
                <MenuItem value="Gently Used">Gently Used</MenuItem>
                <MenuItem value="Like New">Like New</MenuItem>
                <MenuItem value="Used">Used</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' }, mt: 2 }}
            >
              Upload Item
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
};

export default UploadClothingPage;