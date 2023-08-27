import { createSlice } from '@reduxjs/toolkit';
import {
  getConversationMessages,
  getConversations,
  open_create_conversation,
  sendMessage,
} from '../actions/chat.actions';
import { Conversation } from '../../types/conversation.type';
import Message from '../../types/message.type';

export interface OnlineUsers {
  userId: string;
  socketId: string;
}

interface InitialState {
  status: 'loading' | 'succeeded' | 'failed';
  error: string | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  onlineUsers: OnlineUsers[];
  conversationTyping: string[];
  files: {
    type: string;
    file: File;
    fileData?: string;
    files?: {
      name: string;
    };
  }[];
}

const initialState: InitialState = {
  status: 'loading',
  error: null,
  conversations: [],
  activeConversation: null,
  messages: [],
  onlineUsers: [],
  conversationTyping: [],
  files: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateMessages: (state, action) => {
      if (!action.payload) return;

      const conversation = state.activeConversation;
      if (
        conversation?._id === action.payload.conversation._id &&
        !state.messages.some(({ _id }) => _id === action.payload._id)
      ) {
        state.messages = [...state.messages, action.payload];
      }

      const conversationToUpdate = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      const newConversation = [...state.conversations].filter(
        (c) => c._id !== conversationToUpdate._id,
      );

      newConversation.unshift(conversationToUpdate);
      state.conversations = newConversation;
    },
    setOnlineUsers: (state, { payload }) => {
      state.onlineUsers = payload;
    },
    addConversationTyping: (state, { payload }) => {
      if (
        !state.conversationTyping.some(
          (conversationId) => conversationId === payload,
        )
      ) {
        state.conversationTyping.push(payload);
      }
    },
    removeConversationTyping: (state, { payload }) => {
      state.conversationTyping = state.conversationTyping.filter(
        (c) => c !== payload,
      );
    },
    addFiles: (state, { payload }) => {
      state.files = [...state.files, payload];
    },
    clearFiles: (state) => {
      state.files = [];
    },
    removeFileByIndex: (state, { payload }) => {
      state.files = state.files.filter((_, index) => index !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(open_create_conversation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.activeConversation = action.payload;
        state.files = [];
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getConversationMessages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.messages = [...state.messages, payload];
        const conversation = {
          ...payload.conversation,
          latestMessage: payload,
        };
        const newConversation = [...state.conversations].filter(
          (c) => c._id !== conversation._id,
        );

        newConversation.unshift(conversation);
        state.conversations = newConversation;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  setActiveConversation,
  updateMessages,
  setOnlineUsers,
  addConversationTyping,
  removeConversationTyping,
  addFiles,
  clearFiles,
  removeFileByIndex,
} = chatSlice.actions;

export default chatSlice.reducer;
