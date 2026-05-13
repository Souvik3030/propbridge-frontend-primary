import { useSessionQuery } from './queries/useAuthQueries';

export const usePermission = (permissionName) => {
  const { data: user } = useSessionQuery();
  
  if (!user) return false;
  
  // Superadmins bypass all permission checks
  if (user.role?.toLowerCase() === 'superadmin') return true;
  
  if (!user.permissions) return false;
  
  return user.permissions.includes(permissionName);
};
