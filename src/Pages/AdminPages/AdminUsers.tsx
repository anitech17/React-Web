import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import type { User } from "./Components/types";
import { UserDialog, UsersTable } from "./Components";

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      role: "educator",
      dob: "1990-01-01",
      created_at: "2023-01-01T00:00:00.000Z",
    },
    {
      id: "2",
      name: "Jane Admin",
      email: "admin@example.com",
      phone: "9876543210",
      role: "admin",
      dob: "1985-06-15",
      created_at: "2024-05-01T00:00:00.000Z",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [form, setForm] = useState<Omit<User, "id" | "created_at">>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    role: "student",
  });

  const handleOpenCreate = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", phone: "", dob: "", role: "student" });
    setOpenDialog(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...editingUser, ...form } : u))
      );
    } else {
      const newUser: User = {
        ...form,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setOpenDialog(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: dayjs(user.dob).format("YYYY-MM-DD"),
      role: user.role,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box width="100%" p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Admin Users</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create User
        </Button>
      </Box>

      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <UserDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSaveUser}
        isEditing={!!editingUser}
        form={form}
        setForm={setForm}
      />
    </Box>
  );
};
