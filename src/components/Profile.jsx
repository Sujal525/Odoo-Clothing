import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography, Avatar, Button } from '@mui/material';

const Profile = () => {
  const { user, logout } = useAuth0();

  return (
    <Box sx={{ p: 4 }}>
      <Avatar src={user.picture} alt={user.name} sx={{ width: 80, height: 80 }} />
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="body1">{user.email}</Typography>
      <Button variant="contained" color="secondary" onClick={() => logout({ returnTo: window.location.origin })}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
