import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import type { LastTestPerformance } from "../types";
import { memo, useMemo, useState } from "react";

interface Props {
  data: LastTestPerformance | null;
}

export const LastTestResultComponent = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!data) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3 }} elevation={2}>
        <Typography variant="h6">Last Test Results</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          No previous test performance available.
        </Typography>
      </Paper>
    );
  }

  const { marks_scored, total_marks, feedback, submitted_at, test } = data;

  const scheduledDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(test.scheduled_at));
  }, [test.scheduled_at]);

  const submittedDateTime = useMemo(() => {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(submitted_at));
  }, [submitted_at]);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }} elevation={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Last Test Results</Typography>
        <Button variant="outlined" startIcon={<AssessmentIcon />} onClick={handleOpen}>
          View Performance
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Detailed Test Performance</DialogTitle>
        <DialogContent>
          <Box my={2} display="flex" flexDirection="column" gap={1}>
            <Typography><strong>Subject:</strong> {test.course.title}</Typography>
            <Typography><strong>Test Format:</strong> {test.test_format}</Typography>
            <Typography><strong>Date:</strong> {scheduledDate}</Typography>
            <Typography><strong>Score:</strong> {marks_scored} / {total_marks}</Typography>
            <Typography><strong>Feedback:</strong> {feedback}</Typography>
            <Typography><strong>Submitted:</strong> {submittedDateTime}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" color="primary">Download Result</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export const LastTestResult = memo(LastTestResultComponent);
