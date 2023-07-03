import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store';

// Type for our state
type UserDetailsType = {
  location: {
    city: string | null;
    state: string | null;
    country: string | null;
  };
  administrator: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string | null;
    identityImageUrl: string | null;
    isBvnVerified: boolean;
  };
  username: string | null;
  address: string | null;
  image: string | null;
  description: string | null;
  category: string | null;
  type: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isOnboarded: boolean;
  isApproved: boolean;
  isRegistered: boolean;
  kycLevel: number;
  QRCode: string | null;
  [key: string | number | symbol]: unknown;
};

// Initial state
const initialState: UserDetailsType = {
  location: {
    city: null,
    state: null,
    country: null,
  },
  administrator: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: null,
    identityImageUrl: null,
    isBvnVerified: false,
  },
  username: null,
  address: null,
  image: null,
  description: null,
  category: null,
  type: '',
  isEmailVerified: false,
  isPhoneVerified: false,
  isOnboarded: false,
  isApproved: false,
  isRegistered: false,
  kycLevel: 0,
  QRCode: null,
};

// Actual Slice
export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails(_, { payload }: PayloadAction<UserDetailsType>) {
      return {
        ...payload,
      };
    },
    clearUserDetails: () => initialState,
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
export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;

// Selectors
export const selectUserDetails = (state: AppState) => state.userDetails;

// Reducer
export default userDetailsSlice.reducer;
