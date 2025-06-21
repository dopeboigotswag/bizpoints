import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate }                from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash }                 from 'react-icons/fa';
import { register }                          from './services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword]             = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError]                           = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [fieldValidity, setFieldValidity] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  const formRef            = useRef(null);
  const emailRef           = useRef(null);
  const confirmPasswordRef = useRef(null);
  const termsRef           = useRef(null);

  // Username ≥ 5 chars
  useEffect(() => {
    setFieldValidity(v => ({
      ...v,
      username: formData.username.trim().length >= 5,
    }));
  }, [formData.username]);

  // Email format
  useEffect(() => {
    if (!formData.email) return;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    emailRef.current.setCustomValidity(valid ? '' : 'Enter a valid email');
    setFieldValidity(v => ({ ...v, email: valid }));
  }, [formData.email]);

  // Password ≥ 8 chars
  useEffect(() => {
    setFieldValidity(v => ({
      ...v,
      password: formData.password.length >= 8,
    }));
  }, [formData.password]);

  // Confirm matches password
  useEffect(() => {
    if (!formData.confirmPassword) return;
    const input = confirmPasswordRef.current;
    if (formData.password !== formData.confirmPassword) {
      input.setCustomValidity("Passwords don't match");
      setFieldValidity(v => ({ ...v, confirmPassword: false }));
    } else {
      input.setCustomValidity('');
      setFieldValidity(v => ({ ...v, confirmPassword: true }));
    }
  }, [formData.password, formData.confirmPassword]);

  // Terms checkbox
  useEffect(() => {
    termsRef.current.setCustomValidity(
      formData.terms ? '' : 'You must accept the terms'
    );
    setFieldValidity(v => ({ ...v, terms: formData.terms }));
  }, [formData.terms]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Native HTML5 validation
    let nativeOk = true;
    formRef.current.querySelectorAll('input').forEach(inp => {
      inp.setCustomValidity('');
      if (!inp.checkValidity()) {
        inp.reportValidity();
        nativeOk = false;
      }
    });
    if (!nativeOk) return;

    // All fields valid?
    if (!Object.values(fieldValidity).every(Boolean)) return;

    try {
      await register({
        username: formData.username,
        email:    formData.email,
        password: formData.password,
      });
      navigate('/login', {
        replace: true,
        state: {
          fromRegistration:   true,
          registeredUsername: formData.username,
          registeredEmail:    formData.email,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const isFormValid = Object.values(fieldValidity).every(Boolean);

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
            className={fieldValidity.username ? 'valid-input' : ''}
          />
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
            className={fieldValidity.email ? 'valid-input' : ''}
          />
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
            className={fieldValidity.password ? 'valid-input' : ''}
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
        {formData.password && !fieldValidity.password && (
          <p className="error-message">
            Password must be at least 8 characters
          </p>
        )}

        {/* Confirm Password */}
        <div className="form-group password-container">
          <input
            ref={confirmPasswordRef}
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={
              fieldValidity.confirmPassword ? 'valid-input' : ''
            }
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
        {formData.confirmPassword && !fieldValidity.confirmPassword && (
          <p className="error-message">Passwords don’t match</p>
        )}

        {/* Terms */}
        <div
          className={
            'form-group checkbox-group ' +
            (fieldValidity.terms ? 'valid-terms' : '')
          }
        >
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

        <button
          type="submit"
          className={isFormValid ? 'valid-submit' : ''}
          disabled={!isFormValid}
        >
          Register
        </button>

        <p className="register">
          Already have an account?{' '}
          <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
