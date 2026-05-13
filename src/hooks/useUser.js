import { useSessionQuery } from './queries/useAuthQueries';

export const useUser = () => {
  const { data: user, isLoading, isError, error } = useSessionQuery();
  
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    error,
  };
};
