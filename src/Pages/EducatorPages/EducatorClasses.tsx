// --- pages/index.tsx ---
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { CompletedClasses, ScheduleClassDialog, ScheduledClasses } from "./Components";

export const EducatorClasses = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h2>Educator Classes</h2>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>Schedule Class</Button>
      </Box>
      <ScheduledClasses />
      <CompletedClasses />
      <ScheduleClassDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
};