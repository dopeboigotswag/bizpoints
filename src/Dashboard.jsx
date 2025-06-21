import React, { useEffect }             from 'react';
import { useNavigate }                  from 'react-router-dom';
import { logout, getToken, getUsername } from './services/authService';
import './styles.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = getUsername();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // If there's no token, redirect to login
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="login-container">
      <h2>Dashboard</h2>
      <p>Hello, <strong>{username}</strong>!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
