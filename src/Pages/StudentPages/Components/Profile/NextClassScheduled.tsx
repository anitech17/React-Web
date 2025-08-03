import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ScheduledClass } from "../types";
import { memo, useMemo } from "react";

interface Props {
  data: ScheduledClass | null;
}

const NextClassScheduledComponent = ({ data }: Props) => {
  const navigate = useNavigate();

  const formattedDate = useMemo(() => {
    if (!data?.scheduled_at) return "";
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(data.scheduled_at));
  }, [data?.scheduled_at]);

  if (!data) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Next Class Scheduled
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No upcoming class scheduled.
        </Typography>
      </Paper>
    );
  }

  const { course, educator, discussion_topics, join_url } = data;

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, cursor: "pointer" }}
      onClick={() => navigate("/class-details", { state: { classId: data.id } })}
    >
      <Typography variant="h6" gutterBottom>
        Next Class Scheduled
      </Typography>

      <Box mt={1}>
        <Typography>Subject: {course.title}</Typography>
        <Typography>Teacher: {educator?.user?.name || "N/A"}</Typography>
        <Typography>Time: {formattedDate}</Typography>
        <Typography>
          Topic: {discussion_topics?.trim() || "To be updated"}
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

export const NextClassScheduled = memo(NextClassScheduledComponent);