import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import CartPage from './components/CartPage';
import { useAuth0 } from '@auth0/auth0-react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Common/Navbar';
import ItemList from './components/ItemList';
import ItemDetailPage from './components/ItemDetailPage'; // ✅ Import the detail page
import UploadClothingPage from './components/UploadClothingPage';


// Wrapper component to conditionally show Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const noNavbarPaths = ['/', '/login', '/signup'];

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
              path="/AgentLogin"
              element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" />}
            />
            <Route
              path="/cart"
              element={isAuthenticated ? <CartPage /> : <Navigate to="/" />}
            />
            <Route path="/items" element={<ItemList />} />
            <Route path="/items/:id" element={<ItemDetailPage />} /> {/* ✅ Add Detail Page Route */}
            <Route path="/add-item" element={<UploadClothingPage />} /> {/* ✅ This route is required */}

          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
