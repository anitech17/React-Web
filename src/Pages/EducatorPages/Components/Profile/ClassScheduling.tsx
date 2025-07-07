// components/ClassScheduling.tsx
import { Paper, Typography, Button, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const ClassScheduling = () => {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>Class Scheduling</Typography>
      <Box display="flex" alignItems="center" mb={1}>
        <CalendarTodayIcon sx={{ mr: 1 }} />
        <Typography>Next class:</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={2}>
        meet.google.com/abc-xyz
      </Typography>
      <Button variant="contained">Schedule</Button>
    </Paper>
  );
};