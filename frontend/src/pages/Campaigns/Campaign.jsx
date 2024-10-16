// Campaign.jsx

import React from 'react';
import './Campaign.css'; // Import the CSS file for styling
import { campaigns } from '../../assets/assets'; // Import the campaigns array
import { useNavigate } from 'react-router-dom';

const Campaign = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const code=localStorage.getItem('referralcode');
  return (
    <div className="campaigns-container">
      <h2>Available Campaigns</h2>
      <div className="campaigns-list">
        {campaigns.map((campaign, index) => (
          <div className="campaign-card" key={index}>
            <img src={campaign.image} alt={campaign.name} className="campaign-image" />
            <div className="campaign-details">
              <h3>{campaign.name}</h3>
              <p>{campaign.info}</p>
              <p>Amount Raised: ${campaign.amount}</p>
              <p>Expires On: {new Date(campaign.expiry).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/donateform/${code}`)}>Donate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;
