// src/components/Common/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Box, Slide, useScrollTrigger,
  IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuIcon from '@mui/icons-material/Menu';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: <StorefrontIcon /> },
    { label: 'Cart', path: '/cart', icon: <ShoppingCartIcon /> },
    { label: 'AI Stylist', path: '/stylist', icon: <SmartToyIcon /> },
  ];

  const baseLinkStyles = {
    textDecoration: 'none',
    color: '#fff',
    fontWeight: '600',
    fontSize: '1rem',
    padding: '0 1.2rem',
    position: 'relative',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease-in-out',
    fontFamily: `'Poppins', 'Montserrat', sans-serif`,
    cursor: 'pointer',
  };

  const activeLinkStyles = {
    color: '#FFD700',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -5,
      left: 0,
      width: '100%',
      height: 3,
      background: '#FFD700',
      borderRadius: 3,
      animation: 'underlineSlide 0.4s ease-in-out forwards',
      boxShadow: '0 0 6px #FFD700',
    },
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {links.map(({ label, path, icon }) => (
          <ListItem key={path} disablePadding>
            <NavLink
              to={path}
              style={({ isActive }) =>
                isActive
                  ? { ...baseLinkStyles, color: '#FFD700', width: '100%' }
                  : { ...baseLinkStyles, color: '#000', width: '100%' }
              }
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
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
          elevation={10}
          sx={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/denim.png')`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'contain',
            px: { xs: 2, sm: 6 },
            py: 1,
            boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
            borderBottom: '2px solid #FFD700',
            zIndex: 1200,
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}>
            <Box
              onClick={() => navigate('/dashboard')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                fontWeight: '900',
                fontSize: { xs: '1.4rem', sm: '1.9rem' },
                letterSpacing: '0.15em',
                fontFamily: `'Poppins', sans-serif`,
                cursor: 'pointer',
                transition: 'transform 0.4s ease',
                '&:hover': {
                  color: '#FFD700',
                  transform: 'scale(1.12) rotate(-5deg)',
                  textShadow: '0 0 12px #FFD700',
                },
              }}
            >
              <StorefrontIcon
                sx={{
                  mr: 1,
                  fontSize: { xs: 26, sm: 32 },
                  animation: 'iconBounce 2.5s infinite ease-in-out',
                  filter: 'drop-shadow(0 0 4px #FFD700)',
                }}
              />
              TrendThreads
            </Box>

            <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {links.map(({ label, path, icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  style={({ isActive }) =>
                    isActive ? { ...baseLinkStyles, ...activeLinkStyles } : baseLinkStyles
                  }
                  className="nav-link"
                >
                  <Box component="span" sx={{ mr: 0.6, verticalAlign: 'middle' }}>{icon}</Box>
                  {label}
                </NavLink>
              ))}
            </Box>

            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
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

      <style>{`
        @keyframes underlineSlide {
          0% { width: 0; opacity: 0; }
          100% { width: 100%; opacity: 1; }
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .nav-link:hover {
          color: #FFD700 !important;
          text-shadow: 0 0 10px #FFD700;
          transform: scale(1.1);
          transition: all 0.3s ease-in-out;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #FFD700;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Navbar;
