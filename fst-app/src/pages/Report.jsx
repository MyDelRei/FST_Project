import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";
import ReportTable from "../components/ReportTable.jsx";

const Reports = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/transactions/list', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
                });
                setTransactions(response.data);
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('Failed to load transactions');
            }
        };
        fetchTransactions();
    }, []);

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
                    <div className="w-full h-full py-[19px] mb-[150px] pr-[19px]">
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <ReportTable transactions={transactions} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reports;