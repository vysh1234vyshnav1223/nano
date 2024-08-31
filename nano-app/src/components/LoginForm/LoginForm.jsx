import React, { useState } from 'react'
import './LoginForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const { token } = response.data;

            localStorage.setItem('jwtToken', token);

            alert('Login succesfull');
            navigate('/')
        } catch (error) {
            alert('Error');
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div className="login-form">
                <div className="form-field">
                    <label className="login-form-label">Email:</label>
                    <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="form-field">
                    <label className="login-form-label">Password:</label>
                    <input 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
