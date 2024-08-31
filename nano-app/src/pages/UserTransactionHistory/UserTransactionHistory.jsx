import React from 'react'
import './UserTransactionHistory.css'
import Header from '../../components/Header/Header'
import UserTransactions from '../../components/UserTransactions/UserTransactions'

const UserTransactionHistory = () => {
  return (
    <div>
      <Header />
      <UserTransactions />
    </div>
  )
}

export default UserTransactionHistory
