import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const collections = [
  {
    title: 'Summer Collection',
    description: 'Light, breezy and perfect for the warm days.',
    image:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    tags: ['#trending', '#breezy'],
    rating: 4,
    items: 32
  },
  {
    title: 'Winter Collection',
    description: 'Stay warm and stylish with our premium winter wear.',
    image:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    tags: ['#new', '#cozy'],
    rating: 5,
    items: 20
  },
  {
    title: 'Formal Wear',
    description: 'Elevate your professional wardrobe with elegant fits.',
    image:
      'https://images.unsplash.com/photo-1624105809959-8c4826758dc9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9ybWFsJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D',
    tags: ['#limited', '#elegant'],
    rating: 3,
    items: 15
  }
];

const renderRating = (stars) => {
  const fullStars = Array(stars).fill(<StarIcon fontSize="small" color="warning" />);
  const emptyStars = Array(5 - stars).fill(<StarBorderIcon fontSize="small" color="disabled" />);
  return [...fullStars, ...emptyStars];
};

const FeaturedCollections = () => (
  <Box
    sx={{
      py: 8,
      px: { xs: 3, md: 10 },
      background: 'linear-gradient(to bottom, #f7f7f7, #ffffff)'
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: 'bold', mb: 5 }}
      >
        🌟 Featured Collections
      </Typography>
    </motion.div>

    <Grid container spacing={4}>
      {collections.map((col, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <motion.div
            whileInView={{ scale: 1 }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 6,
                cursor: 'pointer',
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 10
                }
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={col.image}
                alt={col.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {col.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {col.description}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                  {col.tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      size="small"
                      sx={{ background: '#e3f2fd', fontWeight: 500 }}
                    />
                  ))}
                </Stack>

                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ mb: 0.5 }}
                >
                  {renderRating(col.rating)}
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {col.rating}/5 rating
                  </Typography>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  {col.items} items available
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default FeaturedCollections;
