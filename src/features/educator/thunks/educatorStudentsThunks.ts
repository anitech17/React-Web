import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type { EducatorStudentEnrollment } from "../../../Pages/EducatorPages/Components";

export const fetchEducatorStudents = createAsyncThunk<
  EducatorStudentEnrollment[],
  string,
  { rejectValue: string }
>(
  "educator/students/fetchEducatorStudents",
  async (educatorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/educator/students/${educatorId}`);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch educator students"
      );
    }
  }
);
