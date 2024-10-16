import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Transactions from '../../pages/Transactions/Transactions';
import Campaign from '../../pages/Campaigns/Campaign';
import './Main.css';
import { useLocation } from 'react-router-dom';
const Mainpage = () => {
  const [userName, setUserName] = useState(''); // State to hold the user's name
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get('success');
  useEffect(() => {
    // Get the user's name from local storage
    const name = localStorage.getItem('userName');
    if (name) {
      console.log("User name fetched from local storage:", name); // Debugging
      setUserName(name); // Set the user's name state
    }
  }, []);

  return (
    <div className="mainpage-container">

{success && <h2>Thank you for your donation!</h2>}
      <Navbar userName={userName} />
      <div className="main-content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard userName={userName} />} /> 
          <Route path="transactions" element={<Transactions />} />
          <Route path="campaigns" element={<Campaign />} />
        </Routes>
      </div>
    </div>
  );
};

export default Mainpage;
