import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type { EducatorDashboardData } from "../../../Pages/EducatorPages/Components";

export const fetchEducatorDashboard = createAsyncThunk<
  EducatorDashboardData,
  string, // educator_id
  { rejectValue: string }
>("educator/dashboard/fetchEducatorDashboard", async (educatorId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/educator/user/${educatorId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch educator data");
  }
});
