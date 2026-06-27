import { http } from '@/lib/http';

export const authApi = {
  login: (data: any) => http<any>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  googleLogin: (data: any) => http<any>('/api/auth/google-login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  register: (data: any) => http<any>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  logout: () => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
    return http<any>('/api/auth/logout', {
      method: 'POST',
      headers: refreshToken ? { 'X-Refresh-Token': refreshToken } : undefined,
    });
  },

  verifyRegister: (verifyCode: string) => http<any>(`/api/auth/verify-register?verifyCode=${verifyCode}`, {
    method: 'POST',
  }),

  forgotPassword: (data: any) => http<any>('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  resetPassword: (token: string, data: any) => http<any>(`/api/auth/reset-password?token=${token}`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  refreshToken: () => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
    return http<any>('/api/auth/refresh-token', {
      method: 'POST',
      headers: refreshToken ? { 'X-Refresh-Token': refreshToken } : undefined,
    });
  },
};
