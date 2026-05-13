import { useToastStore } from '../stores/useToastStore';

export const useNotifications = () => {
  return useToastStore();
};

// Aliases for backward compatibility
export const useToast = useNotifications;

// Deprecated Provider that passes through children cleanly
export const NotificationProvider = ({ children }) => {
  return children;
};

