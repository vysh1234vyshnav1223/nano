import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Transfer.css'


const Transfer = () => {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState({});
    const [transferData, setTransferData] = useState({
        beneficiaryId: '',
        amount: ''
    });

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await axios.get('/api/beneficiaries');
                setBeneficiaries(response.data);
            } catch (error) {
                console.error('Error fetching beneficiaries:', error);
            }
        };

        fetchBeneficiaries();
    }, []);

    const handleBeneficiaryChange = (e) => {
        const beneficiaryId = e.target.value;
        const beneficiary = beneficiaries.find(b => b._id === beneficiaryId);
        setSelectedBeneficiary(beneficiary || {});
        setTransferData({
            ...transferData,
            beneficiaryId: beneficiaryId
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransferData({
            ...transferData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/transfers', {
                beneficiaryId: transferData.beneficiaryId,
                amount: transferData.amount
            });
            alert('Transfer successful');
            setTransferData({
                beneficiaryId: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error transferring money:', error);
            alert('Failed to transfer money. Please try again.');
        }
    };
    return (
        <div className='transfer-money-container'>
            <h2>Transfer Money</h2>
            <form className='transfer-money-form' onSubmit={handleSubmit}>
                <div className="form-field">
                    <label className="transfer-form-label">Name:</label>
                    <select
                        name="beneficiaryId"
                        value={transferData.beneficiaryId}
                        onChange={handleBeneficiaryChange}
                        required
                    >
                        <option value="">Select Beneficiary</option>
                        {beneficiaries.map(beneficiary => (
                            <option key={beneficiary._id} value={beneficiary._id}>
                                {beneficiary.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-field">
                    <label className="transfer-form-label">Bank Name:</label>
                    <input
                        type="text"
                        name="bankName"
                        value={selectedBeneficiary.bankName || ''}
                        readOnly
                    />
                </div>
                <div className="form-field">
                    <label className="transfer-form-label">Account Number:</label>
                    <input
                        type="number"
                        name="accountNumber"
                        value={selectedBeneficiary.accountNumber || ''}
                        readOnly
                    />
                </div>
                <div className="form-field">
                    <label className="transfer-form-label">Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={transferData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type='submit' className='transfer-submit-button'>Transfer</button>
            </form>
        </div>
    );
};

export default Transfer
