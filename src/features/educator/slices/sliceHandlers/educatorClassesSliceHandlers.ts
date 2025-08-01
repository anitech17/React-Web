// features/educatorClasses/slice/educatorClassesSliceHandlers.ts

import type { PayloadAction } from "@reduxjs/toolkit";
import type { EducatorClassesResponse } from "../../../../Pages/EducatorPages/Components";
import type { EducatorClassesState } from "../educatorClassesSlice";

export const handleEducatorClassesPending = (state: EducatorClassesState) => {
  state.loading = true;
  state.error = null;
  state.data = null;
};

export const handleEducatorClassesFulfilled = (
  state: EducatorClassesState,
  action: PayloadAction<EducatorClassesResponse>
) => {
  state.loading = false;
  state.data = action.payload;
};

export const handleEducatorClassesRejected = (
  state: EducatorClassesState,
  action: any
) => {
  state.loading = false;
  state.error = action.payload || "Failed to fetch educator classes";
};
