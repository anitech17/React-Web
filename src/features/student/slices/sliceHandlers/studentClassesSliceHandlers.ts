// features/studentClasses/slice/studentClassesSliceHandlers.ts

import type { PayloadAction } from "@reduxjs/toolkit";
import type { StudentClassesResponse } from "../../../../Pages/StudentPages/Components";
import type { StudentClassesState } from "../studentClassesSlice";

export const handleStudentClassesPending = (state: StudentClassesState) => {
  state.loading = true;
  state.error = null;
  state.data = null;
};

export const handleStudentClassesFulfilled = (
  state: StudentClassesState,
  action: PayloadAction<StudentClassesResponse>
) => {
  state.loading = false;
  state.data = action.payload;
};

export const handleStudentClassesRejected = (
  state: StudentClassesState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to fetch student classes";
};
