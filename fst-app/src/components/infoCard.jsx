import React from 'react'
import { GrMoney } from "react-icons/gr";

const InfoCard = ({ title, Descripton, Icon = GrMoney, width = '260px', height = '120px', bgColor = 'white',}) => {
    return (
        <div
            className="flex items-center justify-start gap-3 px-[30px] rounded-[20px]"
            style={{
                width: width,
                height: height,
                backgroundColor: bgColor,
            }}
        >
            <Icon
                className="text-[#1C1C26] text-[55px] mr-[10px] group-hover:text-white transition-colors duration-200"
            />
            <div className="Content">
                <h1>{title}</h1>
                <p className="font-bold text-[25px]">{Descripton}</p>
            </div>
        </div>
    );
};
export default InfoCard
