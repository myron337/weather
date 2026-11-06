'use client';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ConfirmRegisterRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  IUpdatePassword,
  PasswordResetRequest,
  RegisterRequest,
  ResendCodeResponse,
  SetupFirstPassword,
  SignInRequest,
  SignInResponse,
  SignInWithTokenRequest,
  TokenPayload,
  VerificationResponse
} from '@/store/auth/auth.type';
import { baseQueryWithAuth } from '@/store/queries/query-with-auth';

export interface IPagination {
  skipPages: number;
  pageSize: number;
}

export interface CustomerDataResponse {
  data: CustomerData[];
  count: number;
}

export interface CustomerData {
  id?: number;
  name: number;
  surname: number;
  gender: GenderEnum;
}

export enum GenderEnum {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: `auth/login-token`,
        method: 'POST',
        body
      })
    }),

    signInWithToken: builder.mutation<
      VerificationResponse,
      SignInWithTokenRequest
    >({
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body
      })
    }),

    signUp: builder.mutation<SignInResponse, RegisterRequest>({
      query: (body) => ({
        url: `auth/register`,
        method: 'POST',
        body
      })
    }),

    confirmRegister: builder.mutation<SignInResponse, ConfirmRegisterRequest>({
      query: (body) => ({
        url: `auth/confirm-register`,
        method: 'POST',
        body
      })
    }),

    setupFirstPassword: builder.mutation<
      VerificationResponse,
      SetupFirstPassword
    >({
      query: (body) => ({
        url: `auth/setup-password`,
        method: 'POST',
        body
      })
    }),
    updatePassword: builder.mutation<TokenPayload, IUpdatePassword>({
      query: (body) => ({
        url: `user/password`,
        method: 'PATCH',
        body
      })
    }),
    recoverPassword: builder.mutation<
      ForgotPasswordResponse,
      PasswordResetRequest
    >({
      query: (body) => ({
        url: 'user/recover-password',
        method: 'POST',
        body
      })
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: `user/password-reset-token`,
        method: 'PATCH',
        body
      })
    }),

    resendCode: builder.mutation<ResendCodeResponse, SignInResponse>({
      query: (body) => ({
        url: `auth/resend-code`,
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useConfirmRegisterMutation,
  useForgotPasswordMutation,
  useRecoverPasswordMutation,
  useSignInWithTokenMutation,
  useSetupFirstPasswordMutation,
  useResendCodeMutation,
  useUpdatePasswordMutation
} = authApi;
