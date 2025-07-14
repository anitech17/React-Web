import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import type { DialogBoxProps, Role } from "../types";

export const UserDialog: React.FC<DialogBoxProps> = ({ open, onClose, onSubmit, isEditing, form, setForm }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
          />
          {!isEditing && (
            <TextField
              label="Password"
              type="password"
              value={(form as any).password || ""}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              fullWidth
            />
          )}
          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            fullWidth
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
            fullWidth
            disabled={isEditing}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="educator">Educator</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </Select>
          {isEditing && (
            <Typography variant="caption" color="textSecondary" mt={0.5}>
              Role cannot be changed during edit
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          {isEditing ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};