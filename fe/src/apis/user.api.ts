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
    }).then(res => res.json());
  }
};
