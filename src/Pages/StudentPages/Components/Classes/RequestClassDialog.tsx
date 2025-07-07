// --- components/RequestClassDialog.tsx ---
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Button } from "@mui/material";

export const RequestClassDialog = ({ open, onClose }: { open: boolean, onClose: () => void }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Request a Class</DialogTitle>
    <DialogContent>
      <Grid container spacing={2} mt={1}>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <TextField fullWidth label="Subject" variant="outlined" />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <TextField fullWidth label="Preferred Time" variant="outlined" />
        </Grid>
        <Grid size={{ xs: 12, md: 6, sm: 4 }} component="div">
          <TextField fullWidth label="Additional Notes" variant="outlined" multiline rows={3} />
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" color="primary" onClick={onClose}>Submit Request</Button>
    </DialogActions>
  </Dialog>
);