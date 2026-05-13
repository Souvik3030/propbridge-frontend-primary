import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  // `initializing` = one-time boot check. AppGate already blocks rendering
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
