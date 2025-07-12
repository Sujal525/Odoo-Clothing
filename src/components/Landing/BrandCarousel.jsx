import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const milestones = [
  { icon: 'https://img.icons8.com/ios-filled/50/2e7d32/swap.png', text: '1000+ Swaps Completed' },
  { icon: 'https://img.icons8.com/ios-filled/50/2e7d32/trash.png', text: '500kg Waste Reduced' },
  { icon: 'https://img.icons8.com/ios-filled/50/2e7d32/leaf.png', text: '50 Trees Saved' },
  { icon: 'https://img.icons8.com/fluency-systems-regular/48/co2-reduction.png', text: '200kg CO2 Saved' },
  { icon: 'https://img.icons8.com/color/48/people-working-together.png', text: '500+ Members' }
];

const BrandCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1800,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <Box sx={{ my: 6, px: { xs: 2, md: 10 }, background: '#e8f5e9', textAlign: 'center' }}>
      <Slider {...settings}>
        {milestones.map((milestone, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box sx={{ p: 2 }}>
              <Box
                component="img"
                src={milestone.icon}
                alt={milestone.text}
                sx={{ height: 60, mx: 'auto', mb: 1 }}
              />
              <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                {milestone.text}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Slider>
    </Box>
  );
};

export default BrandCarousel;