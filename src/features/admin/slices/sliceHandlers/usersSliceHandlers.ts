// src/features/admin/users/usersSliceHandlers.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../../Pages/AdminPages/Components/types";
import type { UsersState } from "../usersSlice";

// fetchUsers
export const handleFetchUsersPending = (state: UsersState) => {
  state.loading = true;
  state.error = null;
};

export const handleFetchUsersFulfilled = (
  state: UsersState,
  action: PayloadAction<{
    data: User[];
    total: number;
    page: number;
    limit: number;
  }>
) => {
  state.users = action.payload.data;
  state.total = action.payload.total;
  state.page = action.payload.page;
  state.limit = action.payload.limit;
  state.loading = false;
};

export const handleFetchUsersRejected = (
  state: UsersState,
  action: any
) => {
  state.loading = false;
  state.error = action.error?.message ?? "Failed to fetch users";
};

// createUser
export const handleCreateUserPending = (state: UsersState) => {
  state.loading = true;
  state.error = null;
};

export const handleCreateUserFulfilled = (
  state: UsersState,
  action: PayloadAction<User>
) => {
  state.users.unshift(action.payload);
  state.loading = false;
};

export const handleCreateUserRejected = (
  state: UsersState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to create user";
};

// editUser
export const handleEditUserPending = (state: UsersState) => {
  state.loading = true;
  state.error = null;
};

export const handleEditUserFulfilled = (
  state: UsersState,
  action: PayloadAction<User>
) => {
  const updatedUser = action.payload;
  const index = state.users.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    state.users[index] = updatedUser;
  }
  state.loading = false;
};

export const handleEditUserRejected = (
  state: UsersState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to update user";
};

// deleteUser
export const handleDeleteUserPending = (state: UsersState) => {
  state.loading = true;
  state.error = null;
};

export const handleDeleteUserFulfilled = (
  state: UsersState,
  action: PayloadAction<string>
) => {
  state.users = state.users.filter((user) => user.id !== action.payload);
  state.loading = false;
};

export const handleDeleteUserRejected = (
  state: UsersState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to delete user";
};
