import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import TermsPage from './TermsPage';
<<<<<<< HEAD

function App() {
    return (
        <Router basename="/bizpoints">  {/* ← Add this line with your repo name */}
            <div className="App">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                </Routes>
            </div>
        </Router>
    );
=======
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>  {/* Removed basename */}
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/terms"     element={<TermsPage />} />

          {/* Protected route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Default to login */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
>>>>>>> d817bef (Initial full-stack auth flow: React frontend, Spring Boot backend, Mongo Atlas)
}

export default App;