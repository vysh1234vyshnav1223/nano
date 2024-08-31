import React, { useState } from 'react';
import axios from 'axios';

const AddBeneficiary = ({ setShowAddBeneficiary }) => {
    const [beneficiaryData, setBeneficiaryData] = useState({
        name: '',
        bankName: '',
        accountNumber: '',
        maxTransferLimit: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBeneficiaryData({
            ...beneficiaryData,
            [name]: value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/beneficiaries/add', beneficiaryData);
            setBeneficiaryData({
                name: '',
                bankName: '',
                accountNumber: '',
                maxTransferLimit: ''
            });
            alert('Beneficiary added successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error adding beneficiary:', error);
            alert('Failed to add beneficiary. Please try again.');
        }
    };

    const closeAddBeneficiary = () => {
        setShowAddBeneficiary(false);
    };

    

    return (
        <div>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeAddBeneficiary}>&times;</span>
                    <h2>Add new beneficiary</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="password-form-field">
                            <label htmlFor="name">Beneficiary Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={beneficiaryData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="password-form-field">
                            <label htmlFor="bankName">Bank Name:</label>
                            <input
                                type="text"
                                name="bankName"
                                value={beneficiaryData.bankName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="password-form-field">
                            <label htmlFor="accountNumber">Account Number:</label>
                            <input
                                type="number"
                                name="accountNumber"
                                value={beneficiaryData.accountNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="password-form-field">
                            <label htmlFor="maxTransferLimit">Max Transfer Limit:</label>
                            <input
                                type="number"
                                name="maxTransferLimit"
                                value={beneficiaryData.maxTransferLimit}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="beneficiary-submit-button">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBeneficiary;
