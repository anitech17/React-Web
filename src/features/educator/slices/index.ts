// src/features/admin/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import educatorDataReducer from "./educatorSlice";

const educatorReducer = combineReducers({
  educatorDashboard: educatorDataReducer,

});

export default educatorReducer;