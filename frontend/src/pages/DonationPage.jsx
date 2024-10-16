import React, { useState } from 'react';
import Donateform from '../pages/DonateForm/Donateform';
import Transactions from '../pages/Transactions/Transactions';

const DonationPage = () => {
  const [donationData, setDonationData] = useState(null); // State to hold donation data

  // Function to handle donation data submission
  const handleDonationData = (data) => {
    setDonationData(data); // Update state with donation data
  };

  return (
    <div>
      <h1>Donation Page</h1>
      <Donateform onDonate={handleDonationData} /> {/* Pass the handler as a prop */}
      {donationData && <Transactions data={donationData} />} {/* Render Transactions if donationData exists */}
    </div>
  );
};

export default DonationPage;
