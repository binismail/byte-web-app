export type ErrorDataTypes = {
  status: string;
  statusCode: number;
  message: string;
};

export type LogoutUserType = {
  userId: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type ResetPasswordType = {
  password: string;
  emailCode: string;
};
