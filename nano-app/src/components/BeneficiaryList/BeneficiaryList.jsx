import React, { useEffect, useState } from 'react'
import './BeneficiaryList.css'
import AddBeneficiary from '../AddBeneficiary/AddBeneficiary';
import axios from 'axios';

const BeneficiaryList = () => {

    const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
    const [beneficiaries, setBeneficiaries] = useState([]);


    const toggleAddBeneficiary = () => {
        setShowAddBeneficiary(true);
    }

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await axios.get('/api/beneficiaries');
                setBeneficiaries(response.data);
            } catch (error) {
                console.error('Error fetching beneficiaries:', error);
                alert('Error occurred');

            }
        };

        fetchBeneficiaries();
    }, []);


  return (
    <div className='beneficiary-list-container'>
        <div className='beneficiary-list-intro'>
             <h2>List of Beneficiaries</h2>
             <button onClick={toggleAddBeneficiary} className='add-beneficiary-button'> Add a new beneficiary</button>
        </div>
        <div className='beneficiary-list-table-container'>
            <table className='beneficiary-list-table'>
                <tr>
                    <th className='table-heading'>Beneficiary Name</th>
                    <th className='table-heading'>Bank Name</th>
                    <th className='table-heading'>Account Number</th>
                    <th className='table-heading'>Maximum Transfer Limit</th>
                </tr>

                { beneficiaries.map((beneficiary) => (
                    <tr>
                    <th>{beneficiary.name}</th>
                    <th>{beneficiary.bankName}</th>
                    <th>{beneficiary.accountNumber}</th>
                    <th>{beneficiary.maxTransferLimit} ₹</th>
                    </tr>
                )) }

                
            </table>
        </div>
        { showAddBeneficiary && <AddBeneficiary setShowAddBeneficiary={setShowAddBeneficiary} /> }
    </div>
  )
}

export default BeneficiaryList
