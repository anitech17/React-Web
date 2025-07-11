import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    Typography,
    Paper,
    TablePagination,
} from "@mui/material";
import { Edit, Delete, Search as SearchIcon } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";
import type { UsersTableProps } from "../types";
import type { SelectChangeEvent } from "@mui/material";


export const UsersTable: React.FC<UsersTableProps> = ({
    users,
    onEdit,
    onDelete,
    onRoleFilterChange,
    onSearchChange,
    onPageChange,
    onLimitChange,
    page,
    limit,
    total,
}) => {
    const [roleFilter, setRoleFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        setRoleFilter(value);
        onRoleFilterChange?.(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearchChange?.(value);
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" mb={2} gap={2}>
                <Typography variant="h6">User Management</Typography>

                <Box display="flex" flexWrap="wrap" gap={2}>
                    <Select
                        value={roleFilter}
                        onChange={handleRoleChange}
                        displayEmpty
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="">All Roles</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="educator">Educator</MenuItem>
                        <MenuItem value="student">Student</MenuItem>
                    </Select>

                    <TextField
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ minWidth: 200 }}
                    />
                </Box>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Phone</strong></TableCell>
                        <TableCell><strong>Role</strong></TableCell>
                        <TableCell><strong>Date of Birth</strong></TableCell>
                        <TableCell><strong>Joining Date</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{dayjs(user.dob).format("YYYY-MM-DD")}</TableCell>
                            <TableCell>{dayjs(user.created_at).format("YYYY-MM-DD")}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(user)}><Edit /></IconButton>
                                <IconButton onClick={() => onDelete(user.id)}><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={total || 0}
                page={page}
                onPageChange={(_, newPage) => onPageChange?.(newPage)}
                rowsPerPage={limit}
                onRowsPerPageChange={(e) => {
                    const newLimit = parseInt(e.target.value, 10);
                    onLimitChange?.(newLimit);
                    onPageChange?.(0); // reset to first page
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>
    );
};
