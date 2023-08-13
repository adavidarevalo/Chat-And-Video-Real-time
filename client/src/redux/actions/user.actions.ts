import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

export const registerUser = createAsyncThunk('auth/register', async (values: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, values);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error.message);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (values: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, values);
    return data.user;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error.message);
  }
});
