// --- components/TestDetailsDialog.tsx ---
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
} from "@mui/material";

export const TestDetailsDialog = ({ open, onClose, test, isCompleted }: {
  open: boolean,
  onClose: () => void,
  test: any,
  isCompleted: boolean,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{test?.subject} Test Details</DialogTitle>
    <DialogContent>
      <Typography variant="body2" fontWeight={500}>Date:</Typography>
      <Typography variant="body1" mb={1}>{test?.date}</Typography>

      <Typography variant="body2" fontWeight={500}>Time:</Typography>
      <Typography variant="body1" mb={1}>{test?.time}</Typography>

      <Typography variant="body2" fontWeight={500}>Invigilator:</Typography>
      <Typography variant="body1" mb={1}>{test?.invigilator}</Typography>

      <Typography variant="body2" fontWeight={500}>Syllabus:</Typography>
      <Typography variant="body1" mb={1}>{test?.syllabus}</Typography>

      <Typography variant="body2" fontWeight={500}>Exam Pattern:</Typography>
      <Typography variant="body1" mb={2}>{test?.pattern}</Typography>

      {isCompleted && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" fontWeight={500}>Educator's Review:</Typography>
          <Typography variant="body1" mb={2}>{test?.review}</Typography>
        </>
      )}
    </DialogContent>
    <DialogActions>
      {isCompleted && <Button variant="outlined">Download Result</Button>}
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);