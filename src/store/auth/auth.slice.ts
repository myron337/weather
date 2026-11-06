import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, TokenPayload } from "@/store/auth/auth.type";

const initialState: AuthState = {
  token: null,
  user: null,
  captcha: undefined,
  twoFaToken: null,
  passwordResetToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
    addTwoFaToken: (state, actions: PayloadAction<string>) => {
      state.twoFaToken = actions.payload;
    },
    addToken: (state, actions: PayloadAction<string>) => {
      state.token = actions.payload;
    },
    addPasswordResetToken: (state, actions: PayloadAction<string>) => {
      state.passwordResetToken = actions.payload;
    },
    addUser: (state, actions: PayloadAction<TokenPayload>) => {
      state.user = actions.payload;
    },
    setCaptcha: (state, actions: PayloadAction<string>) => {
      state.captcha = actions.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {
  clearToken,
  addToken,
  addUser,
  setCaptcha,
  addTwoFaToken,
  addPasswordResetToken,
} = authSlice.actions;
