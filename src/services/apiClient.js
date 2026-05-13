import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

// Global Event Bus Constants
export const API_EVENTS = {
  SESSION_EXPIRED: 'session-expired',
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

let csrfPromise = null;
const ensureCsrf = async () => {
  if (csrfPromise) return csrfPromise;
  
  csrfPromise = (async () => {
    try {
      await axios.get(`${window.location.origin}/sanctum/csrf-cookie`, { withCredentials: true });
    } catch (err) {
      console.error('[API] CSRF initialization failed', err);
      csrfPromise = null; // Reset to retry on next attempt
      throw err;
    }
  })();
  
  return csrfPromise;
};

apiClient.interceptors.request.use(
  async (config) => {
    // Automatically trigger CSRF for state-changing methods
    const method = config.method?.toLowerCase();
    if (['post', 'put', 'patch', 'delete'].includes(method)) {
      await ensureCsrf();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    
    // Extract the most descriptive message available
    let message = data?.message || error.message || 'Something went wrong';
    
    // If it's a validation error (422) and has an 'errors' object, pick the first one
    if (status === 422 && data?.errors) {
      const firstErrorKey = Object.keys(data.errors)[0];
      if (firstErrorKey && Array.isArray(data.errors[firstErrorKey]) && data.errors[firstErrorKey].length > 0) {
        message = data.errors[firstErrorKey][0];
      }
    }
    
    // Globally handle unauthenticated access (401) or expired sessions (419)
    if (status === 401 || status === 419) {
      console.warn(`[API] ${status} - Session invalid. Clearing local state.`);
      
      csrfPromise = null;
      
      // Atomic state wipe
      useAuthStore.getState().clearAuth();
      localStorage.removeItem('auth_user');
      sessionStorage.clear();
      
      // Dispatch a soft-redirect event for the Router to pick up (prevents harsh HTML reload)
      window.dispatchEvent(new CustomEvent(API_EVENTS.SESSION_EXPIRED));
    }

    return Promise.reject({
      status,
      message,
      data,
      originalError: error
    });
  }
);

const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
  request: (config) => apiClient(config),
};

export default api;
