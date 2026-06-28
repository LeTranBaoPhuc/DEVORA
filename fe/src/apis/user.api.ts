import { http } from '@/lib/http';

export const userApi = {
  getProfile: () => http<any>('/api/users/profile', {
    method: 'GET',
  }),

  updateProfile: (data: any) => http<any>('/api/users', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  changePassword: (data: any) => http<any>('/api/users/change-password', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  uploadAvatar: (formData: FormData) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const headers = new Headers();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/users/upload-avatar`, {
      method: 'PATCH',
      headers,
      body: formData,
    }).then(async res => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      return data;
    });
  },

  sendEmailOtp: (data: { newEmail: string }) => http<any>('/api/users/profile/email-otp/send', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  verifyEmailOtp: (data: { otp: string, newEmail: string }) => http<any>('/api/users/profile/email-otp/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
};
