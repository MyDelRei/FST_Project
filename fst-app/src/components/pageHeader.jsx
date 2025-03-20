import React from 'react'
import { BsThreeDots } from "react-icons/bs";

// no prop set

const PageHeader = () => {
    return (
        <div className="w-[699px] h-[105px] flex items-center justify-between bg-white rounded-[20px] ">
            <div className="ml-[20px]">
                <h1 className="font-bold font-['Poppins'] text-[28px] text-[#1C1C26]">Dashboard</h1>
                <p className="font-regular font-['Poppins'] text-[#5A5A5E]">17, Mar 2025 - 24, Mar 2025</p>
            </div>
            <div className="Card w-[190px] h-[80px] bg-[#E2DDF4] flex justify-between mx-4 rounded-[10px]">
                <div className="w-full h-full flex flex-col justify-center px-4 ">
                    <p className="font-regular font-['Poppins'] text-[14px] text-[#1C1C26]">Total balance</p>
                    <h2 className="font-bold font-['Poppins'] text-[20px] text-[#1C1C26]">$<span>23,487</span></h2>
                </div>
                <BsThreeDots className="m-4 text-[20px]"/>
            </div>
        </div>
    )
}
export default PageHeader
