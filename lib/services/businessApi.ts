import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import {
  RegisterProps,
  SendOtpProps,
  VerifyNumberProps,
} from '../../pages/auth/register/register.types';
import baseUrl from '../endpoints.json';
import { logout, setNewTokenCredentials } from '../redux/authSlice/authSlice';
import { AppState } from '../redux/store';

// create a new mutex
const mutex = new Mutex();

// Define baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl.url,
  timeout: 1500 * 60,
  prepareHeaders: (headers, { getState, endpoint }) => {
    // getting access token from store
    const token = (getState() as AppState).auth.accessToken;

    if (token && endpoint !== 'refresh') {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  // credentials: 'include', // This allows server to set cookies
});

// Define baseQueryWithReauth
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  // getting result
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // try to get a new token
        const refreshToken = (api.getState() as AppState).auth.refreshToken;

        const refreshResult = await baseQuery(
          {
            url: baseUrl.authentication.refreshToken,
            method: 'POST',
            body: { refreshToken: refreshToken ?? '' },
          },
          {
            ...api,
            endpoint: 'refresh',
          },
          extraOptions
        );

        // checking for response
        const response = refreshResult.data as any;
        if (response) {
          // store the new token
          api.dispatch(setNewTokenCredentials({ ...response.result.data }));

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// Business Api Definition
export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AuthUser'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: baseUrl.authentication.login,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AuthUser'],
    }),
    sendOTP: builder.mutation<any, SendOtpProps>({
      query: (body: SendOtpProps) => {
        return {
          url: baseUrl.authentication.verifyPhoneNumber,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AuthUser'],
    }),
    verifyNumber: builder.mutation<any, VerifyNumberProps>({
      query: (body: VerifyNumberProps) => {
        return {
          url: baseUrl.verification.termii,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AuthUser'],
    }),
    register: builder.mutation<any, RegisterProps>({
      query: (body: RegisterProps) => ({
        url: baseUrl.authentication.register,
        method: 'POST',
        body: {
          name: body.businessName,
          email: body.email,
          phone: body.phone,
          password: body.password,
          administrator: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
          },
        },
      }),
      invalidatesTags: ['AuthUser'],
    }),
    logout: builder.mutation<any, { userId: string }>({
      query: (body: { userId: string }) => {
        return {
          url: baseUrl.authentication.logout,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AuthUser'],
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body: { email: string }) => {
        return {
          url: baseUrl.authentication.forgotBizPassword,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AuthUser'],
    }),
    resetPassword: builder.mutation<
      any,
      {
        password: string;
        emailCode: string;
      }
    >({
      query: (body: { password: string; emailCode: string }) => {
        return {
          url: `${baseUrl.authentication.resetPassword}/${body.emailCode}`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AuthUser'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useSendOTPMutation,
  useVerifyNumberMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = businessApi;
