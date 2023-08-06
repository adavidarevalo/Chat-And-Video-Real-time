/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;

export const getConversations = createAsyncThunk('conversation/all', async (token: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(CONVERSATION_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error.message);
  }
});
