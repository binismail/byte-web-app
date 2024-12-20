import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { businessApi } from '../services/businessApi';
import { authSlice } from './authSlice/authSlice';
import { userDetailsSlice } from './userDetailsSlice/userDetailsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [authSlice.name, userDetailsSlice.name],
  version: 1,
};

// combining reducers
const rootReducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [businessApi.reducerPath]: businessApi.reducer,
  [userDetailsSlice.name]: userDetailsSlice.reducer,
});

// persisted reducers
const persistedReducer = persistReducer(persistConfig, rootReducers);

// store definition
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(businessApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// (setupListener) required for refetchOnFocus/refetchOnReconnect behaviors
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
