import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import TermsPage from './TermsPage';

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
}

export default App;