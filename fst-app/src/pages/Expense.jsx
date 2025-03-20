import React from 'react'
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import WeeklyExpense from "../components/weeklyExpense.jsx";
import RecentTransaction from "../components/RecentTransaction.jsx";
import ProfileCard from "../components/profileCard.jsx";

const Expense = () => {
    return (
        <>
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





                    </div>


                </main>
            </div>
        </>
    )
}
export default Expense
