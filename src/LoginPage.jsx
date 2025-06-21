import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from './services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showPassword, setShowPassword]       = useState(false);
  const [registeredData, setRegisteredData]   = useState({ username: '', email: '' });
  const [formData, setFormData]               = useState({ email: '', password: '' });
  const [fieldValidity, setFieldValidity]     = useState({ email: false, password: false });
  const [error, setError]                     = useState('');
  const emailRef                              = useRef(null);
  const formRef                               = useRef(null);

  // Show banner if redirected from registration
  useEffect(() => {
    if (location.state?.fromRegistration) {
      setShowSuccessBanner(true);
      setRegisteredData({
        username: location.state.registeredUsername,
        email:    location.state.registeredEmail
      });
      setFormData(f => ({ ...f, email: location.state.registeredEmail }));
      // clear the state so banner only shows once
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Email validation
  useEffect(() => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    setFieldValidity(f => ({ ...f, email: valid }));
    if (emailRef.current) {
      emailRef.current.setCustomValidity(valid ? '' : 'Enter a valid email');
    }
  }, [formData.email]);

  // Password length validation
  useEffect(() => {
    const valid = formData.password.length >= 8;
    setFieldValidity(f => ({ ...f, password: valid }));
  }, [formData.password]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Native HTML5 check
    let nativeOk = true;
    formRef.current.querySelectorAll('input').forEach(inp => {
      inp.setCustomValidity('');
      if (!inp.checkValidity()) {
        inp.reportValidity();
        nativeOk = false;
      }
    });
    if (!nativeOk) return;

    // Programmatic check
    if (!Object.values(fieldValidity).every(Boolean)) return;

    try {
      await login({ email: formData.email, password: formData.password });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const isFormValid = Object.values(fieldValidity).every(Boolean);

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
          className={fieldValidity.email ? 'valid-input' : ''}
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
            className={fieldValidity.password ? 'valid-input' : ''}
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
        {formData.password && !fieldValidity.password && (
          <p className="error-message">Password must be at least 8 characters</p>
        )}

        <button
          type="submit"
          className={isFormValid ? 'valid-submit' : ''}
          disabled={!isFormValid}
        >
          Login
        </button>

        <p className="register">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
