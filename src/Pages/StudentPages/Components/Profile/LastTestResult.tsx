// --- components/LastTestResult.tsx ---
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

const testResults = [
  { subject: "Math", score: 78, remarks: "Good improvement" },
  { subject: "Science", score: 85, remarks: "Excellent" },
  { subject: "English", score: 74, remarks: "Can do better" },
];

export const LastTestResult = () => {
  const [open, setOpen] = useState(false);
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
          {testResults.map((res, idx) => (
            <Box key={idx} my={1}>
              <Typography>
                <strong>{res.subject}:</strong> {res.score} - {res.remarks}
              </Typography>
            </Box>
          ))}
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