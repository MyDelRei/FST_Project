import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField'; // Adjust path as needed
import Button from './Button'; // Adjust path as needed

const RepayLoanOverlay = ({ isOpen, onClose, loanData }) => {
    const [repaymentAmount, setRepaymentAmount] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setRepaymentAmount('');
            setError(null);
        }
    }, [isOpen, loanData]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!repaymentAmount || parseFloat(repaymentAmount) <= 0) {
            setError('Please enter a valid repayment amount');
            return;
        }

        const repaymentData = {
            repayment_amount: repaymentAmount,
        };

        try {
            const response = await axios.post(
                `http://localhost:8000/api/loans/${loanData.id}/update/`,
                repaymentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
            console.log('Loan repayment successful', response.data);
            location.reload();
            onClose();
        } catch (err) {
            console.error('Error processing repayment', err);
            setError(err.response?.data?.message || 'An error occurred while processing the repayment');
        }
    };

    const handleDelete = () => {
        console.log('Delete clicked');
        onClose();
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
        onClose();
    };

    if (!isOpen || !loanData) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-[460px] shadow-lg">
                <h2 className="font-['Cabin'] text-[24px] text-slate-700 mb-6">
                    Repay Loan #{loanData.id}
                </h2>
                {error && (
                    <div className="mb-4">
                        <p className="text-red-500 text-[16px]">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="mb-4">
                        <p className="text-slate-700 text-[16px]">
                            Remaining Loan Amount: ${loanData.amount}
                        </p>
                    </div>
                    <InputField
                        placeholder="Repayment Amount"
                        type="number"
                        value={repaymentAmount}
                        onChange={(e) => setRepaymentAmount(e.target.value)}
                        name="repayment_amount"
                        width="415px"
                        height="60px"
                        step="0.01"
                        min="0"
                    />
                    <div className="flex justify-between mt-6 gap-2">
                        <Button
                            text="Save"
                            type="submit"
                            width="130px"
                            height="60px"
                            bgColor="#1C1C26"
                            textColor="white"
                            hoverBgColor="#333"
                        />
                        <Button
                            text="Delete"
                            width="130px"
                            height="60px"
                            bgColor="#e0e0e0"
                            textColor="#1C1C26"
                            hoverBgColor="#d1d1d1"
                            onClick={handleDelete}
                        />
                        <Button
                            text="Cancel"
                            width="130px"
                            height="60px"
                            bgColor="#e0e0e0"
                            textColor="#1C1C26"
                            hoverBgColor="#d1d1d1"
                            onClick={handleCancel}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RepayLoanOverlay;