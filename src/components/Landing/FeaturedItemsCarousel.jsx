import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const items = [
  {
    title: 'Vintage Denim Jacket',
    category: 'Unisex',
    condition: 'Like New',
    availability: 'Swap',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80',
    communityMember: 'EcoFashionFan'
  },
  {
    title: 'Floral Midi Dress',
    category: 'Women’s',
    condition: 'Gently Used',
    availability: 'Points Redemption',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80',
    communityMember: 'GreenStyleLover'
  },
  {
    title: 'Cozy Wool Sweater',
    category: 'Men’s',
    condition: 'Like New',
    availability: 'Swap',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80',
    communityMember: 'SustainableSam'
  },
  
];

const FeaturedItemsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 3, md: 10 },
        background: 'linear-gradient(to bottom, #e8f5e9, #f1f8e9)' // Earthy green gradient
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
          sx={{ fontWeight: 'bold', mb: 5, color: '#2e7d32' }} // Dark green for contrast
        >
          🌿 Featured Swap Items
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          Swapped with love by our community!
        </Typography>
      </motion.div>

      <Slider {...settings}>
        {items.map((item, idx) => (
          <Box key={idx} sx={{ px: 2 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  cursor: 'pointer',
                  height: '100%',
                  backgroundColor: '#f1f8e9', // Light earthy background
                  '&:hover': {
                    boxShadow: 10
                  }
                }}
                component="a"
                href={`/item/${idx}`} // Link to Item Detail Page
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Category: {item.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Condition: {item.condition}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Availability: {item.availability}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={`By ${item.communityMember}`}
                      size="small"
                      sx={{ background: '#c8e6c9', fontWeight: 500, color: '#2e7d32' }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default FeaturedItemsCarousel;