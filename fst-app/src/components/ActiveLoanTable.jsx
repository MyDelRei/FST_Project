import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepayLoanOverlay from '../components/repayLoanOverlay'; // Adjust path as needed

// Badge Component
const Badge = ({ text, variant }) => {
    const getBadgeStyles = (variant) => {
        switch (variant) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'overdue':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'completed':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            case 'personal':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'business':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'student':
                return 'bg-orange-100 text-orange-800 border-orange-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyles(
                variant
            )}`}
        >
            {text}
        </span>
    );
};

const ActiveLoanTable = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        axios
            .get('http://localhost:8000/api/loans/list', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setLoans(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the loans!', error);
                setError('Unauthorized access or token issue.');
            });
    }, []);

    const handleRepayClick = (loan) => {
        setSelectedLoan(loan);
        setIsOverlayOpen(true);
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
        setSelectedLoan(null);
    };

    return (
        <div className="w-full h-full bg-white rounded-[20px]">
            <div className="w-full h-[150px] flex items-center justify-between px-[19px]">
                <div>
                    <h1 className="font-bold font-['Poppins'] text-[#1C1C26] text-[28px]">
                        Active Loan Overview
                    </h1>
                </div>
            </div>
            <div className="w-full h-full flex items-center justify-between">
                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white rounded-[20px] bg-clip-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {error && <p className="text-red-500 p-4">{error}</p>}
                    {loans.length === 0 && !error && <p className="text-gray-500 p-4">No active loans found.</p>}
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Type</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Interest Rate</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Amount</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Status</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Due Date</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Action</p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id} className="hover:bg-slate-50">
                                <td className="p-4 border-b border-slate-200">
                                    <Badge text={loan.loan_type} variant={loan.loan_type.toLowerCase()} />
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">{loan.interest_rate}%</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">${loan.amount}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <Badge text={loan.status} variant={loan.status.toLowerCase()} />
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-sm text-slate-800">{loan.due_date}</p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <button
                                        className="flex items-center rounded-full border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        onClick={() => handleRepayClick(loan)}
                                    >
                                        Repay
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <RepayLoanOverlay isOpen={isOverlayOpen} onClose={handleCloseOverlay} loanData={selectedLoan} />
        </div>
    );
};

export default ActiveLoanTable;