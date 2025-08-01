// features/educatorClasses/slice/educatorClassesSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { EducatorClassesResponse } from "../../../Pages/EducatorPages/Components"; // Adjust this path if needed
import {
  handleEducatorClassesPending,
  handleEducatorClassesFulfilled,
  handleEducatorClassesRejected,
} from "./sliceHandlers";
import { fetchEducatorClasses } from "../thunks";

export interface EducatorClassesState {
  data: EducatorClassesResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: EducatorClassesState = {
  data: null,
  loading: false,
  error: null,
};

const educatorClassesSlice = createSlice({
  name: "educatorClasses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducatorClasses.pending, handleEducatorClassesPending)
      .addCase(fetchEducatorClasses.fulfilled, handleEducatorClassesFulfilled)
      .addCase(fetchEducatorClasses.rejected, handleEducatorClassesRejected);
  },
});

export default educatorClassesSlice.reducer;
