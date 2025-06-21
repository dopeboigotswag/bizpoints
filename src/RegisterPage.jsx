import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { register } from './services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [validity, setValidity] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  const formRef = useRef(null);
  const emailRef = useRef(null);
  const confirmRef = useRef(null);
  const termsRef = useRef(null);

  // Validate username ≥ 5 chars
  useEffect(() => {
    setValidity(v => ({
      ...v,
      username: formData.username.trim().length >= 5,
    }));
  }, [formData.username]);

  // Validate email format
  useEffect(() => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    emailRef.current.setCustomValidity(ok ? '' : 'Enter a valid email');
    setValidity(v => ({ ...v, email: ok }));
  }, [formData.email]);

  // Validate password ≥ 8 chars
  useEffect(() => {
    setValidity(v => ({
      ...v,
      password: formData.password.length >= 8,
    }));
  }, [formData.password]);

  // Validate confirmPassword matches
  useEffect(() => {
    const match = formData.password === formData.confirmPassword && formData.confirmPassword !== '';
    confirmRef.current.setCustomValidity(match ? '' : "Passwords don't match");
    setValidity(v => ({ ...v, confirmPassword: match }));
  }, [formData.password, formData.confirmPassword]);

  // Validate terms checkbox
  useEffect(() => {
    termsRef.current.setCustomValidity(formData.terms ? '' : 'You must accept the terms');
    setValidity(v => ({ ...v, terms: formData.terms }));
  }, [formData.terms]);

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setFormData(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSubmitted(true);

    // Native validation for browser tooltips
    let nativeOk = true;
    formRef.current.querySelectorAll('input').forEach(i => {
      i.setCustomValidity('');
      if (!i.checkValidity()) {
        i.reportValidity();
        nativeOk = false;
      }
    });
    if (!nativeOk) return;

    // Our custom validity map
    if (!Object.values(validity).every(Boolean)) {
      return;
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login', {
        replace: true,
        state: {
          fromRegistration: true,
          registeredUsername: formData.username,
          registeredEmail: formData.email,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Helper to choose input class after submit
  const cls = valid =>
    valid
      ? 'valid-input'
      : submitted
        ? 'invalid-input'
        : '';

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      {error && <p className="error-message">{error}</p>}

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* Username */}
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username (min 5 chars)"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={5}
            className={cls(validity.username)}
          />
          {submitted && !validity.username && (
            <p className="error-message">Username must be at least 5 characters</p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
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
          {submitted && !validity.email && (
            <p className="error-message">Enter a valid email address</p>
          )}
        </div>

        {/* Password */}
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
            aria-label="toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {submitted && !validity.password && (
          <p className="error-message">Password must be at least 8 characters</p>
        )}

        {/* Confirm Password */}
        <div className="form-group password-container">
          <input
            ref={confirmRef}
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={cls(validity.confirmPassword)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword(v => !v)}
            aria-label="toggle password visibility"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {submitted && !validity.confirmPassword && (
          <p className="error-message">Passwords don’t match</p>
        )}

        {/* Terms */}
        <div className={`form-group checkbox-group ${validity.terms ? 'valid-terms' : ''}`}>
          <label>
            <input
              ref={termsRef}
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />{' '}
            I agree to the <Link to="/terms">Terms & Conditions</Link>
          </label>
        </div>
        {submitted && !validity.terms && (
          <p className="error-message">You must accept the terms</p>
        )}

        <button
          type="submit"
          className={Object.values(validity).every(v => v) ? 'valid-submit' : ''}
        >
          Register
        </button>
      </form>
    </div>
  );
}