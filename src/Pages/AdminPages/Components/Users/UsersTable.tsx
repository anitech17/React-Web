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
import { useState, useCallback, memo, useEffect } from "react";
import type { UsersTableProps } from "../types";
import type { SelectChangeEvent } from "@mui/material";
import { useDebounce } from "../../../../hooks";

const UsersTableComponent = ({
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
}: UsersTableProps) => {
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchInput = useDebounce(searchTerm, 700);

  const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
      },
      []
    );
  
  useEffect(() => {
      onSearchChange(debouncedSearchInput);
  }, [debouncedSearchInput, onSearchChange]);
  

  const handleRoleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      setRoleFilter(value);
      onRoleFilterChange?.(value);
    },
    [onRoleFilterChange]
  );

  const handlePageChange = useCallback(
    (_: unknown, newPage: number) => {
      onPageChange?.(newPage);
    },
    [onPageChange]
  );

  const handleLimitChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLimit = parseInt(event.target.value, 10);
      onLimitChange?.(newLimit);
      onPageChange?.(0);
    },
    [onLimitChange, onPageChange]
  );

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        mb={2}
        gap={2}
      >
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
                <IconButton onClick={() => onEdit(user)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(user.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total || 0}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={limit}
        onRowsPerPageChange={handleLimitChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

// Memoized to avoid unnecessary re-renders
export const UsersTable = memo(UsersTableComponent);
