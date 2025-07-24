// features/admin/slices/coursesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourses,
  createCourse,
  editCourse,
  deleteCourse,
  fetchSyllabusByCourseId,
} from "../thunks/coursesThunks";
import type { Course, SyllabusSection } from "../../../Pages/AdminPages/Components/types";
import {
  handleFetchCoursesPending,
  handleFetchCoursesFulfilled,
  handleFetchCoursesRejected,
  handleCreateCoursePending,
  handleCreateCourseFulfilled,
  handleCreateCourseRejected,
  handleEditCoursePending,
  handleEditCourseFulfilled,
  handleEditCourseRejected,
  handleDeleteCoursePending,
  handleDeleteCourseFulfilled,
  handleDeleteCourseRejected,
  handleFetchSyllabusPending,
  handleFetchSyllabusFulfilled,
  handleFetchSyllabusRejected,
} from "./sliceHandlers";

export interface CoursesState {
  courses: Course[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;

  syllabusLoading: boolean;
  syllabusError: string | null;
  syllabusSections: SyllabusSection[];
}

const initialState: CoursesState = {
  courses: [],
  total: 0,
  loading: false,
  error: null,
  page: 0,
  limit: 10,
  syllabusLoading: false,
  syllabusError: null,
  syllabusSections: [],
};

const coursesSlice = createSlice({
  name: "adminCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, handleFetchCoursesPending)
      .addCase(fetchCourses.fulfilled, handleFetchCoursesFulfilled)
      .addCase(fetchCourses.rejected, handleFetchCoursesRejected)

      .addCase(createCourse.pending, handleCreateCoursePending)
      .addCase(createCourse.fulfilled, handleCreateCourseFulfilled)
      .addCase(createCourse.rejected, handleCreateCourseRejected)

      .addCase(editCourse.pending, handleEditCoursePending)
      .addCase(editCourse.fulfilled, handleEditCourseFulfilled)
      .addCase(editCourse.rejected, handleEditCourseRejected)

      .addCase(deleteCourse.pending, handleDeleteCoursePending)
      .addCase(deleteCourse.fulfilled, handleDeleteCourseFulfilled)
      .addCase(deleteCourse.rejected, handleDeleteCourseRejected)

      .addCase(fetchSyllabusByCourseId.pending, handleFetchSyllabusPending)
      .addCase(fetchSyllabusByCourseId.fulfilled, handleFetchSyllabusFulfilled)
      .addCase(fetchSyllabusByCourseId.rejected, handleFetchSyllabusRejected);
  },
});

export default coursesSlice.reducer;
