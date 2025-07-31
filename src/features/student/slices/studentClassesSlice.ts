// features/studentClasses/slice/studentClassesSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { StudentClassesResponse } from "../../../Pages/StudentPages/Components"; // Adjust path if needed
import { fetchStudentClasses } from "../thunks/studentClassesThunk";
import {
  handleStudentClassesFulfilled,
  handleStudentClassesPending,
  handleStudentClassesRejected,
} from "./sliceHandlers";

export interface StudentClassesState {
  data: StudentClassesResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: StudentClassesState = {
  data: null,
  loading: false,
  error: null,
};

const studentClassesSlice = createSlice({
  name: "studentClasses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentClasses.pending, handleStudentClassesPending)
      .addCase(fetchStudentClasses.fulfilled, handleStudentClassesFulfilled)
      .addCase(fetchStudentClasses.rejected, handleStudentClassesRejected);
  },
});

export default studentClassesSlice.reducer;
