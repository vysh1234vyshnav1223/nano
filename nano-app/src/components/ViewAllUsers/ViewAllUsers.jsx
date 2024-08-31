import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAllUsers.css';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='view-all-users-container'>
      <h2>All Users on Nano</h2>
      <table className='user-transaction-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Mobile Number</th>
            <th>Account Number</th>
            <th>Aadhar Number</th>
            <th>Pan Card ID</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.accountNumber}</td>
              <td>{user.aadhar}</td>
              <td>{user.pan}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllUsers;
