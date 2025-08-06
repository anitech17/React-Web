import type { PayloadAction } from "@reduxjs/toolkit";
import type { EducatorStudentsState } from "../educatorStudentsSlice";
import type { EducatorStudentEnrollment } from "../../../../Pages/EducatorPages/Components";

export const handleEducatorStudentsPending = (state: EducatorStudentsState) => {
  state.loading = true;
  state.error = null;
  state.data = null;
};

export const handleEducatorStudentsFulfilled = (
  state: EducatorStudentsState,
  action: PayloadAction<EducatorStudentEnrollment[]>
) => {
  state.loading = false;
  state.data = action.payload;
};

export const handleEducatorStudentsRejected = (
  state: EducatorStudentsState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to fetch educator students";
};
