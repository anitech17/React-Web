// features/admin/slices/sliceHandlers/coursesSliceHandlers.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Course, SyllabusSection } from "../../../../Pages/AdminPages/Components/types";
import type { CoursesState } from "../coursesSlice";

// fetchCourses
export const handleFetchCoursesPending = (state: CoursesState) => {
  state.loading = true;
  state.error = null;
};

export const handleFetchCoursesFulfilled = (
  state: CoursesState,
  action: PayloadAction<{ data: Course[]; total: number; page: number; limit: number }>
) => {
  state.courses = action.payload.data;
  state.total = action.payload.total;
  state.page = action.payload.page;
  state.limit = action.payload.limit;
  state.loading = false;
};

export const handleFetchCoursesRejected = (state: CoursesState, action: any) => {
  state.loading = false;
  state.error = action.error?.message ?? "Failed to fetch courses";
};

// createCourse
export const handleCreateCoursePending = (state: CoursesState) => {
  state.loading = true;
  state.error = null;
};

export const handleCreateCourseFulfilled = (
  state: CoursesState,
  action: PayloadAction<Course>
) => {
  state.courses.unshift(action.payload);
  state.loading = false;
};

export const handleCreateCourseRejected = (state: CoursesState, action: any) => {
  state.loading = false;
  state.error = action.payload || "Failed to create course";
};

// editCourse
export const handleEditCoursePending = (state: CoursesState) => {
  state.loading = true;
  state.error = null;
};

export const handleEditCourseFulfilled = (
  state: CoursesState,
  action: PayloadAction<Course>
) => {
  const updatedCourse = action.payload;
  const index = state.courses.findIndex((c) => c.id === updatedCourse.id);
  if (index !== -1) {
    state.courses[index] = updatedCourse;
  }
  state.loading = false;
};

export const handleEditCourseRejected = (state: CoursesState, action: any) => {
  state.loading = false;
  state.error = action.payload || "Failed to update course";
};

// deleteCourse
export const handleDeleteCoursePending = (state: CoursesState) => {
  state.loading = true;
  state.error = null;
};

export const handleDeleteCourseFulfilled = (
  state: CoursesState,
  action: PayloadAction<string>
) => {
  state.courses = state.courses.filter((course) => course.id !== action.payload);
  state.loading = false;
};

export const handleDeleteCourseRejected = (state: CoursesState, action: any) => {
  state.loading = false;
  state.error = action.payload || "Failed to delete course";
};

// Syllabus handlers
export const handleFetchSyllabusPending = (state: CoursesState) => {
  state.syllabusLoading = true;
  state.syllabusError = null;
  state.syllabusSections = []; // clear old data
};

export const handleFetchSyllabusFulfilled = (
  state: CoursesState,
  action: PayloadAction<SyllabusSection[]>
) => {
  state.syllabusLoading = false;
  state.syllabusSections = action.payload;
};

export const handleFetchSyllabusRejected = (state: CoursesState, action: any) => {
  state.syllabusLoading = false;
  state.syllabusError = action.payload || "Failed to fetch syllabus";
};
