import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Dashboard from './components/Dashboard';
import CartPage from './components/CartPage';
import { useAuth0 } from '@auth0/auth0-react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Common/Navbar';



// Wrapper component to decide when to show Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const noNavbarPaths = ['/', '/login', '/signup']; // Add auth paths here if any

  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />         
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/cart"
              element={isAuthenticated ? <CartPage /> : <Navigate to="/" />}
            />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
