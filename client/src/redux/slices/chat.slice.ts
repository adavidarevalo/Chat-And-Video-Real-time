/** @format */

import { createSlice } from '@reduxjs/toolkit';
import {
  getConversationMessages,
  getConversations,
  open_create_conversation,
  sendMessage,
} from '../actions/chat.actions';

const initialState: any = {
  status: '',
  error: '',
  conversations: [],
  activeConversation: {},
  messages: [],
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
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(open_create_conversation.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = '';
        state.activeConversation = action.payload;
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = '';
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.messages = [...state.messages, payload];
        const conversation = { ...payload.conversation, latestMessage: payload };
        const newConversation = [...state.conversations].filter(c => c.id !== conversation.id);

        newConversation.unshift(conversation);
        state.conversations = newConversation;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
