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
  CardActions,
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

// Make sure Poppins is loaded globally
const FONT = "'Poppins', sans-serif";

export default function Dashboard() {
  const theme = useTheme();
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

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const headers = { Authorization: `Bearer ${token}` };
        const [pr, it, og, cp, pu] = await Promise.all([
          axios.get(`/api/users/${user.sub}/profile`, { headers }),
          axios.get(`/api/items?owner=${user.sub}`, { headers }),
          axios.get(
            `/api/swaps?user=${user.sub}&status=pending,in_progress`,
            { headers }
          ),
          axios.get(`/api/swaps?user=${user.sub}&status=completed`, {
            headers
          }),
          axios.get(`/api/purchases?user=${user.sub}`, { headers })
        ]);

        setProfile(pr.data);
        setMyItems(it.data.items || []);
        setOngoingSwaps(og.data.swaps || []);
        setCompletedSwaps(cp.data.swaps || []);
        setPurchases(pu.data.purchases || []);

        // simulate 5-day history
        const today = new Date();
        const hist = Array.from({ length: 5 }).map((_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (4 - i));
          return {
            date: d.toLocaleDateString(undefined, {
              month: "short",
              day: "numeric"
            }),
            swaps: Math.floor(Math.random() * 5)
          };
        });
        setSwapHistory(hist);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user, getAccessTokenSilently]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CircularProgress size={64} thickness={5} color="success" />
      </Box>
    );
  }

  const stats = [
    { label: "Items Listed", value: myItems.length },
    { label: "Ongoing Swaps", value: ongoingSwaps.length },
    { label: "Completed Swaps", value: completedSwaps.length },
    { label: "Purchases", value: purchases.length },
    { label: "Points", value: profile.points }
  ];

  const TabPanel = ({ idx, children }) =>
    tabIndex === idx && <Box sx={{ mt: 4 }}>{children}</Box>;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        background: "linear-gradient(145deg, #e8f5e9 0%, #ffffff 70%)",
        minHeight: "100vh",
        fontFamily: FONT
      }}
    >
      {/* Hero Card */}
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
        {/* Buttons Top‑Right */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 1
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{
              fontFamily: FONT,
              "&:hover": {
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transform: "translateY(-2px)"
              }
            }}
            onClick={() => window.location.assign("/add-item")}
          >
            List New Item
          </Button>
          <Button
            variant="outlined"
            color="success"
            sx={{
              fontFamily: FONT,
              "&:hover": {
                background: "rgba(76,175,80,0.08)",
                transform: "translateY(-2px)"
              }
            }}
            onClick={() => logout({ returnTo: window.location.origin })}
          >
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
          <Typography
            variant="h4"
            color="success.dark"
            sx={{ mb: 1, fontFamily: FONT }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontFamily: FONT }}
          >
            {user.email}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 1, fontFamily: FONT }}
          >
            Swap Activity (Last 5 Days)
          </Typography>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={swapHistory}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{ borderRadius: 8 }}
                formatter={(v) => [`${v}`, "Swaps"]}
              />
              <Line
                type="monotone"
                dataKey="swaps"
                stroke={theme.palette.success.main}
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Stats Carousel */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          mb: 5,
          py: 1
        }}
      >
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
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.15)"
              }
            }}
          >
            <Typography
              variant="h5"
              color="success.dark"
              fontWeight={700}
              sx={{ fontFamily: FONT }}
            >
              {s.value}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontFamily: FONT }}
            >
              {s.label}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Tabs */}
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
            fontFamily: FONT,
            position: "relative",
            paddingBottom: 1.5,
            "&:hover::after": {
              width: "100%",
              opacity: 1
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 0,
              height: 3,
              bgcolor: theme.palette.success.main,
              transition: "width 0.3s ease, opacity 0.3s ease",
              opacity: 0
            }
          },
          "& .Mui-selected::after": {
            width: "100%",
            opacity: 1
          }
        }}
      >
        <Tab label="My Listings" />
        <Tab label="Ongoing Swaps" />
        <Tab label="Completed Swaps" />
        <Tab label="My Purchases" />
      </Tabs>

      {/* Panels */}
      <TabPanel idx={0}>
        {/* My Listings cards with hover… */}
      </TabPanel>
      <TabPanel idx={1}>
        {/* Ongoing Swaps cards with hover… */}
      </TabPanel>
      <TabPanel idx={2}>
        {/* Completed Swaps cards with hover… */}
      </TabPanel>
      <TabPanel idx={3}>
        {/* My Purchases cards with hover… */}
      </TabPanel>
    </Box>
  );
}
