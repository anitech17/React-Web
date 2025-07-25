// components/ClassScheduled.tsx
import {
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ClassIcon from "@mui/icons-material/Class";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { ScheduledClass } from "../types";

interface Props {
  data: ScheduledClass | null;
}

export const NextClassScheduled: React.FC<Props> = ({ data }) => {
  if (!data) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={1}>Next Scheduled Class</Typography>
        <Typography variant="body2" color="text.secondary">
          No upcoming class scheduled.
        </Typography>
      </Paper>
    );
  }

  const { scheduled_at, join_url, discussion_topics, course, student } = data;

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>Next Scheduled Class</Typography>

      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <ClassIcon fontSize="small" />
        <Typography variant="body2">
          Course: {course?.title || "N/A"}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <PersonIcon fontSize="small" />
        <Typography variant="body2">
          Student: {student?.user.name || "N/A"}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <AccessTimeIcon fontSize="small" />
        <Typography variant="body2">
          Time: {new Date(scheduled_at).toLocaleString()}
        </Typography>
      </Stack>

      <Typography variant="body2" mb={2}>
        Topic: {discussion_topics || "No topic provided"}
      </Typography>

      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => window.open(join_url, "_blank")}
      >
        Join Class
      </Button>
    </Paper>
  );
};
