import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Subscribed:', email);
    alert('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <Box sx={{ py: 6, px: { xs: 3, md: 12 }, textAlign: 'center', background: 'linear-gradient(to right, #a8edea, #fed6e3)' }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Join our fashion community</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>Get latest trends, exclusive offers & more</Typography>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ display: 'inline-flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            type="email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            variant="outlined"
            sx={{ width: { xs: '100%', md: '300px' } }}
          />
          <Button type="submit" variant="contained" color="primary">Subscribe</Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default NewsletterSection;
