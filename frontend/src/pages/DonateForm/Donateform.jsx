import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './DonateForm.css';
const stripePromise = loadStripe('pk_test_51PH0D9SGNgig8mk2ajUatTa2IGERZ82AJxWJB5EVKcPOPYooBeTNxaLyhM21JiceuBT0JMEt0zxBnaVtLoRauXTT00P95Og4ak');
const Donateform = ({ onDonate }) => { // Accept onDonate as a prop
  const { referralcode } = useParams();
  const [donorName, setDonorName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!donorName || !donationAmount) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:4000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          products: [{
            dish: 'Donation',
            imgdata: 'image_url_here',
            price: parseInt(donationAmount * 100),
            qnty: 1 
          }] 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();
      const stripe = await stripePromise;

      // Store the donation data
      const donationData = {
        name: donorName,
        amount: donationAmount,
        referralCode: referralcode,
      };

      // Check if onDonate is a function before calling it
      if (typeof onDonate === 'function') {
        onDonate(donationData); // Pass data to the parent component
      } else {
        console.error('onDonate is not a function:', onDonate);
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Payment failed:', result.error.message);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred during donation:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donate-form-container">
      <h2>Make a Donation</h2>
      <form onSubmit={handleDonate}>
        <div className="input-group">
          <label>Donor Name</label>
          <input 
            type="text" 
            value={donorName} 
            onChange={(e) => setDonorName(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>
        <div className="input-group">
          <label>Referral Code</label>
          <input 
            type="text" 
            value={referralcode} 
            readOnly 
          />
        </div>
        <div className="input-group">
          <label>Donation Amount</label>
          <input 
            type="number" 
            value={donationAmount} 
            onChange={(e) => setDonationAmount(e.target.value)} 
            placeholder="Enter amount (USD)" 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

export default Donateform;
