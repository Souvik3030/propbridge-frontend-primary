import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/apiClient';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToast } from '../../context/NotificationContext';

export const useSessionQuery = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/me');
        const serverData = response.data || response;
        if (!serverData) return null;

        return {
          ...serverData,
          role: (serverData.role || 'user').toLowerCase(),
          permissions: serverData.permissions || []
        };
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          // User is not authenticated yet: treat as empty session instead of a fatal error.
          useAuthStore.getState().clearAuth();
          localStorage.removeItem('auth_user'); // Legacy cleanup
          return null;
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      await api.post('/auth/login', { email, password });
    },
    onSuccess: () => {
      addToast('Welcome back!', 'success');
      // Invalidate the session query to immediately fetch the user
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
    onError: (error) => {
      addToast(error.message || 'Login failed', 'error');
    }
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      useAuthStore.getState().clearAuth();
      localStorage.removeItem('auth_user');
      sessionStorage.clear();
      queryClient.setQueryData(['auth', 'me'], null); // Clear the cache
      addToast('Logged out successfully', 'success');
    },
    onError: (error) => {
      // Force logout on client side anyway if API fails
      useAuthStore.getState().clearAuth();
      queryClient.setQueryData(['auth', 'me'], null);
      addToast('Logged out, but encountered an error on the server.', 'warning');
    }
  });
};

export const useRegisterMutation = () => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      throw new Error(
        'Self-registration is not permitted. Please use your invitation link to register.'
      );
    },
    onError: (error) => {
      addToast(error.message || 'Registration is not available.', 'error');
    },
  });
}

export const useAcceptInvitationMutation = () => {
  const { addToast } = useToast();
  return useMutation({
    mutationFn: async (payload) => {
      return await api.post('/auth/register', payload);
    },
    onSuccess: () => {
      addToast('Registration successful! Welcome aboard.', 'success');
    },
    onError: (error) => {
      addToast(error.message || 'Error accepting invitation', 'error');
    }
  });
};

export const useForgotPasswordMutation = () => {
  const { addToast } = useToast();
  return useMutation({
    mutationFn: async (email) => {
      return await api.post('/auth/forgot-password', { email });
    },
    onError: (error) => {
      addToast(error.message || 'Failed to send password reset email', 'error');
    }
  });
};

export const useResetPasswordMutation = () => {
  const { addToast } = useToast();
  return useMutation({
    mutationFn: async (payload) => {
      return await api.post('/auth/reset-password', payload);
    },
    onError: (error) => {
      addToast(error.message || 'Failed to reset password', 'error');
    }
  });
};
