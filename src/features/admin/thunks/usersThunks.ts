// src/features/admin/users/usersThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type { CreateAndEditUserPayload, User } from "../../../Pages/AdminPages/Components/types";

interface FetchUsersParams {
  role?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const fetchUsers = createAsyncThunk<
  { data: User[]; total: number; page: number; limit: number },
  FetchUsersParams | undefined
>("admin/users/fetchUsers", async (params = {}) => {
  const { role = "", search = "", page = 1, limit = 10 } = params;

  const response = await axios.get("/admin/users", {
    params: { role, search, page, limit },
  });

  return response.data;
});

export const createUser = createAsyncThunk<
  User,
  CreateAndEditUserPayload,
  { rejectValue: string }
>("admin/users/createUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/admin/user", userData);
    return response.data.user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to create user");
  }
});

export const editUser = createAsyncThunk<
  User,
  { id: string; data: Partial<User> },
  { rejectValue: string }
>("admin/users/editUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/admin/user/${id}`, data);
    return response.data.user;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to update user");
  }
});

export const deleteUser = createAsyncThunk<
  string, // return type (userId)
  string, // input (userId)
  { rejectValue: string }
>("admin/users/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/admin/user/${id}`);
    return id; // return the deleted user's id
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete user");
  }
});


