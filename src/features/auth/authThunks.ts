// authThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Services/axiosConfig';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data; // { user, token, message }
  }
);

// Auto-login: fetch user using saved token
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/auth/user');
      return response.data; // { user, token, message }
    } catch (error: any) {
      if (error.response?.status === 401) {
        return rejectWithValue('Token expired'); // Explicit error for expired token
      }
      return rejectWithValue(error.response?.data?.message || 'Auto login failed');
    }
  }
);
