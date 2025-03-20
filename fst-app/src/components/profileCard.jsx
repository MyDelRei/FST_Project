import React from 'react'
import { FaBell } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const SmallIconBtn = ({Icon = FaBell}) =>{
    return (
        <button
            className="rounded-[10px] mx-1 bg-[#ECEBEB] p-2.5 border border-transparent text-center text-[22px] text-[#1C1C26] transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-[#1C1C26] hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <Icon />
        </button>
    )
};

const ProfileCard = () => {
    return (
        <div className="w-full h-[70px] bg-white rounded-[20px] flex items-center justify-between">
            <div className="mx-[15px] flex items-center justify-between">
                <SmallIconBtn Icon={FaBell} />
                <SmallIconBtn Icon={ImProfile} />
            </div>
            <div className="Information-user flex items-center justify-between px-[15px]">
                <div className="info-user px-[10px]">
                    <h3 className="text-[14px] font-['Poppins'] font-regular text-right">Domanik Albrov</h3>
                    <p className="text-[10px] font-['Poppins'] font-regular">albrovdomanik@gmail.com</p>
                </div>
                <img
                    src="/img/domanikalbrov.jpg"
                    alt="avatar"
                    className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                />

            </div>

        </div>
    )
}
export default ProfileCard
