// src/features/admin/users/usersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks";
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
      });
  },
});

export default usersSlice.reducer;
