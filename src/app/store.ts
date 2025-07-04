import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// import adminReducer from '../features/admin/adminSlice';
// import educatorReducer from '../features/educator/educatorSlice';
// import studentReducer from '../features/student/studentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // admin: adminReducer,
    // educator: educatorReducer,
    // student: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
