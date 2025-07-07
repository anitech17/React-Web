// components/ProgressSummary.tsx
import { Box, Typography, Paper } from "@mui/material";

export const ProgressSummary = ({ educatorReview, adminReview }: { educatorReview: string, adminReview: string }) => (
  <Box mb={4}>
    <Typography variant="h5" fontWeight={600} mb={2}>
      Overall Progress Report
    </Typography>
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="subtitle1" fontWeight={500} mb={1}>
        Educator's Review:
      </Typography>
      <Typography variant="body2" mb={2}>{educatorReview}</Typography>

      <Typography variant="subtitle1" fontWeight={500} mb={1}>
        Administrator's Review:
      </Typography>
      <Typography variant="body2">{adminReview}</Typography>
    </Paper>
  </Box>
);