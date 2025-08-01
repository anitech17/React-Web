// src/features/admin/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import educatorDataReducer from "./educatorSlice";
import studentClassesReducer from "./educatorClassesSlice";

const educatorReducer = combineReducers({
  educatorDashboard: educatorDataReducer,
  educatorClasses: studentClassesReducer,

});

export default educatorReducer;