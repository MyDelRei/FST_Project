import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineEdit } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import TransactionOverlay from './transactionOverlay.jsx'; // Import the overlay component

const RecentTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [overlayOpen, setOverlayOpen] = useState(false); // Control overlay visibility
    const [selectedTransaction, setSelectedTransaction] = useState(null); // Store selected transaction for editing

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/transactions/list', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const renderStatusBadge = (status) => {
        if (status === 'completed') {
            return <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">Done</span>;
        }
        return <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">Incomplete</span>;
    };

    const renderAmount = (amount, type) => {
        if (type === 'income') return <p className="text-sm text-green-500">+${amount}</p>;
        if (type === 'spending') return <p className="text-sm text-red-500">-${amount}</p>;
        return <p className="text-sm">${amount}</p>;
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction); // Set the selected transaction data
        setOverlayOpen(true); // Open the overlay
    };

    const handlePrint = (transactionId) => {
        console.log("Print transaction with ID:", transactionId);
    };

    const countPendingTransactions = () => {
        return transactions.filter(transaction => transaction.status !== 'completed').length;
    };

    return (
        <div className="w-full h-[450px] bg-white rounded-[20px]">
            <div className="w-full h-[150px] flex items-center justify-between px-[19px]">
                <div>
                    <h1 className="font-bold text-[#1C1C26] text-[28px]">Recent Transaction</h1>
                    <p className="text-[18px]">
                        <span className="font-medium text-[#1C1C26]">{transactions.length}</span> Total, this week
                    </p>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-center px-4">
                        <h1 className="text-[28px] font-semibold">{transactions.filter(t => t.status === 'completed').length}</h1>
                        <p className="text-[15px]">Done</p>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <h1 className="text-[28px] font-semibold">{countPendingTransactions()}</h1>
                        <p className="text-[15px]">Incomplete</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-[300px] flex items-center justify-between">
                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-[20px] bg-clip-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-white">Description</th>
                            <th className="p-4 border-b border-slate-300 bg-white">Type</th>
                            <th className="p-4 border-b border-slate-300 bg-white">Date</th>
                            <th className="p-4 border-b border-slate-300 bg-white">Status</th>
                            <th className="p-4 border-b border-slate-300 bg-white">Amount</th>
                            <th className="p-4 border-b border-slate-300 bg-white">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4">Loading...</td>
                            </tr>
                        ) : (
                            transactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-slate-50">
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm">{transaction.description}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm">{transaction.type}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="text-sm">{transaction.date}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {renderStatusBadge(transaction.status)}
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {renderAmount(transaction.amount, transaction.type)}
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <button
                                            className="rounded-[10px] mx-1 bg-[#ECEBEB] p-2.5 border text-[22px] text-[#1C1C26] hover:bg-[#1C1C26] hover:text-white"
                                            onClick={() => handleEdit(transaction)} // Pass full transaction object
                                        >
                                            <MdOutlineEdit />
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Transaction Overlay */}
            {overlayOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <TransactionOverlay
                        open={overlayOpen}
                        onClose={() => setOverlayOpen(false)}
                        transactionData={selectedTransaction} // Pass selected transaction data
                    />
                </div>
            )}
        </div>
    );
};

export default RecentTransaction;
