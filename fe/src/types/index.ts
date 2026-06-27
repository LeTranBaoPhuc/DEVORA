export type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
  firstName?: string;
  lastName?: string;
};

export type ApiResponse<T = any> = {
  status: number;
  message: string;
  data: T;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  username: string;
};
