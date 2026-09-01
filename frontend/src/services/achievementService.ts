import { api } from '@/lib/api';
import { Achievement } from '@/types';

export const achievementService = {
  getAll: async (params?: Record<string, string>): Promise<Achievement[]> => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return api.get<Achievement[]>(`/achievements${queryString}`);
  },

  getById: async (id: string): Promise<Achievement> => {
    return api.get<Achievement>(`/achievements/${id}`);
  },

  create: async (data: Partial<Achievement>): Promise<Achievement> => {
    return api.post<Achievement>('/achievements', data);
  },

  update: async (id: string, data: Partial<Achievement>): Promise<Achievement> => {
    return api.put<Achievement>(`/achievements/${id}`, data);
  },
  
  // Custom action for workflow
  submitForReview: async (id: string): Promise<Achievement> => {
    return api.post<Achievement>(`/achievements/${id}/submit`, {});
  },

  review: async (id: string, action: 'APPROVE' | 'REJECT' | 'REQUEST_REVISION', feedback?: string): Promise<Achievement> => {
    return api.post<Achievement>(`/achievements/${id}/review`, { action, feedback });
  }
};
