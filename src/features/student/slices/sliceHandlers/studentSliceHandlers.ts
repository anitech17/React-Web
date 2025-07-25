import type { PayloadAction } from "@reduxjs/toolkit";
import type { StudentDashboardData } from "../../../../Pages/StudentPages/Components";
import type { StudentState } from "../studentSlice";

export const handleStudentDashboardPending = (state: StudentState) => {
  state.loading = true;
  state.error = null;
  state.data = null;
};

export const handleStudentDashboardFulfilled = (
  state: StudentState,
  action: PayloadAction<StudentDashboardData>
) => {
  state.loading = false;
  state.data = action.payload;
};

export const handleStudentDashboardRejected = (
  state: StudentState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to fetch student dashboard";
};
