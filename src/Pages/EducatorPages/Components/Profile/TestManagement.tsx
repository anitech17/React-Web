// components/TestManagement.tsx
import { Paper, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const TestManagement = () => {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>Test Management</Typography>
      <Button variant="outlined" startIcon={<AddIcon />} sx={{ mb: 1 }}>
        Schedule Test
      </Button>
      <Typography variant="body2">Update marks and feedback</Typography>
    </Paper>
  );
};