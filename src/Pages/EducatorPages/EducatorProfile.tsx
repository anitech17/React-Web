// pages/index.tsx
import {
  Box,
  Grid,
  IconButton,
  Badge,
  Typography,
  Divider,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import {
  ClassScheduling,
  PersonalDetails,
  StudentManagement,
  TestManagement,
} from "./Components";

export const EducatorProfile = () => {
  const navigate = useNavigate();
  const hasNewMessage = true; // You can hook this to Redux or socket later

  return (
    <Box width="100%" sx={{ p: 3 }}>
      {/* Header with Notifications */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Educator Dashboard
        </Typography>
        <IconButton color="primary" onClick={() => navigate("/chat")}>
          <Badge badgeContent={hasNewMessage ? 1 : 0} color="error">
            <NotificationsActiveIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Personal Info Section */}
      <PersonalDetails />
      <Divider sx={{ my: 4 }} />

      {/* Dashboard Components Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <StudentManagement />
        </Grid>

        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <TestManagement />
        </Grid>

        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <ClassScheduling />
        </Grid>
      </Grid>
    </Box>
  );
};
