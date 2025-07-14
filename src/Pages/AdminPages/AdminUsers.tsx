import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedHooks";
import { createUser, editUser, fetchUsers } from "../../features/admin/thunks";
import { UserDialog, UsersTable } from "./Components";
import type { User } from "./Components/types";
import { Spinner } from "../../Components";

export const AdminUsers = () => {
    const dispatch = useAppDispatch();
    const { users, total, page, limit, loading } = useAppSelector((state) => state.admin.users);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [pageParam, setPageParam] = useState(page); // page index (zero-based for MUI)
    const [limitParam, setLimitParam] = useState(limit); // rows per page


    const [form, setForm] = useState<Omit<User, "id" | "created_at">>({
        name: "",
        email: "",
        phone: "",
        dob: "",
        role: "student",
    });

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    useEffect(() => {
        dispatch(fetchUsers({ search, role: roleFilter, page: pageParam, limit: limitParam }));
    }, [dispatch, search, roleFilter, pageParam, limitParam]);



    const handleOpenCreate = () => {
        setEditingUser(null);
        setForm({ name: "", email: "", phone: "", dob: "", role: "student" });
        setOpenDialog(true);
    };

    const handleSaveUser = () => {
        if (editingUser) {
            const { role, ...dataWithoutRole } = form; // 👈 remove `role` from form
            dispatch(editUser({ id: editingUser.id, data: dataWithoutRole }))
                .unwrap()
                .then(() => {
                    setOpenDialog(false);
                    dispatch(fetchUsers({ search, role: roleFilter, page: pageParam, limit: limitParam }));
                })
                .catch((err) => {
                    console.error("Failed to update user:", err);
                });
        } else {
            dispatch(createUser(form))
                .unwrap()
                .then(() => {
                    setOpenDialog(false); // close dialog
                    dispatch(fetchUsers({ search, role: roleFilter, page: pageParam, limit: limitParam })); // refetch updated list
                })
                .catch((err) => {
                    console.error("Failed to create user:", err);
                    // Optionally show error message via toast/snackbar
                });
        }
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
        // implement delete API call here
        console.log(id);

    };

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
                    setPageParam(0); // reset to first page
                }}
                page={pageParam}
                limit={limitParam}
                total={total} // Replace with dynamic total from API
            />

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
