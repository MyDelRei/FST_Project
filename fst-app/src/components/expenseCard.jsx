import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GiReceiveMoney } from "react-icons/gi";
import { FaArrowTrendUp } from "react-icons/fa6";

const ExpenseCard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/transactions/list', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

    const cleanAmount = (amount) => {
        // Remove +$ or -$ prefixes and convert to number
        if (typeof amount === 'string') {
            return Number(amount.replace(/[+$ -]/g, ''));
        }
        return Number(amount);
    };

    const calculateTotalIncome = () => {
        if (!transactions.length) return "0.00";
        return transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((sum, transaction) => sum + cleanAmount(transaction.amount), 0)
            .toFixed(2);
    };

    const calculateTotalSpending = () => {
        if (!transactions.length) return "0.00";
        return transactions
            .filter(transaction => transaction.type === 'spending')
            .reduce((sum, transaction) => sum + cleanAmount(transaction.amount), 0)
            .toFixed(2);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-[20px]">
            <div className="w-[260px] h-[120px] rounded-[20px] flex justify-center items-center bg-[#EDF9EE]">
                <GiReceiveMoney className="text-[#1C1C26] text-[55px] mr-[20px] text-[#1E915F] group-hover:text-white transition-colors duration-200"/>
                <div className="Content">
                    <p className="text-[16px] text-[#888EA2]">Total Income</p>
                    <h1 className="font-semibold text-[25px]">
                        {loading ? 'Loading...' : `$${calculateTotalIncome()}`}
                    </h1>
                </div>
            </div>

            <div className="w-[260px] h-[120px] rounded-[20px] flex justify-center items-center bg-[#FFF4EA]">
                <FaArrowTrendUp className="text-[55px] mr-[20px] text-[#D77D0F] group-hover:text-white transition-colors duration-200"/>
                <div className="Content">
                    <p className="text-[16px] text-[#888EA2]">Total Spending</p>
                    <h1 className="font-semibold text-[25px]">
                        {loading ? 'Loading...' : `$${calculateTotalSpending()}`}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default ExpenseCard;