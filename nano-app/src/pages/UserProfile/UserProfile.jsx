import React from 'react'
import Header from '../../components/Header/Header'
import EditUser from '../../components/EditUser/EditUser'
import Logout from '../../components/logout/Logout'

const UserProfile = () => {
  return (
    <div>
        <Header />
        <EditUser />
        <Logout />
    </div>
  )
}

export default UserProfile
