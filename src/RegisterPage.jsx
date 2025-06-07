import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const RegisterPage = () => {
  return (
    <div className="login-container">
      <h2>Create Account</h2>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <div className="options">
          <label>
            <input type="checkbox" name="terms" required /> I agree to the Terms
          </label>
        </div>
        <button type="submit">Register</button>
        <p className="register">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;