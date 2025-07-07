// pages/index.tsx
import { Box, Typography, Divider, Grid } from "@mui/material";
import { PerformanceInsights, ProgressSummary, SubjectProgress, TestPerformance } from "./Components";

export const StudentProgress = () => {
  const subjectProgress = {
    English: 75,
    Math: 60,
    Science: 85,
    History: 70,
  };

  const testScores = [
    { subject: "English", date: "Apr 12", score: 76 },
    { subject: "Math", date: "Apr 20", score: 78 },
    { subject: "Science", date: "Apr 25", score: 85 },
    { subject: "History", date: "May 02", score: 70 },
  ];

  const remarks = {
    educator: "Shows consistent interest in Science. Needs regular practice in Math.",
    admin: "Overall performance is satisfactory. Attendance and submission punctuality appreciated.",
    strengths: ["Strong grasp in Science", "Good communication skills"],
    improvement: ["Practice Math problems daily", "Improve History retention"],
  };

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <ProgressSummary educatorReview={remarks.educator} adminReview={remarks.admin} />
      <Divider sx={{ mb: 4 }} />
      <Typography variant="h5" fontWeight={600} mb={3}>
        Detailed Progress Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <SubjectProgress data={subjectProgress} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <TestPerformance scores={testScores} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <PerformanceInsights strengths={remarks.strengths} improvement={remarks.improvement} />
        </Grid>
      </Grid>
    </Box>
  );
};
