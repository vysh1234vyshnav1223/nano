import React, { useState, useEffect } from 'react';
import './EditUser.css';
import axios from 'axios';

const EditUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    dateOfBirth: '',
    address: '',
    aadharNumber: '',
    panCardId: '',
    balance: '',
    accountNumber: '',
    password: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }

      const response = await axios.post('/api/users/reset-password', {
        currentPassword,
        newPassword
      });

      console.log('password reset successful', response.data);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password reset successful');

    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Error resetting password');
    }
  };


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/update-user', userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); 
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/info');
        const user = response.data;
        setUserData({
          name: user.name,
          contactNumber: user.mobile,
          email: user.email,
          dateOfBirth: user.dob,
          address: user.address,
          aadharNumber: user.aadhar,
          panCardId: user.pan,
          balance: user.balance,
          accountNumber: user.accountNumber,
          password: ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-form-container">
      <h2 className='edit-user-text'> Edit User Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="EditUserForm">
          <div className="left-form">
          <div className='form-field'>
            <label>Account Number: </label>
            <input
                type="text"
                name="accountNumber"
                readOnly
                value={userData.accountNumber}
                onChange={handleInputChange}
              />
          </div>
            <div className="form-field">
              <label className="editUserLabel">Name:</label>
              <input
                type="text"
                name="name"
                readOnly
                value={userData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="editUserLabel">Contact Number:</label>
              <input
                type="tel"
                name="contactNumber"
                value={userData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="editUserLabel">Email:</label>
              <input
                type="email"
                name="email"
                readOnly
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="editUserLabel">Date of Birth:</label>
              <input
                type="text"
                name="dateOfBirth"
                readOnly
                value={formatDate(userData.dateOfBirth)}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="right-form">
            <div className="form-field">
              <label className="editUserLabel">Address:</label>
              <textarea
                name="address"
                cols="30"
                rows="10"
                value={userData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="editUserLabel">Aadhar Number:</label>
              <input
                type="number"
                name="aadharNumber"
                readOnly
                value={userData.aadharNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="editUserLabel">PAN Card Id:</label>
              <input
                type="text"
                name="panCardId"
                readOnly
                value={userData.panCardId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label className="editUserLabel">Available Balance:</label>
              <input
                type="number"
                name="balance"
                readOnly
                value={userData.balance}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button" onClick={handleUpdateProfile}>Update Profile</button>
        <button type="button" className="password-submit-button" onClick={() => toggleModal()}>Password reset</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => toggleModal()}>&times;</span>
              <h2>Reset Password</h2>
              <form className='password-reset-form' onSubmit={(e) => e.preventDefault()}>
                <div className="password-form-field">
                  <label htmlFor="currentPassword">Current Password:</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="password-form-field">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="password-form-field">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" onClick={handlePasswordReset}>Reset Password</button>
              </form>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditUser;
