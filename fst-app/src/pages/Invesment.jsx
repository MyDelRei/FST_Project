import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";
import InfoCard from "../components/infoCard.jsx";
import { TbBusinessplan, TbMoneybag } from "react-icons/tb";
import InputField from "../components/InputField.jsx";
import Button from "../components/button.jsx";
import MonthlyInvesmentChart from "../components/monthlyInvestment.jsx";
import NotificationCard from "../components/NotificationCard.jsx";
import SavingUpdateOverlay from "../components/SavingUpdateOverlay.jsx";

const Investment = () => {
    const [reason, setReason] = useState('');
    const [goal, setGoal] = useState('');
    const [amount, setAmount] = useState('');
    const [savings, setSavings] = useState([]);
    const [stats, setStats] = useState({
        saving_plan_count: 0,
        monthly_saving: '0.00',
        total_saving: '0.00',
        monthly_savings_data: [],
    });
    const [error, setError] = useState(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedSaving, setSelectedSaving] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const savingsResponse = await axios.get('http://localhost:8000/api/savings/list/', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
                });
                setSavings(savingsResponse.data);

                const statsResponse = await axios.get('http://localhost:8000/api/savings/stats/', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
                });
                setStats(statsResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            }
        };
        fetchData();
    }, []);

    const handleAddSaving = async (e) => {
        e.preventDefault();
        if (!reason || !goal || parseFloat(goal) <= 0) {
            setError('Please fill all fields with valid values');
            return;
        }

        const savingData = {
            reason,
            goal,
            amount: amount || '0.00'
        };

        try {
            const response = await axios.post(
                'http://localhost:8000/api/savings/',
                savingData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
            setSavings([...savings, response.data.saving]);
            const statsResponse = await axios.get('http://localhost:8000/api/savings/stats/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
            });
            setStats(statsResponse.data);
            setReason('');
            setGoal('');
            setAmount('');
            setError(null);
        } catch (err) {
            console.error('Error adding saving:', err);
            setError(err.response?.data?.message || 'Failed to add saving');
        }
    };

    const handleCancel = () => {
        setReason('');
        setGoal('');
        setAmount('');
        setError(null);
    };

    const handleCardClick = (saving) => {
        setSelectedSaving(saving);
        setIsOverlayOpen(true);
    };

    const handleOverlayClose = () => {
        setIsOverlayOpen(false);
        setSelectedSaving(null);
    };

    const handleSavingUpdate = async (updatedSaving) => {
        setSavings(savings.map(s => s.id === updatedSaving.id ? updatedSaving : s));
        try {
            const statsResponse = await axios.get('http://localhost:8000/api/savings/stats/', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
            });
            setStats(statsResponse.data);
        } catch (err) {
            console.error('Error refreshing stats:', err);
        }
    };

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

                    <div className="flex justify-start gap-[28px] w-full h-[120px] py-[19px]">
                        <InfoCard
                            title="Saving Plan"
                            Descripton={`${stats.saving_plan_count} Plans`}
                            width="390px"
                        />
                        <InfoCard
                            title="Monthly Saving"
                            Descripton={`$${stats.monthly_saving}`}
                            Icon={TbMoneybag}
                            width="390px"
                        />
                        <InfoCard
                            title="Total Saving"
                            Descripton={`$${stats.total_saving}`}
                            Icon={TbBusinessplan}
                            width="390px"
                        />
                    </div>

                    <div className="w-full h-[340px] py-[40px] flex gap-[20px]">
                        <div className="w-[700px] h-[340px] bg-white rounded-[20px]">
                            <h1 className="font-['Poppins'] text-[28px] font-bold p-[30px]">Saving & Investment</h1>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            <form onSubmit={handleAddSaving} className="flex w-full justify-center items-center">
                                <div>
                                    <div className="flex py-[10px]">
                                        <div className="px-2">
                                            <InputField
                                                placeholder="Reason"
                                                type="text"
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                width="305px"
                                            />
                                        </div>
                                        <div>
                                            <InputField
                                                placeholder="Goal Amount"
                                                type="number"
                                                value={goal}
                                                onChange={(e) => setGoal(e.target.value)}
                                                width="305px"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="px-2">
                                            <InputField
                                                placeholder="Progress Amount (optional)"
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                width="305px"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button type="submit" text="Add" width="145px" />
                                            <Button
                                                text="Cancel"
                                                width="148px"
                                                bgColor={'#E6E6E6'}
                                                textColor="black"
                                                onClick={handleCancel}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="w-[510px] h-[340px] bg-white rounded-[20px]">
                            <MonthlyInvesmentChart monthlySavingsData={stats.monthly_savings_data} />
                        </div>
                    </div>

                    <div className="w-full flex py-[60px]">
                        <div className="w-full h-[250px]">
                            <h1 className="font-['Poppins'] text-[28px] font-bold">My Savings</h1>
                            <div className="w-full py-[20px]">
                                {savings.length > 0 ? (
                                    savings.map((saving) => (
                                        <NotificationCard
                                            key={saving.id}
                                            reason={saving.reason}
                                            savingGoal={saving.goal}
                                            progress={saving.amount}
                                            onClick={() => handleCardClick(saving)}
                                        />
                                    ))
                                ) : (
                                    <p>No savings goals set yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <SavingUpdateOverlay
                        isOpen={isOverlayOpen}
                        onClose={handleOverlayClose}
                        savingData={selectedSaving}
                        onUpdate={handleSavingUpdate}
                    />
                </div>
            </main>
        </div>
    );
};

export default Investment;