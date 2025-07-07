// --- components/NextTestScheduled.tsx ---
import { Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NextTestScheduled = () => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, cursor: "pointer" }}
      onClick={() => navigate("/test-details")}
    >
      <Typography variant="h6">Next Test Scheduled</Typography>
      <Box mt={1}>
        <Typography>Subject: Math</Typography>
        <Typography>Date: July 10, 2025</Typography>
        <Typography>Time: 11:00 AM</Typography>
      </Box>
    </Paper>
  );
};