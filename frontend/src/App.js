import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Loginsignup from './components/Login/Loginsignup';
import Mainpage from './components/Main/Mainpage';
import Donateform from './pages/DonateForm/Donateform';
import { useNavigate } from 'react-router-dom';
import DonationPage from './pages/DonationPage';
function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Check authentication status on app load or refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set authentication state based on token presence
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Loginsignup setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/main/*" element={isAuthenticated ? <Mainpage /> : <Navigate to="/login" />} />
      <Route 
        path="/donateform/:referralcode" 
        element={<Donateform referralCode={localStorage.getItem('referralcode')} />} 
      />
      {/* Redirect any unmatched routes to main page or login */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/main" : "/login"} replace />} 
      />
        <Route path="/donate" element={<DonationPage />} />
    </Routes>
  );
}

export default App;
