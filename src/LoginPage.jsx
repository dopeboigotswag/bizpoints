import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';

const LoginPage = () => {
    const location = useLocation();
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);
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
            window.history.replaceState({}, '');
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
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