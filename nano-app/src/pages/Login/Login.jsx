import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Header from '../../components/Header/Header'
import './Login.css'

const Login = () => {
  return (
    <div>
      <Header/>
      <h1 className='login-intro'>Login to your Nano account</h1>
      <LoginForm />
    </div>
  )
}

export default Login
