import React from 'react';
import { TbPigMoney } from "react-icons/tb";

const SmallIconBtn = ({ Icon = TbPigMoney }) => {
    return (
        <div
            className="w-[58px] h-[58px] rounded-[10px] mx-1 bg-[#ECEBEB] p-2.5 flex justify-center items-center border border-transparent text-center text-[22px] text-[#1C1C26] transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-[#1C1C26] hover:text-white active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
            <Icon />
        </div>
    );
};

const NotificationCard = ({ reason, savingGoal, progress, onClick }) => {
    return (
        <div
            className="w-[1200px] h-[90px] bg-white rounded-[20px] my-[10px] transition-all hover:shadow-lg hover:bg-gray-50 cursor-pointer"
            onClick={onClick}
        >
            <div className="w-[1200px] h-[90px] flex justify-between items-center">
                <div className="flex px-[10px]">
                    <SmallIconBtn Icon={TbPigMoney} />
                    <div className="flex flex-col px-2">
                        <p className="text-[15px] text-[#8D93A6] font-medium">"Saving Plan"</p>
                        <h1 className="text-[21px] font-medium">{reason}</h1>
                    </div>
                </div>
                <div className="flex justify-end px-[40px]">
                    <div className="flex gap-10 text-center">
                        <div className="flex flex-col">
                            <p className="text-[15px] text-[#8D93A6] font-bold">${savingGoal}</p>
                            <h1 className="text-[15px] text-[#8D93A6] font-medium">Saving Goal</h1>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[15px] text-[#3F9B6D] font-bold">${progress}</p>
                            <h1 className="text-[15px] text-[#8D93A6] font-medium">Progress</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;