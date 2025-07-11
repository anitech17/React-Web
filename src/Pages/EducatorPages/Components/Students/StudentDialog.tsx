// components/StudentDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { useState } from "react";

const dummyProgress = {
  English: 75,
  Math: 60,
  Science: 85,
  History: 70,
};

const previousReviews = [
  { by: "Mr. Smith", comment: "Excellent in Science." },
  { by: "Ms. Lee", comment: "Needs improvement in History." },
];

export const StudentDialog = ({ open, onClose, student }: any) => {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("Review added:", review);
    setReview("");
    onClose();
  };

  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{student.name}'s Portfolio</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>Progress Report</Typography>
        <Box mb={2}>
          {Object.entries(dummyProgress).map(([subject, value]) => (
            <Typography key={subject}>{subject}: {value}%</Typography>
          ))}
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>Previous Reviews</Typography>
        <Box mb={2}>
          {previousReviews.map((r, i) => (
            <Typography key={i}>- {r.by}: {r.comment}</Typography>
          ))}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>Add Review</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};