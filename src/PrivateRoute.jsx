import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('bp_token');
  const location = useLocation();

  if (!token) {
    // Redirect to /login, preserving the current location
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
// This component checks if the user is authenticated by looking for a token in localStorage.