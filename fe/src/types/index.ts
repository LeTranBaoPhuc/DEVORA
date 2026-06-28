export type User = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
  firstName?: string;
  lastName?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
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
