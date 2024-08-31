import React from "react";
import { useState } from "react";
import "./SignupForm.css";
import axios from 'axios';
import { Navigate } from "react-router-dom";


const SignupForm = () => {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [pan, setPan] = useState('');
    const [balance, setBalance] = useState('');
    const [password, setPassword] = useState('');  
    const [redirect, setRedirect] = useState(false); 


    async function reqisterUser(ev) {
        ev.preventDefault();
        try {
           await axios.post('/api/users/signup', {
            name, mobile, email, gender, dob, address, aadhar, pan, balance, password
           });
           alert('Registration Successfull');
           setRedirect(true);
        } catch (error) {
            alert('Error');
            console.error(error);
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <form onSubmit={reqisterUser}>
            <h1 className="signup-intro">Start your Journey with Nano!</h1>
            <p className="login-redirect">Already have an account? Click <a href="/login">here</a> to login</p>
            <div className="signupform">
                <div className="left-form">
                    <div className="form-field">
                        <label className="signup-form-label">Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            required/>
                    </div>

                    <div className="form-field">
                        <label className="signup-form-label">Contact Number:</label>
                        <input 
                            type="tel" 
                            name="number" 
                            value={mobile}
                            onChange={ev => setMobile(ev.target.value)}
                            pattern="[0-9]*"
                            required/>
                    </div>

                    <div className="form-field">
                        <label className="signup-form-label"> Email: </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                            required/>
                    </div>

                    <div className="form-field">
                        <label className="signup-form-label">Gender: </label>
                        <label>Male</label>
                        <input type="radio" name="gender" value="Male" onClick={ev => setGender(ev.target.value)} required/>
                        <label>Female</label>
                        <input type="radio" name="gender" value="Female" onClick={ev => setGender(ev.target.value)} />
                        <label>Others</label>
                        <input type="radio" name="gender" value="Others" onClick={ev => setGender(ev.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label className="signup-form-label"> Date of Birth: </label>
                        <input 
                            type="date" 
                            name="dob" 
                            value={dob}
                            onChange={ev => setDob(ev.target.value)}
                            required/>

                    </div>
                </div>

                <div className="right-form">

                <div className="form-field">
                    <label className="signup-form-label"> Address: </label>
                    <textarea 
                        name="address" 
                        cols="30" 
                        rows="10" 
                        value={address}
                        onChange={ev => setAddress(ev.target.value)}
                        required/>
                </div>



                    <div className="form-field">
                        <label className="signup-form-label"> Aadhar Number: </label>
                        <input 
                            type="number" 
                            name="aadhar" 
                            value={aadhar}
                            onChange={ev => setAadhar(ev.target.value)}
                            required/>
                    </div>
                    <div>
                        <div className="form-field">
                            <label className="signup-form-label"> PAN Card Id: </label>
                            <input 
                                type="text" 
                                name="pan" 
                                maxLength={10}
                                value={pan}
                                onChange={ev => setPan(ev.target.value)}
                                required/>
                        </div>

                        <div className="form-field">
                            <label className="signup-form-label"> Initial Deposit:</label>
                            <input 
                                type="number" 
                                value={balance}
                                onChange={ev => setBalance(ev.target.value)}
                                required/>
                        </div>


                        <div className="form-field">
                            <label className="signup-form-label"> Password: </label>
                            <input 
                                type="password"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                                required/>
                        </div>
                    </div>
                </div>

            </div>
            <button className="submit-button">Create account</button>
        </form>
        </div>
    )
}

export default SignupForm;