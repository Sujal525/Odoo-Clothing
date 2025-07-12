import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const quotes = [
  'Sustainable fashion is the future—swap, don’t shop! – ReWear Community',
  'Every swap reduces waste and builds community. – Eco Advocate',
  'Give clothes a second life with ReWear’s swapping platform. – Green Fashionista'
];

const QuotesSection = () => {
  return (
    <Box
      sx={{
        // background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        background: 'linear-gradient(to right, #c8e6c9, #dcedc8)',
        py: 6,
        px: { xs: 3, md: 12 },
        textAlign: 'center',
        fontStyle: 'italic'
      }}
    >
      {quotes.map((quote, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.5 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <Typography variant="h6" color="text.secondary">
            "{quote}"
          </Typography>
        </motion.div>
      ))}
    </Box>
  );
};

export default QuotesSection;
