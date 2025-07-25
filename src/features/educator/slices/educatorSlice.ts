import { createSlice } from "@reduxjs/toolkit";
import type { EducatorDashboardData } from "../../../Pages/EducatorPages/Components";
import { fetchEducatorDashboard } from "../thunks";
import {
  handleEducatorDashboardPending,
  handleEducatorDashboardFulfilled,
  handleEducatorDashboardRejected,
} from "./sliceHandlers";

export interface EducatorState {
  data: EducatorDashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: EducatorState = {
  data: null,
  loading: false,
  error: null,
};

const educatorSlice = createSlice({
  name: "educatorDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducatorDashboard.pending, handleEducatorDashboardPending)
      .addCase(fetchEducatorDashboard.fulfilled, handleEducatorDashboardFulfilled)
      .addCase(fetchEducatorDashboard.rejected, handleEducatorDashboardRejected);
  },
});

export default educatorSlice.reducer;
