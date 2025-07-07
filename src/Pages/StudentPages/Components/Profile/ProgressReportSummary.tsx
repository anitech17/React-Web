// --- components/ProgressReportSummary.tsx ---
import { Paper, Typography, LinearProgress, Box } from "@mui/material";

const progressData = {
  English: 75,
  Math: 60,
  Science: 85,
};

export const ProgressReportSummary = () => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>
      Progress Summary
    </Typography>
    {Object.entries(progressData).map(([subject, value]) => (
      <Box key={subject} mb={2}>
        <Typography>{subject}</Typography>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{ height: 10, borderRadius: 5, mt: 0.5 }}
        />
        <Typography variant="caption">{value}%</Typography>
      </Box>
    ))}
  </Paper>
);