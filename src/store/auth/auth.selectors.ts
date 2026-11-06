import type { RootState } from "@/store/store";

export const selectAuthState = (state: RootState) => state.auth;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthCaptcha = (state: RootState) => state.auth.captcha;
export const selectTwoFaToken = (state: RootState) => state.auth.twoFaToken;
export const selectPasswordResetToken = (state: RootState) =>
  state.auth.passwordResetToken;
