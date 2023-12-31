import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

export const getConversations = createAsyncThunk(
  'conversation/all',
  async (token: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message);
      }
      throw error;
    }
  },
);

export const open_create_conversation = createAsyncThunk(
  'conversation/open_create',
  async (
    values: { receiver_id: string; token: string },
    { rejectWithValue },
  ) => {
    try {
      const { token, receiver_id } = values;
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT,
        { receiver_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message);
      }
      throw error;
    }
  },
);

export const getConversationMessages = createAsyncThunk(
  'conversation/messages',
  async (
    values: {
      token: string | undefined;
      conversation_id: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { token, conversation_id } = values;
      const { data } = await axios.get(
        `${MESSAGE_ENDPOINT}/${conversation_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message);
      }
      throw error;
    }
  },
);

export const sendMessage = createAsyncThunk(
  'conversation/send',
  async (
    values: {
      message: string;
      conversation_id: string | undefined;
      token: string;
      files: {
        file: void;
        type: string;
      }[];
    },
    { rejectWithValue },
  ) => {
    try {
      const { token, message, conversation_id, files } = values;
      const { data } = await axios.post(
        `${MESSAGE_ENDPOINT}`,
        {
          message,
          conversation_id,
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message);
      }
      throw error;
    }
  },
);
