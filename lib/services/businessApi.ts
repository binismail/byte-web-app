import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  RegisterProps,
  SendOtpProps,
  VerifyNumberProps,
} from '../../pages/auth/register/register.types';
import baseUrl from '../endpoints.json';

export const businessApi = createApi({
  reducerPath: 'businessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl.url,
    timeout: 1500 * 60,
  }),
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useSendOTPMutation,
  useVerifyNumberMutation,
} = businessApi;
