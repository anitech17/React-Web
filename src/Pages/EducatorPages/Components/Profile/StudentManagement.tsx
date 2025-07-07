// components/StudentManagement.tsx
import { Paper, Typography, TextField, LinearProgress, Box } from "@mui/material";

export const StudentManagement = () => {
  const students = [
    { name: "Timothy", progress: 70 },
    { name: "Sarah", progress: 50 },
    { name: "James", progress: 60 },
  ];

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>Student Management</Typography>
      <TextField fullWidth placeholder="Search students" variant="outlined" size="small" sx={{ mb: 2 }} />
      {students.map((student, i) => (
        <Box key={i} mb={2}>
          <Typography variant="body2" fontWeight={500}>{student.name}</Typography>
          <LinearProgress value={student.progress} variant="determinate" />
        </Box>
      ))}
    </Paper>
  );
};