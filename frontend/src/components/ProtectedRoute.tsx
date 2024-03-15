import React, { ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    path: string;
  element: ReactElement;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element, isAuthenticated, ...rest }) => (
  <Route
    path={path}
    {...rest}
    element={isAuthenticated ? element : <Navigate to="/signin" replace />}
  />
);

export default ProtectedRoute;
