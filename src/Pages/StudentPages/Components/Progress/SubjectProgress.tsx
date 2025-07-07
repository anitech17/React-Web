// components/SubjectProgress.tsx
import { Box, Typography, Paper, LinearProgress } from "@mui/material";

export const SubjectProgress = ({ data }: { data: Record<string, number> }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>Subject Progress</Typography>
    {Object.entries(data).map(([subject, value]) => (
      <Box key={subject} mb={2}>
        <Typography variant="body1">{subject}</Typography>
        <LinearProgress variant="determinate" value={value} sx={{ height: 10, borderRadius: 5, mt: 0.5 }} />
        <Typography variant="caption">{value}%</Typography>
      </Box>
    ))}
  </Paper>
);