import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const brands = [
  'src/assets/nike.jpg',
  'src/assets/louisp.png',
  'src/assets/levis.png',
  'src/assets/addidas.png',
  'src/assets/puma.png'
];


const BrandCarousel = () => {
  const settings = {
    dots: false, infinite: true, speed: 1800, slidesToShow: 4,
    autoplay: true, autoplaySpeed: 1500, arrows: false,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } }
    ]
  };

  return (
    <Box sx={{ my: 6, px: { xs: 2, md: 10 } }}>
      <Slider {...settings}>
        {brands.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box
              component="img"
              src={src}
              alt={`brand-${i}`}
              sx={{
                height: 60,
                mx: 2,
                filter: 'grayscale(50%)',
                transition: 'filter 0.3s',
                '&:hover': { filter: 'grayscale(0)' }
              }}
            />
          </motion.div>
        ))}
      </Slider>
    </Box>
  );
};

export default BrandCarousel;
