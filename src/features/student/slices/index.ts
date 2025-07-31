// src/features/admin/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import studentDataReducer from "./studentSlice";
import studentClassesReducer from "./studentClassesSlice";
// import reportsReducer from "./reports/reportsSlice";

const studentReducer = combineReducers({
  studentDashboard: studentDataReducer,
  studentClasses: studentClassesReducer,
  // reports: reportsReducer,
});

export default studentReducer;