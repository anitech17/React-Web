import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type { StudentDashboardData } from "../../../Pages/StudentPages/Components"; // We'll define this type based on your API later

export const fetchStudentDashboard = createAsyncThunk<
  StudentDashboardData,
  string, // student_id
  { rejectValue: string }
>("student/dashboard/fetchStudentDashboard", async (studentId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/student/user/${studentId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch student data");
  }
});
