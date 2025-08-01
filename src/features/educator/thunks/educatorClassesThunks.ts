import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type { EducatorClassesResponse } from "../../../Pages/EducatorPages/Components";

export const fetchEducatorClasses = createAsyncThunk<
  EducatorClassesResponse,
  string, // educator_id
  { rejectValue: string }
>(
  "educator/classes/fetchEducatorClasses",
  async (educatorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/educator/classes/${educatorId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch educator classes"
      );
    }
  }
);
