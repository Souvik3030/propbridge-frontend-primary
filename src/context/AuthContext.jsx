import { useSessionQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useAcceptInvitationMutation, useForgotPasswordMutation, useResetPasswordMutation } from '../hooks/queries/useAuthQueries';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from './ToastContext';
import { useCallback } from 'react';

export const useAuth = () => {
  const { data: user, isLoading: isSessionLoading, refetch: syncProfile } = useSessionQuery();
  const { mutateAsync: loginMutation } = useLoginMutation();
  const { mutateAsync: logoutMutation } = useLogoutMutation();
  const { mutateAsync: registerMutation } = useRegisterMutation();
  const { mutateAsync: acceptInvitationMutation } = useAcceptInvitationMutation();
  const { mutateAsync: forgotPasswordMutation } = useForgotPasswordMutation();
  const { mutateAsync: resetPasswordMutation } = useResetPasswordMutation();
  
  const isImpersonating = useAuthStore(state => state.isImpersonating);
  const { addToast } = useToast();

  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    if (user.role?.toLowerCase() === 'superadmin') return true;
    if (!user.permissions) return false;
    return user.permissions.includes(permission);
  }, [user]);

    // Facade wrappers to convert comma-separated legacy parameters to React Query single-objects
  const login = async (email, password) => {
    try {
      await loginMutation({ email, password });
      await syncProfile();
      return true;
    } catch {
      return false;   
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (e) {
      console.warn("Logout error:", e);
    }
  };

  return {
    user,
    setUser: () => { console.warn("setUser is deprecated. State is managed by React Query."); },
    isAuthenticated: !!user,
    isImpersonating,
    initializing: isSessionLoading, 
    loading: false, 
    login,
    register: registerMutation,
    logout,
    acceptInvitation: acceptInvitationMutation,
    forgotPassword: forgotPasswordMutation,
    resetPassword: resetPasswordMutation,
    syncProfile,
    hasPermission,
    addToast,
  };
};

export const AuthProvider = ({ children }) => {
  return children;
};

