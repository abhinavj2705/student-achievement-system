// c:\Users\Abhin\Desktop\stds-backend\frontend\src\lib\api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = true, headers, ...customConfig } = options;
  
  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (requireAuth) {
    // Determine if we are in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Parse JSON safely
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      if (response.status === 401 && typeof window !== 'undefined') {
        // Handle unauthorized (e.g., clear token, redirect to login)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      throw new ApiError(
        response.status,
        data?.message || response.statusText || 'An API error occurred',
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network errors
    throw new Error('Network error. Please check your connection.');
  }
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) => 
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchApi<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  
  put: <T>(endpoint: string, body: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchApi<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  
  patch: <T>(endpoint: string, body: any, options?: Omit<FetchOptions, 'method' | 'body'>) => 
    fetchApi<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  
  delete: <T>(endpoint: string, options?: Omit<FetchOptions, 'method'>) => 
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),

  // For file uploads
  upload: <T>(endpoint: string, formData: FormData, options?: Omit<FetchOptions, 'method' | 'body'>) => {
    const { headers, ...rest } = options || {};
    // Don't set Content-Type for FormData, the browser will set it with the boundary
    return fetchApi<T>(endpoint, {
      ...rest,
      method: 'POST',
      body: formData as any,
      headers: { ...headers, 'Content-Type': undefined as any },
    });
  }
};
