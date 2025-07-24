// src/features/admin/users/usersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  editUser,
  fetchUsers,
} from "../thunks";
import type { User } from "../../../Pages/AdminPages/Components/types";
import {
  handleFetchUsersPending,
  handleFetchUsersFulfilled,
  handleFetchUsersRejected,
  handleCreateUserPending,
  handleCreateUserFulfilled,
  handleCreateUserRejected,
  handleEditUserPending,
  handleEditUserFulfilled,
  handleEditUserRejected,
  handleDeleteUserPending,
  handleDeleteUserFulfilled,
  handleDeleteUserRejected,
} from "./sliceHandlers";

export interface UsersState {
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
      .addCase(fetchUsers.pending, handleFetchUsersPending)
      .addCase(fetchUsers.fulfilled, handleFetchUsersFulfilled)
      .addCase(fetchUsers.rejected, handleFetchUsersRejected)

      .addCase(createUser.pending, handleCreateUserPending)
      .addCase(createUser.fulfilled, handleCreateUserFulfilled)
      .addCase(createUser.rejected, handleCreateUserRejected)

      .addCase(editUser.pending, handleEditUserPending)
      .addCase(editUser.fulfilled, handleEditUserFulfilled)
      .addCase(editUser.rejected, handleEditUserRejected)

      .addCase(deleteUser.pending, handleDeleteUserPending)
      .addCase(deleteUser.fulfilled, handleDeleteUserFulfilled)
      .addCase(deleteUser.rejected, handleDeleteUserRejected);
  },
});

export default usersSlice.reducer;
