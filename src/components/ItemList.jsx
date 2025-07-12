// src/components/ItemList.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
  Chip,
  TextField,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FONT = "'Poppins', sans-serif";
const CATEGORY_TABS = [
  { label: "All", value: "" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
];
const CATEGORY_MAP = {
  men: ["mens-shirts", "mens-shoes", "mens-watches"],
  women: ["womens-dresses", "womens-shoes", "womens-watches"],
  kids: ["tops"],
};

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5002/api/items");
        setItems(res.data.items || []);
        setFilteredItems(res.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = items.filter((item) => {
      const matchCategory =
        !category || CATEGORY_MAP[category].includes(item.category.toLowerCase());
      const matchSearch = item.title.toLowerCase().includes(lowerSearch);
      return matchCategory && matchSearch;
    });
    setFilteredItems(filtered);
  }, [category, search, items]);

  if (loading) {
    return (
      <Box sx={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={60} thickness={5} color="success" />
      </Box>
    );
  }

  return (
    <Box sx={{ fontFamily: FONT }}>
      <Box
        sx={{
          background: "linear-gradient(to right, #eafaf1, #d3f9d8)",
          py: 4,
          px: { xs: 2, md: 6 },
          mb: 2,
          textAlign: "center",
          borderRadius: 2,
          boxShadow: "0 0 20px rgba(0,128,0,0.05)",
        }}
      >
        <Typography variant="h4" fontWeight={800} color="green">
          🌿 Eco Fashion Marketplace
        </Typography>
        <Typography variant="body1" fontSize={16} color="text.secondary">
          Discover stylish clothing with a sustainable twist.
        </Typography>
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 6 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search clothing..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", md: "300px" }, fontFamily: FONT }}
        />
        <Tabs value={category} onChange={(e, v) => setCategory(v)} variant="scrollable" scrollButtons allowScrollButtonsMobile>
          {CATEGORY_TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} sx={{ fontFamily: FONT, fontWeight: 600, textTransform: "none" }} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ px: { xs: 2, md: 6 }, pb: 6 }}>
        <Grid container spacing={3}>
          {filteredItems.length === 0 ? (
            <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
              <Typography variant="h6" color="text.secondary">No items found.</Typography>
            </Box>
          ) : (
            filteredItems.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 0 20px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 10px 24px rgba(0,128,0,0.15)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.images?.[0]}
                    alt={item.title}
                    sx={{ height: 220, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="body1" fontWeight={700} noWrap>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>₹{item.price}</Typography>
                    <Rating value={item.rating} precision={0.1} size="small" readOnly sx={{ mt: 1 }} />
                    <Box sx={{ display: "flex", gap: .5, mt:1 }}>
                      {item.sizes?.map((s,i)=><Chip key={i} label={s} size="small" variant="outlined" />)}
                    </Box>
                    <Box sx={{ display: "flex", gap: .5, mt:1 }}>
                      {item.colors?.map((c,i)=>(
                        <Box
                          key={i}
                          sx={{width:18,height:18,borderRadius:"50%",backgroundColor:c.toLowerCase(),border:"1px solid #ccc"}}
                          title={c}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/items/${item.id}`, { state: { imageIndex: 0 } })}
                    sx={{ m: 2, mt: "auto", fontWeight: 600, textTransform: "none", borderRadius: 2, backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#1b5e20" } }}
                  >
                    View Details
                  </Button>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
