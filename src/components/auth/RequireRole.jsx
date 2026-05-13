import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireRole = ({ roles, children, redirectTo = '/dashboard' }) => {
  const { user, initializing } = useAuth();

  if (initializing) return null;

  // Not authenticated at all
  if (!user) return <Navigate to="/login" replace />;

  const userRole = user.role?.toLowerCase() ?? '';

  // Check if the user's role is in the permitted list
  if (!roles.map(r => r.toLowerCase()).includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RequireRole;
