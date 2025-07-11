// --- components/ScheduleClassDialog.tsx ---
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useState } from "react";

export const ScheduleClassDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({ subject: "", time: "", type: "", topics: "" });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Schedule New Class</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <TextField fullWidth label="Subject" value={form.subject} onChange={(e) => handleChange("subject", e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <TextField fullWidth label="Class Time" value={form.time} onChange={(e) => handleChange("time", e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <TextField fullWidth label="Class Type" value={form.type} onChange={(e) => handleChange("type", e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <TextField fullWidth label="Topics to Cover" value={form.topics} onChange={(e) => handleChange("topics", e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => { onClose(); }}>Schedule</Button>
      </DialogActions>
    </Dialog>
  );
};