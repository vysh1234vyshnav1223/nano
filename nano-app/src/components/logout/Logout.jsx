import React, { useState } from 'react'
import './Logout.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

const Logout = () => {

    const [redirect, setRedirect] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/user-logout');
            localStorage.removeItem('jwtToken');
            alert('Logout succesfull');
            setRedirect(true);
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Error logging out. Please try again.');            
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

  return (
    <div>
        <button onClick={handleLogout} className='submit-button'> Logout </button>
    </div>
  )
}

export default Logout
