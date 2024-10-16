import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId'); // Get user ID from URL

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/transactions?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  return (
    <div>
      <h1>Transaction History</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>{transaction.details}</li> // Adjust according to your transaction structure
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
