import React, { useState } from 'react'
import { isLoggedIn } from "../../utilities/auth";
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AdminHeader = () => {

    const userLoggedIn = isLoggedIn();

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
            <header className="header">
                <div className="logo">                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="36" viewBox="0 0 384 512"><path fill="#B197FC" d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                   <a href="/"> <h1 className="logo-text">Nano</h1> </a>
                </div>
                <div className="header-options">
                    <a href="/admin/users">Users</a>
                    <a href="/admin/transactions">Transactions</a>
                </div>
                {userLoggedIn ?
                        <div  className='header-button'>
                        <a><button onClick={handleLogout}>Logout</button></a>
                        </div>
                    :
                    <div className="header-button">
                        <div herf="/admin/login">
                            <a>  <button>Login</button></a>
                        </div>
                    </div>
                }
            </header>
        </div>
  )
}

export default AdminHeader
