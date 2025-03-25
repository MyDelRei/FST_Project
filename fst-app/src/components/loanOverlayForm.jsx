import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import InputField from './InputField'; // Adjust path as needed
import Button from './Button'; // Adjust path as needed

const LoanOverlayForm = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanType, setLoanType] = useState('personal');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Prepare loan data to send to the API
        const loanData = {
            amount,
            interest_rate: interestRate,
            loan_type: loanType,
            status: status,
            due_date: dueDate,
        };

        try {
            const response = await axios.post(
                'http://localhost:8000/api/loans/', // Adjust the API endpoint as necessary
                loanData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add the token if required
                    },
                }
            );
            console.log('Loan created successfully', response.data);
            onClose(); // Close the overlay
            location.reload();
        } catch (err) {
            console.error('Error creating loan', err);
            setError('An error occurred while creating the loan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-[460px] shadow-lg">
                <h2 className="font-['Cabin'] text-[24px] text-slate-700 mb-6">
                    Create Loan
                </h2>
                {error && (
                    <div className="mb-4">
                        <p className="text-red-500 text-[16px]">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Amount */}
                    <InputField
                        placeholder="Loan Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        name="amount"
                        width="415px"
                        height="60px"
                    />

                    {/* Interest Rate */}
                    <InputField
                        placeholder="Interest Rate (%)"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        name="interest_rate"
                        width="415px"
                        height="60px"
                    />

                    {/* Loan Type */}
                    <div className="w-full">
                        <select
                            name="loan_type"
                            value={loanType}
                            onChange={(e) => setLoanType(e.target.value)}
                            className="w-[415px] h-[60px] font-['Cabin'] bg-transparent placeholder:text-slate-400 text-slate-700 text-[20px] border border-slate-200 rounded-[20px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        >
                            <option value="personal">Personal Loan</option>
                            <option value="business">Business Loan</option>
                            <option value="custom">Custom Loan</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="w-full">
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-[415px] h-[60px] font-['Cabin'] bg-transparent placeholder:text-slate-400 text-slate-700 text-[20px] border border-slate-200 rounded-[20px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="repaid">Repaid</option>
                            <option value="defaulted">Defaulted</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <InputField
                        placeholder="Due Date"
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        name="due_date"
                        width="415px"
                        height="60px"
                    />

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <Button
                            text="Cancel"
                            width="200px"
                            height="60px"
                            bgColor="#e0e0e0"
                            textColor="#1C1C26"
                            hoverBgColor="#d1d1d1"
                            onClick={onClose}
                        />
                        <Button
                            text={loading ? "Submitting..." : "Submit"}
                            type="submit"
                            width="200px"
                            height="60px"
                            bgColor="#1C1C26"
                            textColor="white"
                            hoverBgColor="#333"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoanOverlayForm;
