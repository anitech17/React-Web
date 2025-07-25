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
import { useState } from "react";
import AssessmentIcon from "@mui/icons-material/Assessment";
import type { LastTestPerformance } from "../types";

interface Props {
  data: LastTestPerformance | null;
}

export const LastTestResult: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);

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

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }} elevation={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Last Test Results</Typography>
        <Button
          variant="outlined"
          startIcon={<AssessmentIcon />}
          onClick={() => setOpen(true)}
        >
          View Performance
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Detailed Test Performance</DialogTitle>
        <DialogContent>
          <Box my={1}>
            <Typography>
              <strong>Subject:</strong> {test.course.title}
            </Typography>
            <Typography>
              <strong>Test Format:</strong> {test.test_format}
            </Typography>
            <Typography>
              <strong>Date:</strong>{" "}
              {new Date(test.scheduled_at).toLocaleDateString()}
            </Typography>
            <Typography>
              <strong>Score:</strong> {marks_scored} / {total_marks}
            </Typography>
            <Typography>
              <strong>Feedback:</strong> {feedback}
            </Typography>
            <Typography>
              <strong>Submitted:</strong>{" "}
              {new Date(submitted_at).toLocaleString()}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button variant="contained" color="primary">
            Download Result
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LastTestResult;
