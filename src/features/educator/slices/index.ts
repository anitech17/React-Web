// src/features/admin/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import educatorDataReducer from "./educatorSlice";
import educatorClassesReducer from "./educatorClassesSlice";
import educatorStudentsReducer from "./educatorStudentsSlice";

const educatorReducer = combineReducers({
  educatorDashboard: educatorDataReducer,
  educatorClasses: educatorClassesReducer,
  educatorStudents: educatorStudentsReducer,
});

export default educatorReducer;