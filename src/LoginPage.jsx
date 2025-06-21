import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from './services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registeredData, setRegisteredData] = useState({ username: '', email: '' });
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validity, setValidity] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const emailRef = useRef(null);
  const formRef = useRef(null);

  // Show banner if redirected from registration
  useEffect(() => {
    if (location.state?.fromRegistration) {
      setShowSuccessBanner(true);
      setRegisteredData({
        username: location.state.registeredUsername,
        email: location.state.registeredEmail
      });
      setFormData(f => ({ ...f, email: location.state.registeredEmail }));
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Validate email format
  useEffect(() => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    emailRef.current.setCustomValidity(ok ? '' : 'Enter a valid email');
    setValidity(v => ({ ...v, email: ok }));
  }, [formData.email]);

  // Validate password length
  useEffect(() => {
    setValidity(v => ({ ...v, password: formData.password.length >= 8 }));
  }, [formData.password]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitted(true);

    // Native validation for tooltips
    let nativeOk = true;
    formRef.current.querySelectorAll('input').forEach(i => {
      i.setCustomValidity('');
      if (!i.checkValidity()) {
        i.reportValidity();
        nativeOk = false;
      }
    });
    if (!nativeOk) return;

    // Our custom check
    if (!validity.email || !validity.password) return;

    try {
      await login({ email: formData.email, password: formData.password });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  // helper for input classes
  const cls = valid =>
    valid
      ? 'valid-input'
      : submitted
        ? 'invalid-input'
        : '';

  return (
    <div className="login-container">
      {showSuccessBanner && (
        <div className="success-banner">
          Registration successful! Please login with your new credentials.
          <div className="registered-info">
            <div>Username: <strong>{registeredData.username}</strong></div>
            <div>Email:    <strong>{registeredData.email}</strong></div>
          </div>
        </div>
      )}

      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <input
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={cls(validity.email)}
        />

        <div className="form-group password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password (min 8 chars)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className={cls(validity.password)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className={validity.email && validity.password ? 'valid-submit' : ''}
        >
          Login
        </button>

        <p className="register">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}