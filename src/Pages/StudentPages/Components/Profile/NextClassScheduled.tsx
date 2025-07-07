// --- components/NextClassScheduled.tsx ---
import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NextClassScheduled = () => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, cursor: "pointer" }}
      onClick={() => navigate("/class-details")}
    >
      <Typography variant="h6">Next Class Scheduled</Typography>
      <Box mt={1}>
        <Typography>Subject: English</Typography>
        <Typography>Teacher: Mr. John Smith</Typography>
        <Typography>Time: 3:00 PM</Typography>
        <Typography>Topic: Reading Comprehension</Typography>
      </Box>
      <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
        Join Class
      </Button>
    </Paper>
  );
};