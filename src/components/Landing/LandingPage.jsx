import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import BrandCarousel from './BrandCarousel';
import QuotesSection from './QuotesSection';
import FeaturedCollections from './FeaturedCollections';
import WhyChooseUs from './WhyChooseUs';
import NewsletterSection from './NewsletterSection';
import Footer from './Footer';

const LandingPage = () => (
  <Box
    sx={{
      background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
      overflowX: 'hidden'
    }}
  >
    <HeroSection />
    <BrandCarousel />
    <QuotesSection />
    <FeaturedCollections />
    <WhyChooseUs />
    <NewsletterSection />
    <Footer />
  </Box>
);

export default LandingPage;
