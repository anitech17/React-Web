import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export const StudentClasses = () => {
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [comment, setComment] = useState("");

  const scheduledClasses = [
    { id: 1, time: "10:00 AM", educator: "Mr. Smith", subject: "Math" },
    { id: 2, time: "12:00 PM", educator: "Ms. Johnson", subject: "English" },
  ];

  const completedClasses = [
    { id: 3, time: "9:00 AM", educator: "Dr. Green", subject: "Science" },
  ];

  const handleCommentClick = (id: any) => {
    setSelectedClassId(id);
    setOpenCommentDialog(true);
  };

  const handleSubmitComment = () => {
    console.log("Comment submitted:", comment, "for class ID:", selectedClassId);
    setOpenCommentDialog(false);
    setComment("");
  };

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          My Classes
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenRequestDialog(true)}>
          Request a Class
        </Button>
      </Box>

      {/* Scheduled Classes */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Scheduled Classes</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Educator</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledClasses.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.time}</TableCell>
                <TableCell>{cls.educator}</TableCell>
                <TableCell>{cls.subject}</TableCell>
                <TableCell>
                  <Button size="small" color="warning" sx={{ mr: 1 }}>Postpone</Button>
                  <Button size="small" color="success">Prepend</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Completed Classes */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>Completed Classes</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Educator</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedClasses.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.time}</TableCell>
                <TableCell>{cls.educator}</TableCell>
                <TableCell>{cls.subject}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleCommentClick(cls.id)}>Add Comment</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Request Class Dialog */}
      <Dialog open={openRequestDialog} onClose={() => setOpenRequestDialog(false)} fullWidth maxWidth="sm">
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
          <Button onClick={() => setOpenRequestDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={() => setOpenRequestDialog(false)}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={openCommentDialog} onClose={() => setOpenCommentDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCommentDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitComment}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
