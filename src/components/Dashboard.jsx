// src/components/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  useTheme
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// Replace with your actual backend URL
const SOCKET_URL = "http://localhost:5000";

const FONT = "'Poppins', sans-serif";

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const { cart } = useContext(CartContext);

  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ points: 0, avatar: null });
  const [myItems, setMyItems] = useState([]);
  const [ongoingSwaps, setOngoingSwaps] = useState([]);
  const [completedSwaps, setCompletedSwaps] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [swapHistory, setSwapHistory] = useState([]);

  // Initial data fetch
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        const [pr, it, og, cp, pu] = await Promise.all([
          axios.get(`/api/users/${user.sub}/profile`, { headers }),
          axios.get(`/api/items?owner=${user.sub}`, { headers }),
          axios.get(`/api/swaps?user=${user.sub}&status=pending,in_progress`, { headers }),
          axios.get(`/api/swaps?user=${user.sub}&status=completed`, { headers }),
          axios.get(`/api/purchases?user=${user.sub}`, { headers })
        ]);

        setProfile(pr.data);
        setMyItems(it.data.items || []);
        setOngoingSwaps(og.data.swaps || []);
        setCompletedSwaps(cp.data.swaps || []);
        setPurchases(pu.data.purchases || []);

        // build 5-day swap history
        const today = new Date();
        const hist = Array.from({ length: 5 }).map((_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (4 - i));
          return {
            date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
            swaps: Math.floor(Math.random() * 5)
          };
        });
        setSwapHistory(hist);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, getAccessTokenSilently]);

  // Socket listener (no conditions, prepend every received item)
  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("item_uploaded_broadcast", (item) => {
      console.log("📥 Received via socket (no filter):", item);
      // Normalize array field if needed:
      if (item.images && !item.imageUrls) {
        item.imageUrls = item.images;
      }
      // Prepend to the listing array:
      setMyItems(prev => [item, ...prev]);
    });

    return () => {
      socket.off("item_uploaded_broadcast");
      socket.disconnect();
    };
  }, []); // run once

  const TabPanel = ({ idx, children }) => (
    tabIndex === idx ? <Box sx={{ mt: 4 }}>{children}</Box> : null
  );

  const stats = [
    { label: "Items Listed", value: myItems.length },
    { label: "Ongoing Swaps", value: ongoingSwaps.length },
    { label: "Completed Swaps", value: completedSwaps.length },
    { label: "Purchases", value: purchases.length },
    { label: "Points", value: profile.points }
  ];

  if (loading) {
    return (
      <Box sx={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={64} thickness={5} color="success" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        background: "linear-gradient(145deg, #e8f5e9 0%, #ffffff 70%)",
        minHeight: "100vh",
        fontFamily: FONT
      }}
    >
      {/* === Header Card === */}
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          p: 3,
          borderRadius: 3,
          background: "#edf7ee",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          mb: 5
        }}
      >
        <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 1 }}>
          <Button variant="contained" color="success" onClick={() => navigate("/add-item")}>
            List New Item
          </Button>
          <Button variant="outlined" color="success" onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </Button>
        </Box>
        <Avatar
          src={profile.avatar || user.picture}
          sx={{
            width: 110,
            height: 110,
            border: `4px solid ${theme.palette.success.main}`,
            mr: { md: 4 },
            mb: { xs: 2, md: 0 }
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" color="success.dark" sx={{ mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Swap Activity (Last 5 Days)
          </Typography>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={swapHistory}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 8 }} formatter={(v) => [`${v}`, "Swaps"]} />
              <Line type="monotone" dataKey="swaps" stroke={theme.palette.success.main} strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* === Stats Row === */}
      <Box sx={{ display: "flex", overflowX: "auto", gap: 2, mb: 5, py: 1 }}>
        {stats.map((s) => (
          <Card
            key={s.label}
            sx={{
              minWidth: 160,
              flex: "0 0 auto",
              p: 2,
              textAlign: "center",
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
            }}
          >
            <Typography variant="h5" color="success.dark" fontWeight={700}>
              {s.value}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {s.label}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* === Tabs === */}
      <Tabs
        value={tabIndex}
        onChange={(_, v) => setTabIndex(v)}
        textColor="success"
        indicatorColor="success"
        sx={{
          mb: 4,
          ".MuiTabs-indicator": { display: "none" },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 700,
            mx: 1,
            position: "relative",
            paddingBottom: 1.5,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 0,
              height: 3,
              bgcolor: theme.palette.success.main,
              transition: "width 0.3s ease, opacity: 0.3s ease",
              opacity: 0
            },
            "&:hover::after": { width: "100%", opacity: 1 }
          },
          "& .Mui-selected::after": { width: "100%", opacity: 1 }
        }}
      >
        <Tab label="My Listings" />
        <Tab label="Ongoing Swaps" />
        <Tab label="Completed Swaps" />
        <Tab label="My Purchases" />
      </Tabs>

      {/* === Tab Panels === */}
      <TabPanel idx={0}>
        {myItems.length === 0 ? (
          <Typography>No listings yet. Upload something!</Typography>
        ) : (
          <Grid container spacing={3}>
            {myItems.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ background: "#fff", borderRadius: 3 }}>
                  <CardMedia
                    component="img"
                    image={item.imageUrls?.[0] || "https://via.placeholder.com/150"}
                    height="200"
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Type: {item.clothType} | Fabric: {item.fabricType}
                    </Typography>
                    <Typography variant="body2">
                      Size: {item.size} | Condition: {item.condition}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      <TabPanel idx={1}>
        <Typography>Ongoing swaps coming soon...</Typography>
      </TabPanel>
      <TabPanel idx={2}>
        <Typography>Completed swaps will show here.</Typography>
      </TabPanel>
      <TabPanel idx={3}>
        <Typography>Your purchases history will be shown here.</Typography>
      </TabPanel>
    </Box>
  );
}
