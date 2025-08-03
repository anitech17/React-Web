import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { useState, useEffect, memo } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { subject: string; time: string; notes: string }) => void;
}

const RequestClassDialogComponent = ({ open, onClose, onSubmit }: Props) => {
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setSubject("");
      setTime("");
      setNotes("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ subject, time, notes });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Request a Class</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <TextField
              fullWidth
              label="Preferred Time"
              variant="outlined"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
            <TextField
              fullWidth
              label="Additional Notes"
              variant="outlined"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const RequestClassDialog = memo(RequestClassDialogComponent);
