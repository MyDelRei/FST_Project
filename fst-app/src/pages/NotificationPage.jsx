import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";
import { IoIosArrowDown } from "react-icons/io";
import { TbPigMoney, TbCash, TbWallet, TbCoin, TbHomeDollar } from "react-icons/tb"; // Added more icons

const SmallIconBtn = ({ Icon = TbPigMoney }) => {
    return (
        <div
            className="w-[58px] h-[58px] rounded-[10px] mx-1 bg-[#ECEBEB] p-2.5 flex justify-center items-center border border-transparent text-center text-[22px] text-[#1C1C26] transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-[#1C1C26] hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
            <Icon />
        </div>
    );
};

const NotificationCardForPage = ({ transaction }) => {
    const getTypeColor = (type) => {
        switch (type) {
            case 'income': return '#3F9B6D'; // Green
            case 'spending': return '#FF4560'; // Red
            case 'loans': return '#FFB107'; // Yellow
            case 'saving': return '#34A0EB'; // Blue
            default: return '#8D93A6'; // Gray
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'income': return TbCash; // Cash for income
            case 'spending': return TbWallet; // Wallet for spending
            case 'loans': return TbCoin; // Coin for loans
            case 'saving': return TbHomeDollar; // Home with dollar for saving
            default: return TbPigMoney; // Default piggy bank
        }
    };

    return (
        <div
            className="w-[1200px] h-[90px] bg-white rounded-[20px] my-[10px] transition-all hover:shadow-lg hover:bg-gray-50 cursor-pointer"
        >
            <div className="w-[1200px] h-[90px] flex justify-between items-center">
                <div className="flex px-[10px]">
                    <SmallIconBtn Icon={getTypeIcon(transaction.type)} />
                    <div className="flex flex-col px-2">
                        <p className="text-[15px] text-[#8D93A6] font-medium">{transaction.type}</p>
                        <h1 className="text-[21px] font-medium">{transaction.description}</h1>
                    </div>
                </div>
                <div className="flex justify-end px-[40px]">
                    <div className="flex gap-10 text-center">
                        <div className="flex flex-col">
                            <p className="text-[15px] font-bold" style={{ color: getTypeColor(transaction.type) }}>
                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                            </p>
                            <h1 className="text-[15px] text-[#8D93A6] font-medium">{transaction.date.split(' ')[0]}</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[15px] text-[#8D93A6] font-bold">{transaction.status}</p>
                            <h1 className="text-[15px] text-[#8D93A6] font-medium">Status</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NotificationPage = () => {
    const [filter, setFilter] = useState('All Transaction');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/transactions/list', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setTransactions(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('Failed to load transactions');
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter((transaction) => {
        if (filter === 'All Transaction') return true;
        return transaction.type === filter;
    });

    return (
        <div className="flex justify-start min-h-screen">
            <aside className="fixed top-0 left-0 h-screen p-[19px] z-10">
                <Sidebar />
            </aside>
            <main className="flex ml-[259px] py-[19px]">
                <div className="flex flex-col w-full h-full">
                    <div className="w-full flex">
                        <div className="w-[700px]">
                            <PageHeader />
                        </div>
                        <div className="w-[550px] px-[19px] flex flex-col">
                            <ProfileCard />
                        </div>
                    </div>
                    <div className="w-full flex">
                        <h1 className="font-['Poppins'] text-[28px] font-bold p-[20px]">Notifications</h1>
                    </div>
                    <div className="px-[15px] relative">
                        <select
                            id="Report"
                            name="Report"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-[218px] h-[40px] border border-blue-600 appearance-none rounded-[15px] bg-[#1C1C26] py-1.5 pr-10 pl-4 text-bold text-[18px] font-['Poppins'] text-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1C1C26] sm:text-sm/6"
                        >
                            <option>All Transaction</option>
                            <option>spending</option>
                            <option>income</option>
                            <option>loans</option>
                            <option>saving</option>
                        </select>
                        <IoIosArrowDown
                            className="absolute bottom-0.5 left-1/2 transform -translate-y-1/2 text-white text-[18px] pointer-events-none"
                        />
                    </div>
                    <div className="px-[15px] py-[20px]">
                        {loading && <p className="text-center text-[#8D93A6]">Loading transactions...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        {!loading && !error && filteredTransactions.length === 0 && (
                            <p className="text-center text-[#8D93A6]">No transactions found</p>
                        )}
                        {!loading && !error && filteredTransactions.map((transaction) => (
                            <NotificationCardForPage key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotificationPage;