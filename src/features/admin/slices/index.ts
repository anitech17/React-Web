// src/features/admin/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
// import classesReducer from "./classes/classesSlice";
// import reportsReducer from "./reports/reportsSlice";

const adminReducer = combineReducers({
  users: usersReducer,
  // classes: classesReducer,
  // reports: reportsReducer,
});

export default adminReducer;
