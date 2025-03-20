import React from 'react'
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";

import ActiveLoanTable from "../components/ActiveLoanTable.jsx";
import ReportTable from "../components/ReportTable.jsx";

const Reports = () => {
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
                            <ReportTable />

                        </div>




                    </div>


                </main>
            </div>
)
}
export default Reports
