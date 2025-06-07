import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const LoginPage = () => {
  return (
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <input
              type="text"
              name="username"
              placeholder="Username"
              required
          />
          <input
              type="password"
              name="password"
              placeholder="Password"
              required
          />
          <div className="options">
            <label>
              <input type="checkbox" name="remember" /> Remember Me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
          <p className="register">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
  );
};

export default LoginPage;