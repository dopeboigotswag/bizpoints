import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage     from './LoginPage';
import RegisterPage  from './RegisterPage';
import TermsPage     from './TermsPage';
import Dashboard     from './Dashboard';
import PrivateRoute  from './PrivateRoute';

function App() {
  const basename = process.env.PUBLIC_URL || '/';

  return (
    <Router basename={basename}>
      <div className="App">
        <Routes>
          {/* public */}
          <Route path="register" element={<RegisterPage />} />
          <Route path="login"    element={<LoginPage    />} />
          <Route path="terms"    element={<TermsPage     />} />

          {/* protected */}
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* default */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;