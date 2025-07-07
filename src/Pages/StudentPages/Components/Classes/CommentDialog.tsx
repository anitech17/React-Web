// --- components/CommentDialog.tsx ---
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export const CommentDialog = ({ open, onClose, comment, setComment, onSubmit }: {
  open: boolean,
  onClose: () => void,
  comment: string,
  setComment: (val: string) => void,
  onSubmit: () => void,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={onSubmit}>Submit</Button>
    </DialogActions>
  </Dialog>
);