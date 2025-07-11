// src/features/admin/users/usersThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type { User } from "../../../Pages/AdminPages/Components/types";

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
