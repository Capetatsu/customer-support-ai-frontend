/**
 * Base API Configuration
 * Connects to Student 1's FastAPI backend when available, or falls back seamlessly to mock repository.
 */

export const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  'http://localhost:8000';

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  status: number;
}

// Global in-memory storage keys for token handling
const TOKEN_KEY = 'cs_auth_token';

export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setAuthToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
};

export const removeAuthToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
};
