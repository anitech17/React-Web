export type Role = "admin" | "educator" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  dob: string;
  created_at: string;
}

export interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onRoleFilterChange?: (role: string) => void;
  onSearchChange?: (search: string) => void;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  page: number;
  limit: number;
  total: number;
}

export interface CreateAndEditUserPayload {
  name: string;
  email: string;
  password?: string;
  dob: string;
  phone: string;
  role: Role;
}

export interface DialogBoxProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEditing: boolean;
  form: CreateAndEditUserPayload;
  setForm: (form: CreateAndEditUserPayload) => void;
}
