import { UserProfile } from '../types';
import { mockCurrentUser } from '../data/mockRepository';
import { getAuthToken, setAuthToken, removeAuthToken } from './api';

export const authService = {
  async login(username: string, _password: string): Promise<UserProfile> {
    // Simulates JWT authentication from Student 1: POST /auth/login
    const mockToken = `jwt_mock_token_${Date.now()}`;
    setAuthToken(mockToken);
    return {
      ...mockCurrentUser,
      username: username || mockCurrentUser.username,
    };
  },

  async register(username: string, email: string, _password: string): Promise<UserProfile> {
    // Simulates Student 1: POST /auth/register
    const mockToken = `jwt_mock_token_${Date.now()}`;
    setAuthToken(mockToken);
    return {
      id: Date.now(),
      username,
      email,
      role: 'Support Specialist',
      is_active: true,
    };
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const token = getAuthToken();
    if (!token) return mockCurrentUser; // Default operator session for demo ease
    return mockCurrentUser;
  },

  async logout(): Promise<void> {
    removeAuthToken();
  },
};
