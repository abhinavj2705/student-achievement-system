import { api } from '@/lib/api';
import { User } from '@/types';

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // For now, this points to a placeholder endpoint
    // In reality, this will hit POST /api/auth/login
    return api.post<LoginResponse>('/auth/login', { email, password }, { requireAuth: false });
  },

  getCurrentUser: async (): Promise<User> => {
    return api.get<User>('/auth/me');
  },
};
