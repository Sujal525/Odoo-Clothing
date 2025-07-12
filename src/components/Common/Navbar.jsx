// src/components/Common/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Slide,
  useScrollTrigger,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

// Slide hide on scroll helper
function HideOnScroll(props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

// Add a Browse link to hit ItemDetail (replace `1` with a real id as needed)
const links = [
  { label: 'Dashboard', path: '/dashboard', icon: <StorefrontIcon /> },
  { label: 'Browse Items', path: '/items', icon: <SearchIcon /> },
  { label: 'Cart', path: '/cart', icon: <ShoppingCartIcon /> },
];

// Base typography/link font
const FONT = "'Poppins', sans-serif";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // Drawer for mobile
  const drawer = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer}>
      <List>
        {links.map(({ label, path, icon }) => (
          <ListItem key={path} disablePadding>
            <NavLink to={path} style={{ textDecoration: 'none', width: '100%' }}>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#388E3C' }}>{icon}</ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontFamily: FONT,
                    fontWeight: 600,
                    color: '#388E3C'
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          elevation={8}
          sx={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/leafy-green.png')`,
            backgroundColor: '#2E7D32',
            px: { xs: 2, sm: 6 },
            py: 1,
            borderBottom: '3px solid #FFD700',
            boxShadow: '0 6px 18px rgba(0,0,0,0.3)'
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <Box
              onClick={() => navigate('/dashboard')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#FFF',
                fontWeight: 900,
                fontSize: { xs: '1.4rem', sm: '1.8rem' },
                letterSpacing: '0.1em',
                fontFamily: FONT,
                cursor: 'pointer',
                transition: 'color 0.3s, transform 0.3s',
                '&:hover': {
                  color: '#FFD700',
                  transform: 'scale(1.05)',
                  textShadow: '0 0 8px #FFD700'
                }
              }}
            >
              <StorefrontIcon
                sx={{
                  mr: 1,
                  fontSize: { xs: 28, sm: 34 },
                  filter: 'drop-shadow(0 0 4px #FFD700)'
                }}
              />
              ReWear
            </Box>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {links.map(({ label, path, icon }) => (
                <Box
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: '#FFF',
                    fontFamily: FONT,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    px: 1.5,
                    py: 0.5,
                    position: 'relative',
                    transition: 'color 0.3s',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: 0,
                      height: 3,
                      bgcolor: '#FFD700',
                      borderRadius: 2,
                      transition: 'width 0.3s'
                    },
                    '&:hover': {
                      color: '#FFD700',
                      '&::after': { width: '100%' }
                    },
                    '&.active': {
                      color: '#FFD700',
                      '&::after': { width: '100%' }
                    }
                  }}
                >
                  <Box sx={{ mr: 0.6 }}>{icon}</Box>
                  {label}
                </Box>
              ))}
            </Box>

            {/* Mobile menu icon */}
            <IconButton
              edge="end"
              color="inherit"
              sx={{ display: { xs: 'block', md: 'none' } }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
