import React from 'react'
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";
import InfoCard from "../components/infoCard.jsx";
import { TbMoneybag } from "react-icons/tb";
import { TbBusinessplan } from "react-icons/tb";
import { SiMoneygram } from "react-icons/si";
import ActiveLoanTable from "../components/ActiveLoanTable.jsx";

const DebtandLoan = () => {
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
                        <InfoCard title="Personal Loan" Descripton="$2,345"  />
                        <InfoCard title="Debt Amount" Descripton="$2,345"  Icon={TbMoneybag}/>
                        <InfoCard title="Business Loan" Descripton="$2,345"  Icon={TbBusinessplan}/>
                        <InfoCard title="Custom Loan" Descripton="$$$" Icon={SiMoneygram} />

                    </div>

                    <div className="w-full h-full  pt-[39px] mb-[150px] pr-[19px]">
                        <ActiveLoanTable />

                    </div>




                </div>


            </main>
        </div>
    )
}
export default DebtandLoan
