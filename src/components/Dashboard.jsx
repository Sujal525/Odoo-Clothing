// src/components/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box, Typography, Button, Grid, Paper, Card,
  CardMedia, CardContent, CardActions, Badge, TextField,
  Tabs, Tab, Modal, Divider, Rating, InputAdornment,
  MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CATEGORY_MAP = {
  Men: "mens-shirts",
  Women: "womens-dresses",
  Kids: "tops",
};

export default function Dashboard() {
  const { logout, user } = useAuth0();
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);

  const [productsByCategory, setProductsByCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("All");
  const [priceSort, setPriceSort] = useState("None");

  useEffect(() => {
    const fetchData = async () => {
      const categories = Object.entries(CATEGORY_MAP);
      const results = {};
      await Promise.all(
        categories.map(async ([label, apiName]) => {
          const res = await axios.get(`https://dummyjson.com/products/category/${apiName}`);
          results[label] = res.data.products.map((p) => ({
            ...p,
            image: p.images[0],
          }));
        })
      );
      setProductsByCategory(results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const search = searchTerm.toLowerCase();
    if (["men", "man", "m", "me", "gents"].includes(search)) setSelectedCategory("Men");
    else if (["women", "woman", "w", "wo", "ladies"].includes(search)) setSelectedCategory("Women");
    else if (["kids", "kid", "boys", "girls", "boy", "girl"].includes(search)) setSelectedCategory("Kids");
  }, [searchTerm]);

  let filteredProducts = productsByCategory[selectedCategory]?.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === "All" || p.rating >= parseFloat(filter);
    return matchSearch && matchFilter;
  });

  if (priceSort === "low") {
    filteredProducts = filteredProducts?.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high") {
    filteredProducts = filteredProducts?.sort((a, b) => b.price - a.price);
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <Box sx={{
        mb: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap"
      }}>
        <Typography variant="h4" color="primary">
          WELCOME!! {user?.name || "Guest"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            width: "100%",
            justifyContent: { xs: "center", md: "flex-end" }
          }}
        >
          <Box sx={{ position: "relative", width: { xs: "100%", sm: 250 } }}>
            <TextField
              fullWidth
              size="small"
              placeholder={`Search in ${selectedCategory}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ bgcolor: "white", borderRadius: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {searchTerm.trim().length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 10,
                  width: "100%",
                  borderRadius: 1,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {["Men", "Women", "Kids"].map((cat) => {
                  const keywords = {
                    Men: ["men", "man", "gents", "m", "me"],
                    Women: ["women", "woman", "ladies", "w", "wo"],
                    Kids: ["kids", "kid", "boys", "girls", "boy", "girl"],
                  };

                  const isMatch = keywords[cat].some((kw) =>
                    searchTerm.toLowerCase().startsWith(kw)
                  );

                  return (
                    isMatch && (
                      <MenuItem
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSearchTerm("");
                        }}
                      >
                        Go to {cat}'s Section
                      </MenuItem>
                    )
                  );
                })}
              </Paper>
            )}
          </Box>

          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Rating</InputLabel>
            <Select value={filter} label="Rating" onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="4">4 ★ & above</MenuItem>
              <MenuItem value="3">3 ★ & above</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Price</InputLabel>
            <Select value={priceSort} label="Price" onChange={(e) => setPriceSort(e.target.value)}>
              <MenuItem value="None">Default</MenuItem>
              <MenuItem value="low">Price: Low to High</MenuItem>
              <MenuItem value="high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>

          <Button onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.reduce((a, i) => a + i.quantity, 0)} color="secondary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </Button>
          <Button variant="contained" color="error" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={4}
        sx={{
          background: 'url(https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=1470&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          p: { xs: 2, sm: 3, md: 4 },
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" fontWeight="bold" marginLeft={45} color="dark white">
          Monsoon Collection 2025
        </Typography>
        <Typography variant="h6" mt={2} marginLeft={45} color="dark white">
          Refresh your wardrobe with the latest arrivals from premium brands.
        </Typography>
      </Paper>

      <Tabs
        value={selectedCategory}
        onChange={(e, v) => { setSelectedCategory(v); setSearchTerm(""); }}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        centered
        sx={{ mb: 4 }}
      >
        {Object.keys(CATEGORY_MAP).map((cat) => (
          <Tab key={cat} label={cat} value={cat} />
        ))}
      </Tabs>

      <Grid container spacing={3}>
        {filteredProducts?.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
                cursor: "pointer",
                width: "100%",
                maxWidth: 400,
                margin: "0 auto"
              }}
              onClick={() => setSelectedProduct(p)}
            >
              <CardMedia component="img" height="260" image={p.image} alt={p.title} sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }} />
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" noWrap>{p.title}</Typography>
                <Typography variant="h6" color="primary">₹{p.price}</Typography>
                <Rating value={p.rating} size="small" readOnly precision={0.1} />
              </CardContent>
              <CardActions>
                <Button variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={(e) => { e.stopPropagation(); addToCart(p); }}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {filteredProducts?.length === 0 && (
          <Typography variant="h6" color="text.secondary" sx={{ p: 3 }}>
            No items found.
          </Typography>
        )}
      </Grid>

      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "90%", md: 600 },
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 3,
            boxShadow: 24,
          }}
        >
          {selectedProduct && (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom>{selectedProduct.title}</Typography>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{ width: "100%", maxHeight: 300, objectFit: "contain", borderRadius: 8, marginBottom: 16 }}
              />
              <Rating value={selectedProduct.rating} readOnly sx={{ mb: 1 }} />
              <Typography variant="h6" color="primary">₹{selectedProduct.price}</Typography>
              <Typography paragraph>{selectedProduct.description}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Customer Reviews</Typography>
              <Typography variant="body2" color="text.secondary">⭐ Great product! | ⭐⭐ Good quality | ⭐⭐⭐ Stylish and comfy</Typography>
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                Add to Cart
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
