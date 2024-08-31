import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAllTransactions.css';

const ViewAllTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className='all-transactions-container'>
      <h2>All Transactions</h2>
      <table className='user-transaction-table'>
        <thead>
          <tr>
            <th>Date of Transaction</th>
            <th>Sender Name</th>
            <th>Sender Account Number</th>
            <th>Receiver's Name</th>
            <th>Receiver's Account Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.fromAccount?.name}</td>
              <td>{transaction.fromAccount?.accountNumber}</td>
              <td>{transaction.toAccount?.name}</td>
              <td>{transaction.toAccount?.accountNumber}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllTransactions;
