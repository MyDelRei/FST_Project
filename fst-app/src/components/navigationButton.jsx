import React from 'react';
import { Link } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import {FaBell} from "react-icons/fa";



const NavigationButton = ({ text = 'Dashboard', Icon = MdSpaceDashboard, route }) => {
    return (
        <Link to={route || '/'}>
            <div className="w-[200px] h-[43px] flex items-center justify-start px-2 m-[5px] rounded-[20px] bg-white
    hover:bg-slate-800 hover:text-white hover:border-slate-800
    focus:bg-slate-800 focus:text-white focus:border-slate-800
    active:bg-slate-800 active:text-white active:border-slate-800
    disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none group">
                <div className="flex items-center">
                    <Icon className="text-[#1C1C26] text-2xl group-hover:text-white transition-colors duration-200" />
                    <p className="text-[#1C1C26] font-['Poppins'] px-2 text-[16px] group-hover:text-white transition-colors duration-200">
                        {text}
                    </p>
                </div>
            </div>


        </Link>
    );
};

export default NavigationButton;