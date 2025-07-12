import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const quotes = [
  'Fashion is the armor to survive the reality of everyday life. – Bill Cunningham',
  'Style is a way to say who you are without having to speak. – Rachel Zoe',
  'Clothes mean nothing until someone lives in them. – Marc Jacobs'
];

const QuotesSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
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
