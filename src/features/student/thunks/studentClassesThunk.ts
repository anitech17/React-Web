import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type { StudentClassesResponse } from "../../../Pages/StudentPages/Components";

export const fetchStudentClasses = createAsyncThunk<
  StudentClassesResponse,
  string, // student_id
  { rejectValue: string }
>(
  "student/classes/fetchStudentClasses",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/student/classes/${studentId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch student classes"
      );
    }
  }
);
