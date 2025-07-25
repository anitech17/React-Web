import { createSlice } from "@reduxjs/toolkit";
import type { StudentDashboardData } from "../../../Pages/StudentPages/Components";
import { fetchStudentDashboard } from "../thunks";
import { handleStudentDashboardFulfilled, handleStudentDashboardPending, handleStudentDashboardRejected } from "./sliceHandlers";

export interface StudentState {
  data: StudentDashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  data: null,
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "studentDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, handleStudentDashboardPending)
      .addCase(fetchStudentDashboard.fulfilled, handleStudentDashboardFulfilled)
      .addCase(fetchStudentDashboard.rejected, handleStudentDashboardRejected);
  },
});

export default studentSlice.reducer;
