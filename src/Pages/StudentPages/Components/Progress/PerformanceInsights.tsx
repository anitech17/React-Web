// components/PerformanceInsights.tsx
import { Grid, Paper, Typography } from "@mui/material";

export const PerformanceInsights = ({ strengths, improvement }: { strengths: string[], improvement: string[] }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" mb={2}>Performance Insights</Typography>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <Typography fontWeight={500} mb={1}>Strengths</Typography>
        {strengths.map((point, index) => (
          <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>• {point}</Typography>
        ))}
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
        <Typography fontWeight={500} mb={1}>Areas to Improve</Typography>
        {improvement.map((point, index) => (
          <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>• {point}</Typography>
        ))}
      </Grid>
    </Grid>
  </Paper>
);