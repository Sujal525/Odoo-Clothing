import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const HeroSection = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 3, md: 10 }
      }}
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={heroVariants}
      transition={{ duration: 1 }}
    >
      
      {/* Hero Content */}
      <Box
        sx={{
          zIndex: 2,
          maxWidth: 600,
          textShadow: '2px 2px 10px rgba(0,0,0,0.9)'
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Discover Your <br /> Unique Style <br /> With Our Collections
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Elevate your wardrobe with timeless fashion — crafted just for you.
        </Typography>
        <Button
  variant="contained"
  color="primary"
  size="large"
  sx={{ borderRadius: 3, px: 4, fontWeight: 'bold' }}
  onClick={() =>
    loginWithRedirect({ appState: { returnTo: '/dashboard' } })
  }
>
  Shop Now
</Button>

      </Box>

      {/* Background Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default HeroSection;
