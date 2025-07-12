import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const socials = [
  { icon: <Facebook />, url: '#' },
  { icon: <Instagram />, url: '#' },
  { icon: <Twitter />, url: '#' },
  { icon: <LinkedIn />, url: '#' }
];

const Footer = () => (
  <Box sx={{ py: 4, px: { xs: 3, md: 12 }, background: '#2e7d32', color: 'white', textAlign: 'center' }}>
    <Box sx={{ mb: 2 }}>
      {socials.map((s, i) => (
        <motion.div whileHover={{ scale: 1.2 }} key={i} style={{ display: 'inline-block' }}>
          <IconButton href={s.url} sx={{ color: 'white' }}>
            {s.icon}
          </IconButton>
        </motion.div>
      ))}
    </Box>
    <Typography variant="body2">© {new Date().getFullYear()} ReWear. All rights reserved.</Typography>
  </Box>
);

export default Footer;
