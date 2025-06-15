import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './services/authService';
import './styles.css';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('bp_token');
    fetch(`${process.env.REACT_APP_API_URL}/protected/hello`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.text();
      })
      .then(text => setMessage(text))
      .catch(() => navigate('/login', { replace: true }));
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="login-container">
      <h2>Dashboard</h2>
      <p>{message || 'Loading…'}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}