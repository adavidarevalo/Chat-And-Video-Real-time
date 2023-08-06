/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../actions/user.actions';

interface InitialState {
  status: string;
  error: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    token: string;
  } | null;
}

const initialState: InitialState = {
  user: null,
  status: '',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.status = '';
      state.error = '';
    },
    changeStatus: (state, actions) => {
      state.status = actions.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export const { changeStatus, logout } = userSlice.actions;

export default userSlice.reducer;
