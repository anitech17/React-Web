import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { createUser, deleteUser, editUser, fetchUsers } from "../../features/admin/thunks";
import { UserDialog, UsersTable } from "./Components";
import type { User } from "./Components/types";
import { Spinner } from "../../Components";
import { DeleteConfirmDialog } from "../../Components/WarningsDialog/DeleteConfirmDialog";
import { useSnackbar } from "notistack";

export const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { users, total, page, limit, loading } = useAppSelector(
    (state) => state.admin.users
  );

  // --- STATE ---
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [pageParam, setPageParam] = useState(page);
  const [limitParam, setLimitParam] = useState(limit);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [form, setForm] = useState<Omit<User, "id" | "created_at">>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    role: "student",
  });

  // useMemo to prevent recreating fetchParams object
  const fetchParams = useMemo(() => ({
    search,
    role: roleFilter,
    page: pageParam,
    limit: limitParam,
  }), [search, roleFilter, pageParam, limitParam]);

  useEffect(() => {
    dispatch(fetchUsers(fetchParams));
  }, [dispatch, fetchParams]);

  // useCallback: to memoize stable handler function references
  const handleOpenCreate = useCallback(() => {
    setEditingUser(null);
    setForm({ name: "", email: "", phone: "", dob: "", role: "student" });
    setOpenDialog(true);
  }, []);

  const handleSaveUser = useCallback(() => {
    if (editingUser) {
      const { role, ...dataWithoutRole } = form;

      dispatch(editUser({ id: editingUser.id, data: dataWithoutRole }))
        .unwrap()
        .then(() => {
          enqueueSnackbar("User updated successfully", { variant: "success" });
          setOpenDialog(false);
          dispatch(fetchUsers(fetchParams));
        })
        .catch((err) => {
          enqueueSnackbar(err || "Failed to update user", { variant: "error" });
        });
    } else {
      dispatch(createUser(form))
        .unwrap()
        .then(() => {
          enqueueSnackbar("User created successfully", { variant: "success" });
          setOpenDialog(false);
          dispatch(fetchUsers(fetchParams));
        })
        .catch((err) => {
          enqueueSnackbar(err || "Failed to create user", { variant: "error" });
        });
    }
  }, [editingUser, form, dispatch, enqueueSnackbar, fetchParams]);

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: dayjs(user.dob).format("YYYY-MM-DD"),
      role: user.role,
    });
    setOpenDialog(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setUserToDelete(user);
      setDeleteDialogOpen(true);
    }
  }, [users]);

  const confirmDelete = useCallback(() => {
    if (!userToDelete) return;

    dispatch(deleteUser(userToDelete.id))
      .unwrap()
      .then(() => {
        enqueueSnackbar("User deleted successfully", { variant: "success" });
        dispatch(fetchUsers(fetchParams));
      })
      .catch((err) => {
        enqueueSnackbar(err || "Failed to delete user", { variant: "error" });
      })
      .finally(() => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      });
  }, [userToDelete, dispatch, enqueueSnackbar, fetchParams]);

  // useMemo to avoid recreating the confirmation message string
  const deleteConfirmMessage = useMemo(() => {
    return userToDelete
      ? `Are you sure you want to delete ${userToDelete.name} (${userToDelete.role})?`
      : "";
  }, [userToDelete]);

  return (
    <Box width="100%" p={3}>
      {loading && <Spinner />}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Admin Users</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenCreate}>
          Create User
        </Button>
      </Box>

      <UsersTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRoleFilterChange={setRoleFilter}
        onSearchChange={setSearch}
        onPageChange={setPageParam}
        onLimitChange={(newLimit) => {
          setLimitParam(newLimit);
          setPageParam(0);
        }}
        page={pageParam}
        limit={limitParam}
        total={total}
      />

      <UserDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSaveUser}
        isEditing={!!editingUser}
        form={form}
        setForm={setForm}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        message={deleteConfirmMessage}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </Box>
  );
};
