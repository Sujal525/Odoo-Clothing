import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Star, FlashOn, SmartToy } from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <SmartToy sx={{ fontSize: 40, color: '#2e7d32' }} />,
    title: 'Community-Driven Swaps',
    description: 'Connect with others to trade gently used clothing.'
  },
  {
    icon: <FlashOn sx={{ fontSize: 40, color: '#2e7d32' }} />,
    title: 'Point-Based Redemption',
    description: 'Earn points by listing items and redeem for new-to-you fashion.'
  },
  {
    icon: <Star sx={{ fontSize: 40, color: '#2e7d32' }} />,
    title: 'Eco-Conscious Fashion',
    description: 'Reduce textile waste with every swap.'
  }
];

const WhyChooseUs = () => (
  <Box sx={{ py: 8, px: { xs: 4, md: 12 }, background: '#f1f8e9'}}>
    <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
        Why Choose Us?
      </Typography>
    </motion.div>
    <Grid container spacing={4}>
      {features.map((feat, i) => (
        <Grid item xs={12} md={4} key={i}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            style={{ textAlign: 'center' }}
          >
            {feat.icon}
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>{feat.title}</Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{feat.description}</Typography>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default WhyChooseUs;