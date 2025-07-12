import React from 'react';
import { Box, Grid, Typography, Button, Rating, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const ItemDetailPage = () => {
  // Mock data - replace with dynamic data from your backend
  const item = {
    company: 'ReWear Community',
    name: 'Vintage Denim Shirt',
    price: '$25',
    rating: 4.2,
    reviews: 150,
    ratings: 180,
    sizesAvailable: ['S', 'M', 'L', 'XL'],
    fabric: '100% Cotton',
    sleeveLength: 'Long Sleeve',
    pattern: 'Solid',
    netQuantity: '1 Piece',
    description: 'A gently used denim shirt with a classic fit, perfect for casual swaps. Made from 100% cotton, promoting sustainability.',
    seller: 'EcoFashionHub',
    sellerRating: 4.5,
    sellerReviews: 200,
    sellerRatings: 220,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80'
  };

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 10 },
        background: '#f1f8e9',
        minHeight: '100vh'
      }}
    >
      <Grid container spacing={4}>
        {/* Left Side: Sticky Image and Buttons */}
        <Grid item xs={12} md={6} sx={{ position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh', overflow: 'hidden' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                mb: 3
              }}
            />
          </motion.div>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ color: '#2e7d32', borderColor: '#2e7d32', '&:hover': { borderColor: '#1b5e20', color: '#1b5e20' } }}
            >
              Add to Wishlist
            </Button>
          </Box>
        </Grid>

        {/* Right Side: Scrollable Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100vh', overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Block 1: Company and Pricing Info */}
              <Box sx={{ p: 3, background: '#e8f5e9', borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                  {item.company}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1, color: 'text.primary' }}>
                  {item.price}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={item.rating} precision={0.1} readOnly sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.rating} (Avg)
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.reviews} Reviews | {item.ratings} Ratings
                </Typography>
              </Box>

              {/* Block 2: Size Selection */}
              <Box sx={{ p: 3, background: '#e8f5e9', borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}>
                  Select Size
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {item.sizesAvailable.map((size, index) => (
                    <Chip
                      key={index}
                      label={size}
                      sx={{
                        mr: 1,
                        mb: 1,
                        background: '#c8e6c9',
                        color: '#2e7d32',
                        '&:hover': { background: '#a5d6a7' }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Block 3: Product Details */}
              <Box sx={{ p: 3, background: '#e8f5e9', borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}>
                  Product Details
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Name: {item.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Fabric: {item.fabric}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Sleeve Length: {item.sleeveLength}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Pattern: {item.pattern}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Net Quantity: {item.netQuantity}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </Box>

              {/* Block 4: Seller Details */}
              <Box sx={{ p: 3, background: '#e8f5e9', borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}>
                  Seller Details
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Name: {item.seller}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={item.sellerRating} precision={0.1} readOnly sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.sellerRating} (Avg)
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.sellerReviews} Reviews | {item.sellerRatings} Ratings
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemDetailPage;


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Rating,
//   Chip,
//   CardMedia,
// } from "@mui/material";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";

// const FONT = "'Poppins', sans-serif";

// export default function ItemDetailPage() {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const [item, setItem] = useState(null);
//   const [mainImgIndex, setMainImgIndex] = useState(state?.imageIndex || 0);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5002/api/items/${id}`);
//         setItem(res.data);
//       } catch (err) {
//         console.error("Failed to fetch item:", err);
//       }
//     };
//     fetchItem();
//   }, [id]);

//   if (!item) {
//     return (
//       <Box sx={{ mt: 10, px: 4 }}>
//         <Typography variant="h6">Loading or Item not found.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         py: 6,
//         px: { xs: 2, md: 10 },
//         background: "#f1f8e9",
//         fontFamily: FONT,
//         minHeight: "100vh",
//       }}
//     >
//       <Grid container spacing={4}>
//         {/* Left Side: Sticky Image and Buttons */}
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{ position: "sticky", top: 0, alignSelf: "flex-start", height: "100vh", overflow: "hidden" }}
//         >
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <CardMedia
//               component="img"
//               src={item.images?.[mainImgIndex]}
//               alt={item.title}
//               sx={{
//                 width: "100%",
//                 height: "auto",
//                 maxHeight: "50vh",
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 mb: 3,
//                 objectFit: "contain",
//               }}
//             />
//           </motion.div>
//           {/* Thumbnails */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 1,
//               justifyContent: "center",
//               flexWrap: "wrap",
//               mb: 3,
//             }}
//           >
//             {item.images?.map((img, i) => (
//               <Box
//                 key={i}
//                 component="img"
//                 src={img}
//                 alt={`Thumb ${i}`}
//                 onClick={() => setMainImgIndex(i)}
//                 sx={{
//                   width: 50,
//                   height: 50,
//                   objectFit: "cover",
//                   borderRadius: 1,
//                   cursor: "pointer",
//                   border: mainImgIndex === i ? "2px solid #2e7d32" : "1px solid #ccc",
//                   boxShadow: mainImgIndex === i ? "0 0 6px #2e7d32" : "0 0 3px rgba(0,0,0,0.1)",
//                 }}
//               />
//             ))}
//           </Box>
//           <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#2e7d32",
//                 fontWeight: "bold",
//                 px: 4,
//                 "&:hover": { backgroundColor: "#1b5e20" },
//               }}
//             >
//               Add to Cart
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{
//                 color: "#2e7d32",
//                 borderColor: "#2e7d32",
//                 fontWeight: "bold",
//                 px: 4,
//                 "&:hover": { borderColor: "#1b5e20", color: "#1b5e20" },
//               }}
//             >
//               Add to Wishlist
//             </Button>
//           </Box>
//           <Box
//             sx={{
//               background: "#e8f5e9",
//               borderRadius: 2,
//               p: 2,
//               textAlign: "center",
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{ color: "#2e7d32", fontWeight: 600 }}
//             >
//               ♻️ This product is part of our eco-friendly initiative. Buy second-hand, save the planet.
//             </Typography>
//           </Box>
//         </Grid>

//         {/* Right Side: Scrollable Details */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ height: "100vh", overflowY: "auto", "&::-webkit-scrollbar": { display: "none" } }}>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//               {/* Block 1: Company and Pricing Info */}
//               <Box sx={{ p: 3, background: "#e8f5e9", borderRadius: 2, boxShadow: 2 }}>
//                 <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1 }}>
//                   ReWear Community
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontWeight: "medium", mb: 1, color: "text.primary" }}>
//                   ₹{item.price}
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <Rating
//                     value={item.rating}
//                     precision={0.1}
//                     readOnly
//                     sx={{ mr: 1, color: "#2e7d32" }}
//                   />
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     {item.rating} (Avg)
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Block 2: Size Selection */}
//               {item.sizes?.length > 0 && (
//                 <Box sx={{ p: 3, background: "#e8f5e9", borderRadius: 2, boxShadow: 2 }}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
//                   >
//                     Select Size
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//                     {item.sizes.map((size, i) => (
//                       <Chip
//                         key={i}
//                         label={size}
//                         sx={{
//                           mr: 1,
//                           mb: 1,
//                           background: "#c8e6c9",
//                           color: "#2e7d32",
//                           "&:hover": { background: "#a5d6a7" },
//                         }}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               )}

//               {/* Block 3: Product Details */}
//               <Box sx={{ p: 3, background: "#e8f5e9", borderRadius: 2, boxShadow: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
//                 >
//                   Product Details
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
//                   Name: {item.title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
//                   Category: {item.category}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
//                   Added: {new Date(item.dateAdded).toLocaleDateString()}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
//                   Stock: {item.stock}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                   {item.description}
//                 </Typography>
//               </Box>

//               {/* Block 4: Colors */}
//               {item.colors?.length > 0 && (
//                 <Box sx={{ p: 3, background: "#e8f5e9", borderRadius: 2, boxShadow: 2 }}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
//                   >
//                     Available Colors
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     {item.colors.map((color, i) => (
//                       <Box
//                         key={i}
//                         sx={{
//                           width: 24,
//                           height: 24,
//                           borderRadius: "50%",
//                           backgroundColor: color.toLowerCase(),
//                           border: "2px solid #ccc",
//                         }}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }