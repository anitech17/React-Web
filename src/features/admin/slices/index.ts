// src/features/admin/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import coursesReducer from "./coursesSlice";
// import classesReducer from "./classes/classesSlice";
// import reportsReducer from "./reports/reportsSlice";

const adminReducer = combineReducers({
  users: usersReducer,
  courses: coursesReducer,
  // classes: classesReducer,
  // reports: reportsReducer,
});

export default adminReducer;
