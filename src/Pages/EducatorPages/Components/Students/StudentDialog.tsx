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
import type { EducatorStudentEnrollment } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  student: EducatorStudentEnrollment | null;
}

export const StudentDialog = ({ open, onClose, student }: Props) => {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("Review added:", review);
    setReview("");
    onClose();
  };

  if (!student) return null;

  const {
    student: { user },
    course,
    percent_complete,
    enrolled_on,
    progress,
  } = student;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{user.name}'s Portfolio</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Student Information
        </Typography>
        <Box mb={2}>
          <Typography><strong>Name:</strong> {user.name}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Phone:</strong> {user.phone || "—"}</Typography>
          <Typography><strong>DOB:</strong> {user.dob || "—"}</Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Course Information
        </Typography>
        <Box mb={2}>
          <Typography><strong>Title:</strong> {course.title}</Typography>
          <Typography><strong>Class:</strong> {course.class || "—"}</Typography>
          <Typography><strong>Subject:</strong> {course.subject || "—"}</Typography>
          <Typography><strong>Progress:</strong> {progress || "—"}</Typography>
          <Typography><strong>Completion:</strong> {percent_complete}%</Typography>
          <Typography><strong>Enrolled On:</strong> {new Date(enrolled_on).toLocaleDateString()}</Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Add Review
        </Typography>
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
