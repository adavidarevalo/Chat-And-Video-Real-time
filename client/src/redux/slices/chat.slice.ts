/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getConversations } from '../actions/chat.actions';

const initialState: any = {
  status: '',
  error: '',
  conversation: [],
  activeConversation: {},
  notification: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getConversations.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = '';
        state.conversation = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
