import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ userName }) => {
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear all user-related data
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="navbar">
      <div className="logo-profile">
        <div className="logo">
          <img src={assets.logo} alt="Logo" height={90} />
        </div>
        <div className="sidebar">
        <ul>
          <Link to="/main/dashboard" className='link'><li>Dashboard</li></Link>
          <Link to="/main/transactions" className='link'><li>Transactions</li></Link>
          <Link to="/main/campaigns" className='link'><li>Campaigns</li></Link>
        </ul>
      </div>
      </div>
      <div className="rightprofile" onClick={() => setShowDropdown(!showDropdown)}>
          <img src={assets.profile} alt="Profile" />
          <p>{userName}</p>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout} style={{backgroundColor:"lightGreen", borderRadius:"5px"}}>Logout</button>
            </div>
          )}
        </div>
      
    </div>
  );
};

export default Navbar;
