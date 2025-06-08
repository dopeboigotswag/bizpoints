import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [fieldValidity, setFieldValidity] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    terms: false
  });

  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);
  const termsRef = useRef(null);
  const formRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      const confirmPasswordInput = confirmPasswordRef.current;
      if (formData.password !== formData.confirmPassword) {
        confirmPasswordInput.setCustomValidity("Passwords don't match");
        setFieldValidity(prev => ({...prev, confirmPassword: false}));
      } else {
        confirmPasswordInput.setCustomValidity('');
        setFieldValidity(prev => ({...prev, confirmPassword: true}));
      }
    }
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    if (formData.email) {
      const isValid = validateEmail(formData.email);
      setFieldValidity(prev => ({...prev, email: isValid}));

      const emailInput = emailRef.current;
      if (!isValid) {
        emailInput.setCustomValidity("Please enter a valid email address");
      } else {
        emailInput.setCustomValidity('');
      }
    }
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    setTimeout(() => {
      switch (name) {
        case 'username':
          setFieldValidity(prev => ({...prev, username: value.trim().length >= 5}));
          break;
        case 'password':
          setFieldValidity(prev => ({...prev, password: value.length >= 8}));
          break;
        case 'terms':
          termsRef.current.setCustomValidity(checked ? '' : 'You must accept the terms');
          setFieldValidity(prev => ({...prev, terms: checked}));
          break;
        default:
          break;
      }
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allValid = Object.values(fieldValidity).every(valid => valid);

    if (allValid) {
      navigate('/login', {
        state: {
          fromRegistration: true,
          registeredUsername: formData.username,
          registeredEmail: formData.email
        }
      });
    } else {
      const inputs = formRef.current.querySelectorAll('input');
      inputs.forEach(input => {
        if (!fieldValidity[input.name] || !input.checkValidity()) {
          input.reportValidity();
        }
      });
    }
  };

  const isFormValid = Object.values(fieldValidity).every(valid => valid);

  return (
      <div className="login-container">
        <h2>Create Account</h2>
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
                type="text"
                name="username"
                placeholder="Username (min 5 characters)"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={5}
                className={fieldValidity.username ? 'valid-input' : ''}
            />
          </div>

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

          <div className="form-group">
            <input
                type="password"
                name="password"
                placeholder="Password (min 8 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className={fieldValidity.password ? 'valid-input' : ''}
            />
          </div>

          <div className="form-group">
            <input
                ref={confirmPasswordRef}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={fieldValidity.confirmPassword ? 'valid-input' : ''}
            />
          </div>

          <div className={`form-group checkbox-group ${fieldValidity.terms ? 'valid-terms' : ''}`}>
            <label>
              <input
                  ref={termsRef}
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
              /> I agree to the <Link to="/terms">Terms & Conditions</Link>
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
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
  );
};

export default RegisterPage;