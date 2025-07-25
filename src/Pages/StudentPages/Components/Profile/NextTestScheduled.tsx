import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ScheduledTest } from "../types";

interface Props {
  data: ScheduledTest | null;
}

export const NextTestScheduled: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6">Next Test Scheduled</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          No upcoming test scheduled.
        </Typography>
      </Paper>
    );
  }

  const { course, scheduled_at, test_format, join_url } = data;

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, cursor: "pointer" }}
      onClick={() => navigate("/test-details", { state: { testId: data.id } })}
    >
      <Typography variant="h6">Next Test Scheduled</Typography>
      <Box mt={1}>
        <Typography>Subject: {course.title}</Typography>
        <Typography>Format: {test_format}</Typography>
        <Typography>Date: {new Date(scheduled_at).toLocaleDateString()}</Typography>
        <Typography>Time: {new Date(scheduled_at).toLocaleTimeString()}</Typography>
      </Box>

      <Button
        variant="contained"
        color="info"
        fullWidth
        sx={{ mt: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          window.open(join_url, "_blank");
        }}
      >
        Join Test
      </Button>
    </Paper>
  );
};