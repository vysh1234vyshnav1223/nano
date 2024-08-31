import React, { useState } from 'react'
import './AdminLogin.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AdminLogin = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/api/admin/login', { email, password });
        const token = response.data;
        document.cookie = `auth_token=${response.data.token}; path=/;`;
        localStorage.setItem('jwtToken', token);
        alert('login successfull');
        navigate('/admin/transactions');
      } catch (error) {
        console.error('Login failed', error);
      }
    };

  return (
    <>
        <AdminHeader />
        <div className='admin-login-container'>
           <h2 className='admin-login-text'>Admin Login</h2>
         <div className="login-container">
            <form onSubmit={handleLogin}>
                <div className="login-form">
                <div className="form-field">
                    <label className="login-form-label">Email:</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                       
                    />
                </div>
                
                <div className="form-field">
                    <label className="login-form-label">Password:</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      
                    />
                </div>
                <button className="login-button">Login</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default AdminLogin
