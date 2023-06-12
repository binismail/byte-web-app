import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';

// Type for our state
export interface AuthState {
  loggedIn: boolean;
  userId: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

// Initial state
const initialState: AuthState = {
  loggedIn: false,
  userId: '',
  role: '',
  accessToken: '',
  refreshToken: '',
};

// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<AuthState>) {
      return {
        ...state,
        ...payload,
      };
    },
    logout(state) {
      state.userId = '';
      state.role = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

// Actions
export const { setCredentials, logout } = authSlice.actions;

// Selectors
export const selectLoggedIn = (state: AppState) => state.auth.loggedIn;
export const selectRole = (state: AppState) => state.auth.role;
export const selectRefreshToken = (state: AppState) => state.auth.refreshToken;
export const selectAccessToken = (state: AppState) => state.auth.accessToken;
export const selectUserId = (state: AppState) => state.auth.userId;

// Reducer
export default authSlice.reducer;
