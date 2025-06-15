import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
<<<<<<< HEAD

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
=======
import { register } from './services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword]           = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

>>>>>>> d817bef (Initial full-stack auth flow: React frontend, Spring Boot backend, Mongo Atlas)
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

<<<<<<< HEAD
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

    // Use a setTimeout to allow the state update to batch,
    // and then validate based on the potentially new value
    setTimeout(() => {
      switch (name) {
        case 'username':
          setFieldValidity(prev => ({...prev, username: value.trim().length >= 5}));
          break;
        case 'password':
          setFieldValidity(prev => ({...prev, password: value.length >= 8}));
          break;
        case 'terms':
          if (termsRef.current) { // Ensure ref is not null
            termsRef.current.setCustomValidity(checked ? '' : 'You must accept the terms');
          }
          setFieldValidity(prev => ({...prev, terms: checked}));
          break;
        default:
          break;
      }
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation for all fields on submit
    // This ensures error messages are shown if the form is invalid
    const inputs = formRef.current.querySelectorAll('input, select, textarea');
    let allInputsValid = true;
    inputs.forEach(input => {
      // Manually set custom validity for terms checkbox if not checked
      if (input.name === 'terms' && !formData.terms) {
        input.setCustomValidity('You must accept the terms');
      } else {
        input.setCustomValidity(''); // Clear any previous custom validity
      }

      if (!input.checkValidity()) {
        input.reportValidity(); // Show native browser validation message
        allInputsValid = false;
      }
    });

    // Double-check fieldValidity state for programmatic checks
    const allProgrammaticChecksValid = Object.values(fieldValidity).every(valid => valid);

    if (allInputsValid && allProgrammaticChecksValid) {
      // In a real application, you would send formData to a backend for registration.
      console.log("Registration Data:", formData);
      navigate('/login', {
        state: {
          fromRegistration: true,
          registeredUsername: formData.username,
          registeredEmail: formData.email
        }
      });
    } else {
      console.log("Form is invalid. Please correct the errors.");
    }
  };

  const isFormValid = Object.values(fieldValidity).every(valid => valid);

  return (
      <div className="login-container">
        <h2>Create Account</h2>
        <form ref={formRef} onSubmit={handleSubmit} noValidate> {/* noValidate to control validation via JS */}
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

          <div className="form-group password-container">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (min 8 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className={fieldValidity.password ? 'valid-input' : ''}
            />
            <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-group password-container">
            <input
                ref={confirmPasswordRef}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={fieldValidity.confirmPassword ? 'valid-input' : ''}
            />
            <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
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
=======
  const [error, setError] = useState('');

  const formRef            = useRef(null);
  const emailRef           = useRef(null);
  const confirmPasswordRef = useRef(null);
  const termsRef           = useRef(null);

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate username length
  useEffect(() => {
    setFieldValidity(v => ({
      ...v,
      username: formData.username.trim().length >= 5
    }));
  }, [formData.username]);

  // Validate email format
  useEffect(() => {
    if (!formData.email) return;
    const valid = validateEmail(formData.email);
    emailRef.current.setCustomValidity(valid ? '' : 'Enter a valid email');
    setFieldValidity(v => ({ ...v, email: valid }));
  }, [formData.email]);

  // Validate password length
  useEffect(() => {
    setFieldValidity(v => ({
      ...v,
      password: formData.password.length >= 8
    }));
  }, [formData.password]);

  // Validate confirm password match
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

  // Validate terms checkbox
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
      [name]: type === 'checkbox' ? checked : value
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

    // Programmatic validity checks
    if (!Object.values(fieldValidity).every(Boolean)) return;

    try {
      // This call now returns & stores the JWT
      await register({
        email: formData.email,
        password: formData.password
      });
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
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
          <p className="error-message">Password must be at least 8 characters</p>
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
            className={fieldValidity.confirmPassword ? 'valid-input' : ''}
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
>>>>>>> d817bef (Initial full-stack auth flow: React frontend, Spring Boot backend, Mongo Atlas)
