import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/apiClient';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';

// Caching Constants
const STALE_TIMES = {
  COMPANIES: 5 * 60 * 1000, // 5 minutes
  TEAM: 2 * 60 * 1000,      // 2 minutes
  SYSTEM: 24 * 60 * 60 * 1000, // 24 hours
  PERMISSIONS: 12 * 60 * 60 * 1000 // 12 hours
};

export const useCompanies = (page = 1) => {
  return useQuery({
    queryKey: ['admin', 'companies', { page }],
    queryFn: async () => {
      const response = await api.get('/auth/companies', { params: { page } });
      return {
        data: response.data || [],
        meta: response.meta || { current_page: 1, last_page: 1, total: 0 }
      };
    },
    placeholderData: (previousData) => previousData, // Smooth pagination transition
    staleTime: STALE_TIMES.COMPANIES,
  });
};

export const useCompany = (identifier, isId = false) => {
  return useQuery({
    queryKey: ['admin', 'company', identifier],
    queryFn: async () => {
      const endpoint = isId ? `/auth/companies/${identifier}` : '/auth/companies';
      const params = isId ? {} : { slug: identifier };
      
      const response = await api.get(endpoint, { params });
      const company = response.data?.[0] || response.data || response;
      if (!company) throw new Error('Company not found');
      return company;
    },
    enabled: !!identifier,
    staleTime: STALE_TIMES.COMPANIES,
  });
};

export const useCompanyInvitations = (companyId) => {
  return useQuery({
    queryKey: ['admin', 'company', companyId, 'invitations'],
    queryFn: () => api.get(`/auth/companies/${companyId}/invitations`),
    enabled: !!companyId,
    staleTime: STALE_TIMES.TEAM,
  });
};

export const useCompanyUsers = (companyId) => {
  return useQuery({
    queryKey: ['admin', 'company', companyId, 'users'],
    queryFn: () => api.get(`/auth/companies/${companyId}/users`),
    enabled: !!companyId,
    staleTime: STALE_TIMES.TEAM,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (companyData) => api.post('/auth/companies', companyData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });
      useToastStore.getState().addToast('Enterprise account created successfully', 'success');
    },
    onError: (error) => useToastStore.getState().addToast(error.message || 'Failed to create company', 'error'),
  });
};

export const useInviteAdmin = () => {
  return useMutation({
    mutationFn: (inviteData) => api.post('/auth/invitations', inviteData),
    onSuccess: () => useToastStore.getState().addToast('Invitation dispatched successfully', 'success'),
    onError: (error) => useToastStore.getState().addToast(error.message || 'Failed to send invitation', 'error'),
  });
};

export const useResendInvitation = () => {
  return useMutation({
    mutationFn: (invitationId) => api.post(`/auth/invitations/${invitationId}/resend`),
    onSuccess: () => useToastStore.getState().addToast('Invitation resent via email', 'success'),
    onError: (error) => useToastStore.getState().addToast(error.message || 'Failed to resend invitation', 'error'),
  });
};

export const useRevokeInvitation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invitationId) => api.delete(`/auth/invitations/${invitationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'company'] });
      // Toast handles locally in component currently, but can safely double up.
    }
  });
};

export const useToggleCompanyStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (companyId) => api.patch(`/auth/companies/${companyId}/toggle-status`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'company'] });
      useToastStore.getState().addToast('Company status updated globally', 'success');
    },
    onError: (error) => useToastStore.getState().addToast(error.message || 'Failed to update company status', 'error'),
  });
};

export const useSystemPlans = () => {
    return useQuery({
        queryKey: ['admin', 'system', 'plans'],
        queryFn: () => api.get('/auth/system/plans'),
        staleTime: STALE_TIMES.SYSTEM, // Rarely changes, cache aggressively
    });
};


export const useImpersonate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (targetUserId) => api.post(`/auth/impersonate/${targetUserId}`),
        onSuccess: (data) => {
            // Tell Zustand to activate God Mode flags
            useAuthStore.getState().setImpersonating(true);
            
            // Store the exact URL (including query params and hash tabs)
            const exactUrl = window.location.pathname + window.location.search + window.location.hash;
            sessionStorage.setItem('return_to_url', exactUrl);
            
            // Invalidate the auth session so the frontend immediately pulls the impersonated metadata
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
            window.location.href = '/dashboard';
        },
    });
};


export const useUpdateCompanyPlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ companyId, plan }) => api.patch(`auth/companies/${companyId}/plan`, { plan: plan.toLowerCase() }),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'company'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'companies'] });
            useToastStore.getState().addToast(`Company plan updated to ${variables.plan}`, 'success');
        },
        onError: (error) => useToastStore.getState().addToast(error.message || 'Failed to update plan', 'error'),
    });
};

export const useLeaveImpersonation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => api.post('/auth/impersonate/leave'),
        onSuccess: (data) => {
            // Restore Original Session
            useAuthStore.getState().setImpersonating(false);
            
            const rawUrl = sessionStorage.getItem('return_to_url');
            sessionStorage.removeItem('return_to_url');

            const isSafeRelativePath = rawUrl && /^\/(?!\/)/.test(rawUrl);
            const returnUrl = isSafeRelativePath ? rawUrl : '/dashboard';
            
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
            
            // Seamlessly transport the admin back to where they started the session
            window.location.href = returnUrl;
        },
    });
};


export const useToggleUserStatus = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (userId) => api.patch(`/auth/users/${userId}/toggle-status`),
        onSuccess: () => {
            // Invalidate company users list to reflect status change
            queryClient.invalidateQueries({ queryKey: ['admin', 'company'] });
        },
    });
};

export const usePermissions = () => {
    return useQuery({
        queryKey: ['admin', 'auth', 'permissions'],
        queryFn: async () => {
            const response = await api.get('/auth/permissions');
            return response; // response data is extracted by interceptor
        },
        staleTime: 12 * 60 * 60 * 1000, // 12 hours
    });
};
export const useUpdatePermissions = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ roleId, permissions }) => {
            const response = await api.post(`/auth/roles/${roleId}/permissions`, { permissions });
            return response;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'auth', 'permissions'] });
            useToastStore.getState().addToast(data?.message || 'Permissions updated and synchronized', 'success');
        },
        onError: (error) => {
            useToastStore.getState().addToast(error.message || 'Failed to update permissions', 'error');
        },
    });
};
