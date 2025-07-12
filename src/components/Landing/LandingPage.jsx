import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import BrandCarousel from './BrandCarousel';
import QuotesSection from './QuotesSection';
import FeaturedItemsCarousel from './FeaturedItemsCarousel';
import WhyChooseUs from './WhyChooseUs';
import NewsletterSection from './NewsletterSection';
import Footer from './Footer';

const LandingPage = () => (
  <Box
    sx={{
      background: 'linear-gradient(to right, #e8f5e9, #f1f8e9)', // Earthy green gradient
      overflowX: 'hidden'
    }}
  >
    <HeroSection />
    <BrandCarousel />
    <QuotesSection />
    <FeaturedItemsCarousel />
    <WhyChooseUs />
    <NewsletterSection />
    <Footer />
  </Box>
);

export default LandingPage;