// src/components/ItemDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Chip,
  CardMedia,
  Divider,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { CartContext } from "../context/CartContext"; // ✅ Import cart context

const FONT = "'Poppins', sans-serif";

export default function ItemDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const [item, setItem] = useState(null);
  const [mainImgIndex, setMainImgIndex] = useState(state?.imageIndex || 0);
  const { addToCart } = useContext(CartContext); // ✅ Access addToCart function

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(http://localhost:5002/api/items/${id});
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      productId: item.id || item._id,
      title: item.title,
      price: item.price,
      image: item.images[mainImgIndex],
      quantity: 1,
    };
    addToCart(cartItem); // ✅ Add item to cart context
  };

  if (!item) {
    return (
      <Box sx={{ mt: 10, px: 4 }}>
        <Typography variant="h6">Loading or Item not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 10 },
        background: "#f1f8e9",
        fontFamily: FONT,
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Image */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 100 },
              background: "#ffffff",
              borderRadius: 3,
              boxShadow: 3,
              p: 2,
              maxWidth: 400,
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: 600, mb: 2 }}>
              ReWear Community
            </Typography>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardMedia
                component="img"
                src={item.images?.[mainImgIndex]}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "contain",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
            </motion.div>

            {/* Thumbnails */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                flexWrap: "wrap",
                mb: 2,
              }}
            >
              {item.images?.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={Thumb ${i}}
                  onClick={() => setMainImgIndex(i)}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border:
                      mainImgIndex === i
                        ? "2px solid #2e7d32"
                        : "1px solid #ccc",
                    boxShadow:
                      mainImgIndex === i
                        ? "0 0 6px #2e7d32"
                        : "0 0 3px rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </Box>

            <Box sx={{ background: "#e8f5e9", borderRadius: 2, p: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#2e7d32", fontWeight: 600 }}
              >
                ♻️ This product is part of our eco-friendly initiative. Buy second-hand, save the planet.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Info Panel */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: 3,
              boxShadow: 3,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Title, Rating, Price */}
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {item.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Rating
                  value={item.rating}
                  precision={0.1}
                  readOnly
                  sx={{ color: "#2e7d32", mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {item.rating} / 5
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ color: "#2e7d32", fontWeight: 600, mt: 1 }}
              >
                ₹{item.price}
              </Typography>
            </Box>

            <Divider />

            {/* Description */}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1, color: "#2e7d32" }}
              >
                Product Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Box>

            {/* Stock and Category */}
            <Box>
              <Typography variant="body2" color="text.secondary">
                <strong>Stock:</strong> {item.stock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Category:</strong> {item.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Added:</strong>{" "}
                {new Date(item.dateAdded).toLocaleDateString()}
              </Typography>
            </Box>

            {/* Sizes */}
            {item.sizes?.length > 0 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1 }}
                >
                  Sizes Available:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {item.sizes.map((size, i) => (
                    <Chip
                      key={i}
                      label={size}
                      sx={{
                        background: "#c8e6c9",
                        color: "#2e7d32",
                        fontWeight: "bold",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Colors */}
            {item.colors?.length > 0 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1 }}
                >
                  Available Colors:
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {item.colors.map((color, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: color.toLowerCase(),
                        border: "2px solid #ccc",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Add to Cart Button */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2e7d32",
                  fontWeight: "bold",
                  px: 4,
                  "&:hover": {
                    backgroundColor: "#1b5e20",
                  },
                }}
                onClick={handleAddToCart} // ✅ Click to add to cart
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}