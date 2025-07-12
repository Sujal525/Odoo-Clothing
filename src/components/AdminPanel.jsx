import React, { useState } from 'react';
import { Box, Grid, Typography, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  // State for selected option
  const [selectedOption, setSelectedOption] = useState('Manage Users');

  // Mock data for users, orders, and listings (replace with real data)
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', image: null },
    { id: 3, name: 'Alex Green', email: 'alex@example.com', image: 'https://via.placeholder.com/50' },
  ];
  const orders = [
    { id: 1, user: 'John Doe', item: 'Vintage Denim Shirt', status: 'Pending' },
    { id: 2, user: 'Jane Smith', item: 'Floral Midi Dress', status: 'Pending' },
  ];
  const listings = [
    { id: 1, user: 'Alex Green', item: 'Cozy Wool Sweater', condition: 'Like New' },
    { id: 2, user: 'John Doe', item: 'Leather Jacket', condition: 'Gently Used' },
  ];

  // Determine content based on selected option
  const getContent = () => {
    switch (selectedOption) {
      case 'Manage Users':
        return users;
      case 'Manage Orders':
        return orders;
      case 'Manage Listings':
        return listings;
      default:
        return users;
    }
  };

  const content = getContent();

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 10 },
        background: '#f1f8e9',
        minHeight: '100vh'
      }}
    >
      {/* Option Boxes in a Single Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p: 2, // External padding to match vertical blocks
              pl: 2, // Left padding
              pr: 2, // Right padding
              py: 0.5, // Minimal vertical padding
              background: selectedOption === 'Manage Users' ? '#c8e6c9' : '#e8f5e9',
              border: selectedOption === 'Manage Users' ? '2px solid #2e7d32' : '1px solid #c8e6c9',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              height: '100%', // Ensure consistent height
              '&:hover': { background: selectedOption !== 'Manage Users' ? '#dcedc8' : '#c8e6c9' }
            }}
            onClick={() => setSelectedOption('Manage Users')}
          >
            <Typography variant="h6" sx={{ color: selectedOption === 'Manage Users' ? '#1b5e20' : '#2e7d32', fontWeight: 'bold', paddingRight: 29.5 }}>
              Manage Users
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p: 2, // External padding to match vertical blocks
              pl: 2, // Left padding
              pr: 2, // Right padding
              py: 0.5, // Minimal vertical padding
              background: selectedOption === 'Manage Orders' ? '#c8e6c9' : '#e8f5e9',
              border: selectedOption === 'Manage Orders' ? '2px solid #2e7d32' : '1px solid #c8e6c9',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              height: '100%', // Ensure consistent height
              '&:hover': { background: selectedOption !== 'Manage Orders' ? '#dcedc8' : '#c8e6c9' }
            }}
            onClick={() => setSelectedOption('Manage Orders')}
          >
            <Typography variant="h6" sx={{ color: selectedOption === 'Manage Orders' ? '#1b5e20' : '#2e7d32', fontWeight: 'bold', paddingRight: 29.5 }}>
              Manage Orders
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              p: 2, // External padding to match vertical blocks
              pl: 2, // Left padding
              pr: 2, // Right padding
              py: 0.5, // Minimal vertical padding
              background: selectedOption === 'Manage Listings' ? '#c8e6c9' : '#e8f5e9',
              border: selectedOption === 'Manage Listings' ? '2px solid #2e7d32' : '1px solid #c8e6c9',
              borderRadius: 2,
              textAlign: 'center',
              cursor: 'pointer',
              height: '100%', // Ensure consistent height
              '&:hover': { background: selectedOption !== 'Manage Listings' ? '#dcedc8' : '#c8e6c9' }
            }}
            onClick={() => setSelectedOption('Manage Listings')}
          >
            <Typography variant="h6" sx={{ color: selectedOption === 'Manage Listings' ? '#1b5e20' : '#2e7d32', fontWeight: 'bold', paddingRight: 29.5 }}>
              Manage Listings
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Selected Option Block */}
      <Box sx={{ p: 3, background: '#e8f5e9', borderRadius: 2, mb: 4, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
          {selectedOption}
        </Typography>
      </Box>

      {/* Vertical Blocks for Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {content.map((item) => (
          <Box
            key={item.id}
            sx={{
              p: 2,
              background: '#e8f5e9',
              borderRadius: 2,
              boxShadow: 2,
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}
          >
            {/* Left Partition: Circular Image/Initial */}
            <Box sx={{ mr: 2 }}>
              <Avatar
                alt={item.name || item.user}
                src={item.image}
                sx={{ width: 50, height: 50, bgcolor: '#c8e6c9', color: '#2e7d32' }}
              >
                {(item.name || item.user).charAt(0)}
              </Avatar>
            </Box>

            {/* Middle Partition: Details */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                {item.name || item.user}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.email || `${item.item} - ${item.status || item.condition}`}
              </Typography>
            </Box>

            {/* Right Partition: Actions */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ color: '#2e7d32', borderColor: '#2e7d32', '&:hover': { borderColor: '#1b5e20', color: '#1b5e20' } }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminPanel;