// features/admin/thunks/coursesThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../Services/axiosConfig";
import type {
  Course,
  CreateAndEditCoursePayload,
  SyllabusSection,
} from "../../../Pages/AdminPages/Components/types";

interface FetchCoursesParams {
  title?: string;
  classId?: string;
  page?: number;
  limit?: number;
}

export const fetchCourses = createAsyncThunk<
  { data: Course[]; total: number; page: number; limit: number },
  FetchCoursesParams | undefined
>("admin/courses/fetchCourses", async (params = {}) => {
  const { title = "", classId = "", page = 0, limit = 10 } = params;
  const response = await axios.get("/admin/course", {
    params: { title, classId, page, limit },
  });
  return response.data;
});

export const createCourse = createAsyncThunk<
  Course,
  CreateAndEditCoursePayload,
  { rejectValue: string }
>("admin/courses/createCourse", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post("/admin/course", payload);
    return { ...payload, id: response.data.data.courseId };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to create course");
  }
});

export const editCourse = createAsyncThunk<
  Course,
  { courseId: string; data: CreateAndEditCoursePayload },
  { rejectValue: string }
>("admin/courses/editCourse", async ({ courseId, data }, { rejectWithValue }) => {
  try {
    await axios.put(`/admin/course/${courseId}`, data);
    return { ...data, id: courseId };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to update course");
  }
});

export const deleteCourse = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("admin/courses/deleteCourse", async (courseId, { rejectWithValue }) => {
  try {
    await axios.delete(`/admin/course/${courseId}`);
    return courseId;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete course");
  }
});

export const fetchSyllabusByCourseId = createAsyncThunk<
  SyllabusSection[],
  string,
  { rejectValue: string }
>("admin/courses/fetchSyllabusByCourseId", async (courseId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/admin/course/syllabus/${courseId}`);
    return response.data.data; 
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch syllabus");
  }
});
