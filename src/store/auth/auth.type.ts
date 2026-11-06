export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInWithTokenRequest {
  token: string;
  code: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  token: string;
}

export interface ResendCodeResponse {
  isComplete: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface SignInResponse {
  token: string;
}
export interface VerificationResponse {
  tokenPayload: TokenPayload;
  accessToken: string;
  profile: TokenPayload;
}

export enum RoleEnum {
  ADMIN = 'Admin',
  USER = 'User'
}

export interface AuthState {
  token: null | string;
  user: null | TokenPayload;
  captcha?: string;
  twoFaToken: null | string;
  passwordResetToken: null | string;
}

export interface SignInResponseError {
  response: ResponseError;
  status: number;
  message: string;
  name: string;
}

export interface ResponseError {
  message: string;
  isVerified: boolean;
}

export type TokenPayload = {
  id: string;
  email: string;
  fullname: string;
  phone: string;
  tgUserName?: string;
  whatsAppPhone?: string;
  role: RoleEnum;
};

export interface RegisterRequest {
  email: string;
  fullname: string;
  phone: string;
}

export interface ConfirmRegisterRequest {
  token: string;
  code: string;
}

export interface SetupFirstPassword {
  token: string;
  newPassword: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
