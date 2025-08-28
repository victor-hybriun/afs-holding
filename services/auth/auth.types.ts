export type LoginPayload = { email: string; password: string };

export type LoginResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  obj: {
    jwtToken: string;
    expiration: string;
    refreshToken: string;
  } | null;
};
export type RefreshResponse = LoginResponse;
