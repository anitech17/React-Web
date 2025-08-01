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
import { memo, useCallback } from "react";
import type { DialogBoxProps, Role } from "../types";
import type { SelectChangeEvent } from "@mui/material";

const UserDialogComponent = ({
  open,
  onClose,
  onSubmit,
  isEditing,
  form,
  setForm,
}: DialogBoxProps) => {
  const handleChange = useCallback(
    (field: keyof typeof form, value: string) => {
      setForm({ ...form, [field]: value });
    },
    [form, setForm]
  );

  const handleRoleChange = useCallback(
    (e: SelectChangeEvent) => {
      handleChange("role", e.target.value as Role);
    },
    [handleChange]
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
          />
          {!isEditing && (
            <TextField
              label="Password"
              type="password"
              value={"password" in form ? (form as any).password : ""}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              fullWidth
            />
          )}
          <TextField
            label="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            fullWidth
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={form.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <Select
            value={form.role}
            onChange={handleRoleChange}
            fullWidth
            disabled={isEditing}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="educator">Educator</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </Select>
          {isEditing && (
            <Typography variant="caption" color="textSecondary">
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

export const UserDialog = memo(UserDialogComponent);
