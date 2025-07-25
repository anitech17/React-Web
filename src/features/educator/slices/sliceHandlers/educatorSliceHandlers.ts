import type { PayloadAction } from "@reduxjs/toolkit";
import type { EducatorDashboardData } from "../../../../Pages/EducatorPages/Components";
import type { EducatorState } from "../educatorSlice";

export const handleEducatorDashboardPending = (state: EducatorState) => {
  state.loading = true;
  state.error = null;
  state.data = null;
};

export const handleEducatorDashboardFulfilled = (
  state: EducatorState,
  action: PayloadAction<EducatorDashboardData>
) => {
  state.loading = false;
  state.data = action.payload;
};

export const handleEducatorDashboardRejected = (
  state: EducatorState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to fetch educator dashboard";
};
