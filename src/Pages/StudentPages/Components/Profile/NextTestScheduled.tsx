import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ScheduledTest } from "../types";
import { memo, useMemo } from "react";

interface Props {
  data: ScheduledTest | null;
}

const NextTestScheduledComponent = ({ data }: Props) => {
  const navigate = useNavigate();

  const formattedDate = useMemo(() => {
    if (!data?.scheduled_at) return { date: "", time: "" };
    const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
      new Date(data.scheduled_at)
    );
    const time = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(data.scheduled_at));
    return { date, time };
  }, [data?.scheduled_at]);

  if (!data) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Next Test Scheduled
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No upcoming test scheduled.
        </Typography>
      </Paper>
    );
  }

  const { course, test_format, join_url } = data;

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, borderRadius: 3, cursor: "pointer" }}
      onClick={() => navigate("/test-details", { state: { testId: data.id } })}
    >
      <Typography variant="h6" gutterBottom>
        Next Test Scheduled
      </Typography>
      <Box mt={1}>
        <Typography>Subject: {course.title}</Typography>
        <Typography>Format: {test_format}</Typography>
        <Typography>Date: {formattedDate.date}</Typography>
        <Typography>Time: {formattedDate.time}</Typography>
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

export const NextTestScheduled = memo(NextTestScheduledComponent);
