import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginPage = () => {
    const location = useLocation();
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registeredData, setRegisteredData] = useState({
        username: '',
        email: ''
    });
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (location.state?.fromRegistration) {
            setShowSuccessBanner(true);
            setRegisteredData({
                username: location.state.registeredUsername || '',
                email: location.state.registeredEmail || ''
            });
            setFormData(prev => ({
                ...prev,
                username: location.state.registeredUsername || ''
            }));
            // Clear the state from history to prevent the banner from reappearing on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would handle login logic here,
        // e.g., send formData to a backend API for authentication.
        console.log("Login submitted:", formData);
        // Example: Redirect to a dashboard or home page on successful login
        // navigate('/dashboard');
    };

    return (
        <div className="login-container">
            {showSuccessBanner && (
                <div className="success-banner">
                    Registration successful! Please login with your new credentials.
                    <div className="registered-info">
                        <div>Username: <strong>{registeredData.username}</strong></div>
                        <div>Email: <strong>{registeredData.email}</strong></div>
                    </div>
                </div>
            )}

            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <div className="form-group password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
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
                <div className="options">
                    <label>
                        <input type="checkbox" name="remember"/> Remember Me
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