// src/features/admin/users/usersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, editUser, fetchUsers } from "../thunks";
import type { User } from "../../../Pages/AdminPages/Components/types";

interface UsersState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
  page: 0,
  limit: 10,
};

const usersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload); // optionally add new user to the list
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create user";
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser; // Optimistic UI update
        }
        state.loading = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

export default usersSlice.reducer;
