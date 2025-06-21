import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken }              from './services/authService';

export default function PrivateRoute({ children }) {
  const token = getToken();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}