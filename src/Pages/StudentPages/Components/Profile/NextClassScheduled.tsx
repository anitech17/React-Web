import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ScheduledClass } from "../types";

interface Props {
  data: ScheduledClass | null;
}

export const NextClassScheduled: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6">Next Class Scheduled</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          No upcoming class scheduled.
        </Typography>
      </Paper>
    );
  }

  const { course, educator, scheduled_at, discussion_topics, join_url } = data;

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, cursor: "pointer" }}
      onClick={() => navigate("/class-details", { state: { classId: data.id } })}
    >
      <Typography variant="h6">Next Class Scheduled</Typography>
      <Box mt={1}>
        <Typography>Subject: {course.title}</Typography>
        <Typography>
          Teacher: {educator?.user?.name || "N/A"}
        </Typography>
        <Typography>
          Time: {new Date(scheduled_at).toLocaleString()}
        </Typography>
        <Typography>
          Topic: {discussion_topics || "To be updated"}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          window.open(join_url, "_blank");
        }}
      >
        Join Class
      </Button>
    </Paper>
  );
};