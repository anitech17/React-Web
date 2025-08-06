import { createSlice } from "@reduxjs/toolkit";
import {
  handleEducatorStudentsPending,
  handleEducatorStudentsFulfilled,
  handleEducatorStudentsRejected,
} from "./sliceHandlers";
import type { EducatorStudentEnrollment } from "../../../Pages/EducatorPages/Components";
import { fetchEducatorStudents } from "../thunks";

export interface EducatorStudentsState {
  data: EducatorStudentEnrollment[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: EducatorStudentsState = {
  data: null,
  loading: false,
  error: null,
};

const educatorStudentsSlice = createSlice({
  name: "educatorStudents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducatorStudents.pending, handleEducatorStudentsPending)
      .addCase(fetchEducatorStudents.fulfilled, handleEducatorStudentsFulfilled)
      .addCase(fetchEducatorStudents.rejected, handleEducatorStudentsRejected);
  },
});

export default educatorStudentsSlice.reducer;
