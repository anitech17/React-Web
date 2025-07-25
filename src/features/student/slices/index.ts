// src/features/admin/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import studentDataReducer from "./studentSlice";
// import classesReducer from "./classes/classesSlice";
// import reportsReducer from "./reports/reportsSlice";

const studentReducer = combineReducers({
  studentDashboard: studentDataReducer,
  // classes: classesReducer,
  // reports: reportsReducer,
});

export default studentReducer;