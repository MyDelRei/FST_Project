import React from 'react'
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";
import ReportTable from "../components/ReportTable.jsx";
import InfoCard from "../components/infoCard.jsx";
import {TbBusinessplan, TbMoneybag} from "react-icons/tb";
import {SiMoneygram} from "react-icons/si";
import ActiveLoanTable from "../components/ActiveLoanTable.jsx";
import InputField from "../components/InputField.jsx";
import Button from "../components/button.jsx";
import BalanceChart from "../components/BalanceChart.jsx";
import MonthlyInvesmentChart from "../components/monthlyInvestment.jsx";
import NotificationCard from "../components/NotificationCard.jsx";
import CryptoPriceTracker from "../components/cryptoPriceTracker.jsx";

const Investment = () => {
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
                        <InfoCard title="Personal Loan" Descripton="$2,345" width="390px" />
                        <InfoCard title="Debt Amount" Descripton="$2,345"  Icon={TbMoneybag} width="390px" />
                        <InfoCard title="Business Loan" Descripton="$2,345"  Icon={TbBusinessplan} width="390px" />
                    </div>



                    <div className="w-full h-[340px] py-[40px] flex gap-[20px]">

                        <div className="w-[700px] h-[340px] bg-white rounded-[20px]">
                            <h1 className="font-['Poppins'] text-[28px] font-bold p-[30px]">Saving & Invesment</h1>
                            <div className="flex w-full justify-center items-center">
                                <div >
                                    <div className="flex py-[10px]">
                                        <div className="px-2">
                                            <InputField placeholder="Reason"  type="text" width="305px"/>
                                        </div>
                                        <div>
                                            <InputField placeholder="Goal"  type="text" width="305px"/>
                                        </div>

                                    </div>
                                    <div className="flex">
                                        <div className="px-2">
                                            <InputField placeholder="Amount"  type="text" width="305px"/>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button type="submit" text="Add" width="145px" />
                                            <Button type="submit" text="Cancel" width="148px" bgColor={'#E6E6E6'} textColor="black"/>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                        <div className="w-[510px] h-[340px] bg-white rounded-[20px]">
                            <MonthlyInvesmentChart />

                        </div>



                    </div>
                    <div className="w-full flex py-[60px]">
                        <div className="w-[720px] h-[250px]">
                            <h1 className="font-['Poppins'] text-[28px] font-bold">My Savings</h1>
                            <div className="w-full py-[20px]">
                                <NotificationCard/>
                                <NotificationCard/>
                            </div>

                        </div>
                        <div>
                            <CryptoPriceTracker />
                        </div>
                    </div>




                </div>


            </main>
        </div>
    )
}
export default Investment
