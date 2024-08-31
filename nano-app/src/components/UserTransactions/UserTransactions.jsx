import React, { useEffect, useState } from 'react'
import './UserTransactions.css'
import axios from 'axios';

const UserTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        const fetchUserTransactions = async () => {
            try {
                const response = await axios.get('/api/user-transactions');
                setTransactions(response.data);
                const userDetails = await axios.get('/api/users/info');
                setUserInfo(userDetails.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                alert('Error occurred');
            }
        }

        console.log(transactions);

        fetchUserTransactions();
    }, [])

    return (
        <div className='user-transaction-container'>
            <div className='user-account-info'>
                <h3>Account Number: {userInfo.accountNumber}</h3>
                <h3>Balance: {userInfo.balance} ₹</h3>
            </div>
            <table className='user-transaction-table'>
                <tr>
                    <th className='transaction-type'>Type of Transaction</th>
                    <th>Date of Transaction</th>
                    <th>From</th>
                    <th>Account Number</th>
                    <th>Amount</th>
                </tr>
                {
                    transactions.map((transaction, index) => (
                        <tr key={index} >
                            <th>{(transaction.type).toUpperCase()}</th>
                            <th>{new Date(transaction.date).toLocaleString()}</th>
                            <td>{transaction.accountName}</td>
                            <td>{transaction.accountNumber}</td>
                            <th>{transaction.amount}</th>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default UserTransactions
