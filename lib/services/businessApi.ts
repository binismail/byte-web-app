import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { objectToFormData } from '../../helpers/object-to-formdata';
import {
  RegisterProps,
  SendOtpProps,
  VerifyNumberProps,
} from '../../pages/auth/register/register.types';
import {
  FundWalletDetailTypes,
  MakePaymentTypes,
  ResolveBankType,
} from '../../pages/dashboard/home/home.types';
import { UpdateInventoryType } from '../../pages/dashboard/tools/inventory-management/inventory.types';
import baseUrl from '../endpoints.json';
import { logout, setNewTokenCredentials } from '../redux/authSlice/authSlice';
import { AppState } from '../redux/store';
import {
  ErrorDataTypes,
  ForgotPasswordType,
  LogoutUserType,
  ResetPasswordType,
} from './business-api.types';

// create a new mutex
const mutex = new Mutex();

// Define baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl.prodUrl,
  timeout: 1500 * 60,
  prepareHeaders: (headers, { getState, endpoint }) => {
    // getting access token from store
    const token: string = (getState() as AppState).auth.accessToken;

    if (token && endpoint !== 'refresh') {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
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
  if (
    result.error &&
    result.error.status === 401 &&
    (result.error.data as ErrorDataTypes).message ===
      'Access denied! Please log in again'
  ) {
    console.log(result);
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
  tagTypes: [
    // 'AuthUser',
    // 'Banks',
    // 'BankAccount',
    // 'Send Money',
    // 'VirtualBank',
    // 'Wallet',
    // 'User Information',
    // 'FundWallet',
    'Inventory',
  ],
  endpoints: (builder) => ({
    // GET USER INFORMATION
    getUserInformation: builder.query<any, void>({
      query: () => baseUrl.business.getBusinessDetails,
    }),

    // PAYMENT/TRANSFER MONEY TO BANK
    getBanks: builder.query<any, void>({
      query: () => baseUrl.verification.retrieveBanks,
    }),
    confirmBankAccount: builder.query<any, ResolveBankType>({
      query: (body: ResolveBankType) => ({
        url: baseUrl.verification.resolveBankAccount,
        method: 'POST',
        body,
      }),
    }),
    makePayment: builder.mutation<any, MakePaymentTypes>({
      query: (body: MakePaymentTypes) => ({
        url: baseUrl.businessPayment.withdrawToNonLinkedBank,
        method: 'POST',
        body,
      }),
    }),

    // WALLET
    getWalletInfo: builder.query<any, void>({
      query: () => baseUrl.businessPocket.getWallet,
    }),
    getVirtualBank: builder.query<any, void>({
      query: () => baseUrl.businessPocket.getVirtualAccount,
    }),
    fundWallet: builder.mutation<any, FundWalletDetailTypes>({
      query: (body: FundWalletDetailTypes) => ({
        url: baseUrl.businessPayment.fundCard,
        method: 'POST',
        body,
      }),
    }),

    // AUTHENTICATION
    login: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: baseUrl.authentication.login,
          method: 'POST',
          body,
        };
      },
    }),
    sendOTP: builder.mutation<any, SendOtpProps>({
      query: (body: SendOtpProps) => {
        return {
          url: baseUrl.authentication.verifyPhoneNumber,
          method: 'POST',
          body,
        };
      },
    }),
    verifyNumber: builder.mutation<any, VerifyNumberProps>({
      query: (body: VerifyNumberProps) => {
        return {
          url: baseUrl.verification.termii,
          method: 'POST',
          body,
        };
      },
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
    }),
    logoutUser: builder.mutation<any, LogoutUserType>({
      query: (body: LogoutUserType) => {
        return {
          url: baseUrl.authentication.logout,
          method: 'POST',
          body,
        };
      },
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordType>({
      query: (body: ForgotPasswordType) => {
        return {
          url: baseUrl.authentication.forgotBizPassword,
          method: 'POST',
          body,
        };
      },
    }),
    resetPassword: builder.mutation<any, ResetPasswordType>({
      query: (body: ResetPasswordType) => {
        return {
          url: `${baseUrl.authentication.resetPassword}/${body.emailCode}`,
          method: 'POST',
          body,
        };
      },
    }),

    // INVENTORY
    getInventories: builder.query<any, void>({
      query: () => baseUrl.business.inventory,
      providesTags: ['Inventory'],
    }),
    getSingleInventory: builder.query<any, string>({
      query: (productId: string) =>
        `${baseUrl.business.inventory}/${productId}`,
      providesTags: ['Inventory'],
      // providesTags: (result, error, arg) => {
      //   return [{ type: 'Inventory', id: arg }];
      // },
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (productId: string) => ({
        url: `${baseUrl.business.inventory}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
      // invalidatesTags: (result, error, arg) => {
      //   return [{ type: 'Inventory', id: arg }];
      // },
    }),
    createInventory: builder.mutation<any, any>({
      query: (body: any) => {
        // convert body to formData
        const bodyFormData = objectToFormData(body);

        // return request payload
        return {
          url: baseUrl.business.inventory,
          method: 'POST',
          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ['Inventory'],
    }),
    updateInventory: builder.mutation<
      any,
      { data: UpdateInventoryType; productId: string }
    >({
      query: (body: { data: UpdateInventoryType; productId: string }) => {
        // convert body to formData
        const bodyFormData = objectToFormData(body.data);

        // return request payload
        return {
          url: `${baseUrl.business.inventory}/${body.productId}`,
          method: 'PUT',
          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ['Inventory'],
    }),
    updateProductQuantity: builder.mutation<
      any,
      { productId: string; quantity: number }
    >({
      query: (body: { productId: string; quantity: number }) => ({
        url: `${baseUrl.business.inventory}/${body.productId}/updateProductQuantity`,
        method: 'PUT',
        body: {
          quantity: body.quantity,
        },
      }),
      invalidatesTags: ['Inventory'],
    }),
    updateProductSalesCount: builder.mutation<
      any,
      { productId: string; salesAmount: number }
    >({
      query: (body: { productId: string; salesAmount: number }) => ({
        url: `${baseUrl.business.inventory}/updateProductsStock`,
        method: 'PUT',
        body: {
          salesData: [[`${body.productId}`, body.salesAmount]],
        },
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutUserMutation,
  useSendOTPMutation,
  useVerifyNumberMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetBanksQuery,
  useConfirmBankAccountQuery,
  useMakePaymentMutation,
  useGetVirtualBankQuery,
  useGetUserInformationQuery,
  useGetWalletInfoQuery,
  useFundWalletMutation,
  useGetInventoriesQuery,
  useGetSingleInventoryQuery,
  useDeleteProductMutation,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useUpdateProductQuantityMutation,
  useUpdateProductSalesCountMutation,
} = businessApi;
