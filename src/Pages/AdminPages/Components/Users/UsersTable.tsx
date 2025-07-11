import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import type { UsersTableProps } from "../types";

export const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Date of Birth</TableCell>
          <TableCell>Joining Date</TableCell>
          <TableCell>Actions</TableCell>
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
  );
};