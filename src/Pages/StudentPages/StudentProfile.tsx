// --- pages/index.tsx ---
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
  LastTestResult,
  NextClassScheduled,
  NextTestScheduled,
  PersonalDetails,
  ProgressReportSummary,
} from "./Components";

export const StudentProfile = () => {
  const navigate = useNavigate();
  const hasNewMessage = true; // Replace with Redux/WebSocket state in production

  return (
    <Box width="100%" sx={{ p: 3 }}>
      {/* Header with Notification */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Student Dashboard
        </Typography>
        <IconButton color="primary" onClick={() => navigate("/chat")}>
          <Badge badgeContent={hasNewMessage ? 1 : 0} color="error">
            <NotificationsActiveIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Personal Info */}
      <PersonalDetails />
      <Divider sx={{ my: 4 }} />

      {/* Dashboard Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <ProgressReportSummary />
        </Grid>

        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <NextClassScheduled />
        </Grid>

        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <NextTestScheduled />
        </Grid>

        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <LastTestResult />
        </Grid>
      </Grid>
    </Box>
  );
};
