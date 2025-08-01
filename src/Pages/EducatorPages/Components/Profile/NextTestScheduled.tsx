import {
  Paper,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import SubjectIcon from "@mui/icons-material/Subject";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import type { ScheduledTest } from "../types";
import { memo, useMemo } from "react";

interface Props {
  data: ScheduledTest | null;
}

const NextTestScheduledComponent = ({ data }: Props) => {
  const testDetails = useMemo(() => {
    if (!data) return null;

    return (
      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <SubjectIcon fontSize="small" />
          <Typography variant="body2">
            Subject: {data.course?.subject || "N/A"}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2">
            Student: {data.student?.user?.name || "N/A"}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">
            Time: {new Date(data.scheduled_at).toLocaleString()}
          </Typography>
        </Stack>

        <Typography variant="body2" mb={2}>
          Format: {data.test_format}
        </Typography>

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => window.open(data.join_url, "_blank")}
        >
          Join Test
        </Button>
      </Box>
    );
  }, [data]);

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>Next Test Scheduled</Typography>

      {!data ? (
        <Typography variant="body2" color="text.secondary">
          No upcoming test scheduled.
        </Typography>
      ) : (
        testDetails
      )}
    </Paper>
  );
};

export const NextTestScheduled = memo(NextTestScheduledComponent);
