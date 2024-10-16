import React from 'react';
import { assets, campaigns } from '../../assets/assets'; // Import campaigns data
import './dashboard.css';

const Dashboard = () => {
  const code = localStorage.getItem('referralcode');
  const name = localStorage.getItem('userName');
  const totalAmount = localStorage.getItem('Totaldonation');
  const maxAmount = 1000; // Set your maximum value
  const percentage = (totalAmount / maxAmount) * 100; // Calculate percentage

  // Get the amount from a specific campaign (for example, the first campaign)
  const specificCampaign = campaigns[0];
  const campaignAmount = specificCampaign.amount;
  const campaignExpiry = new Date(specificCampaign.expiry);
  const today = new Date();

  const copyLink = () => {
    const currentUrl = window.location.origin;
    const donationLink = `${currentUrl}/donateform/${code}`;
    navigator.clipboard.writeText(donationLink).then(() => {
      alert('Link is now copied to the clipboard!');
    });
  };

  const getButtonText = () => {
    return today > campaignExpiry ? 'Extend Now' : 'Explore Now';
  };

  const shareOnWhatsApp = () => {
    const baseUrl = window.location.origin;
    const donateLink = `${baseUrl}/donateform/${code}`;
    const message = `Support our cause! Click the link to donate: ${donateLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="dashboard-container">
      <h3>DASHBOARD</h3>
      <div className="dashboard-header">
        <img src={assets.dashboard} alt="" className="dashboard-image" />
        <div className="dashboard-header-text">
          <h2>Hello Mr/Ms {name}</h2>
          <p>Initial push is the toughest! Go through the learning modules, or reach out to your fundraising manager to level up.</p>
        </div>
      </div>
      <div className="user-dashboard-content">
        <div className="progress-content">
          <div className="progress-circle">
            <svg className="progress-ring" width="200" height="200">
              <circle className="progress-ring-bg" stroke="#e6e6e6" strokeWidth="10" fill="transparent" r="90" cx="100" cy="100" />
              <circle
                className="progress-ring-fill"
                stroke="#76c7c0"
                strokeWidth="10"
                fill="transparent"
                r="90"
                cx="100"
                cy="100"
                strokeDasharray={`${Math.PI * 90 * 2} ${Math.PI * 90 * 2}`}
                strokeDashoffset={`${Math.PI * 90 * 2 - (Math.PI * 90 * 2 * (percentage / 100))}`}
              />
            </svg>
            <div className="progress-text">
              <p>Goal Achieved</p>
              <p>{totalAmount}</p>
            </div>
            <h5 style={{ color: "Tomato", paddingLeft: "40px" }}>Total Goal</h5>
            <p style={{ color: "Tomato", paddingLeft: "70px" }}> {campaignAmount}</p>
          </div>
        </div>
        <div className="right-side-content">
          <h4>Level Achieved: <span style={{ color: "Purple" }}>Star</span></h4>
          <div className="buttons-container">
            <button className="reward-button">🎁 Rewards</button>
            <button className="copy-link-button" onClick={copyLink}>📋 Copy Donation Link</button>
          </div>
          <p>Unlock Ninja Level at 5000</p>
          <div className="time-left">
            <p><strong>Time Left:</strong> {today > campaignExpiry ? "Campaign Expired" : "Campaign Upcoming"}</p>
            <button className="extend-button">{getButtonText()}</button>
          </div>
          <div className="reference-code">
            <p><strong>Reference Code:</strong> {code}</p>
          </div>
          <button className="start-here-button">Start Here</button>
        </div>
      </div>
      <div className="whatsapp-button-container">
        <button className="whatsapp-share-button" onClick={shareOnWhatsApp}>
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
