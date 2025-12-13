import api from '../../lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  forcePasswordReset?: boolean;

  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };

  token?: string;

  userId?: string;
  email?: string;
}

export interface RequestPasswordResetResponse {
  message: string;
}

export interface ResetPasswordPayload {
  userId: string;
  newPassword: string;
}


export const authService = {
  // LOGIN
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  async requestPasswordReset(
    email: string
  ): Promise<RequestPasswordResetResponse> {
    const response = await api.post<RequestPasswordResetResponse>(
      '/auth/request-password-reset',
      { email }
    );
    return response.data;
  },

  async resetPassword(
    payload: ResetPasswordPayload
  ): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(
      '/auth/reset-password',
      payload
    );
    return response.data;
  },
};
