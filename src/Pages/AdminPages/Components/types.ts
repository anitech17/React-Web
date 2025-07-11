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
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  role: Role;
}

export interface DialogBoxProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEditing: boolean;
  form: FormData;
  setForm: (form: FormData) => void;
}