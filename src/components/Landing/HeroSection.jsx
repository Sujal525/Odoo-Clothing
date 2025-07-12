// https://sb.ecobnb.net/app/uploads/sites/3/2022/12/What-is-Eco-friendly-Fashion-and-Why-it-is-Important-1170x490.jpg

import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
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
        backgroundImage: 'url(https://sb.ecobnb.net/app/uploads/sites/3/2022/12/What-is-Eco-friendly-Fashion-and-Why-it-is-Important-1170x490.jpg)',
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
      {/* Background Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))',
          zIndex: 1
        }}
      />

      {/* Hero Content */}
      <Box
        sx={{
          zIndex: 2,
          maxWidth: 700,
          p: 3,
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 2,
          textShadow: '3px 3px 15px rgba(0, 0, 0, 0.8)'
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            lineHeight: 1.2,
            letterSpacing: 1
          }}
        >
          ReWear: Sustainable Fashion <br /> Through Community Swaps
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.4
          }}
        >
          Join our community to swap gently used clothing and reduce textile waste.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 3, px: 4, fontWeight: 'bold', backgroundColor: '#2e7d32' }}
            onClick={() => loginWithRedirect({ appState: { returnTo: '/dashboard' } })}
          >
            Start Swapping
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ borderRadius: 3, px: 4, fontWeight: 'bold', color: 'white', borderColor: 'white' }}
            onClick={() => loginWithRedirect({ appState: { returnTo: '/dashboard' } })}
          >
            Browse Items
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ borderRadius: 3, px: 4, fontWeight: 'bold', color: 'white', borderColor: 'white' }}
            onClick={() => loginWithRedirect({ appState: { returnTo: '/dashboard' } })}
          >
            List an Item
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ borderRadius: 3, px: 4, fontWeight: 'bold', color: 'white', borderColor: 'white' }}
            onClick={() => loginWithRedirect({ appState: { returnTo: '/AgentLogin' } })}
          >
            Agent Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HeroSection;