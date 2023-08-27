import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    values: {
      name: string;
      email: string;
      status?: string | undefined;
      password: string;
      picture: string | undefined;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, values);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message);
      }
      throw error;
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, values);
      return data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const authError: {
          message: string;
        } = error.response?.data?.error;
        if (authError) {
          return rejectWithValue(authError.message);
        }
      }
      return rejectWithValue('An error occurred while logging in.');
    }
  },
);
