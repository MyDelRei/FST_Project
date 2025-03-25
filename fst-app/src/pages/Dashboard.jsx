import React from 'react'
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";
import WeeklyExpense from "../components/weeklyExpense.jsx";
import BalanceChart from "../components/BalanceChart.jsx";
import RecentTransaction from "../components/RecentTransaction.jsx";
import CryptoPriceTracker from "../components/cryptoPriceTracker.jsx";
import StockPriceTracker from "../components/stockPrice.jsx";

const Dashboard = () => {
    return (
        <div className="flex justify-start min-h-screen">
            <aside className="fixed top-0 left-0 h-screen p-[19px] z-10">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="flex ml-[259px] py-[19px]">
                <div className="flex flex-col w-[700px] h-full">
                    <div className="w-[700px]">
                        <PageHeader />
                    </div>
                    <div className="w-[700px] py-[19px]">
                        <WeeklyExpense />

                    </div>
                    <div className="w-[700px] h-[450px]">
                        <RecentTransaction />

                    </div>



                </div>
                <div className=" flex flex-col w-[550px] px-[19px]">
                    <div className="w-[510px]">
                    <ProfileCard />
                    </div>

                    <div className="w-[510px] py-[19px]">
                        <BalanceChart />
                    </div>
                    <div className="w-[510px] pb-[19px]">
                        <CryptoPriceTracker />
                    </div>

                </div>



            </main>
        </div>
    )
}
export default Dashboard
