import React from 'react';
import NavigationButton from './navigationButton.jsx';
import { GiExpense } from 'react-icons/gi';
import { TbReportMoney } from 'react-icons/tb';
import { FaChartPie } from 'react-icons/fa6';
import { FaFileAlt } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add logout logic here (e.g., clear auth)
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="relative flex h-full w-[221px] flex-col rounded-xl bg-white bg-clip-border p-2">
            <div className="my-[30px] ml-[15px] flex">
                <img src="/img/logo.svg" alt="Logo" className="h-6 w-6" />
                <h5 className="pl-2 block text-[20px] font-['Poppins'] antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                    Small tibah
                </h5>
            </div>
            <nav className="w-full h-full justify-start items-center flex flex-col">
                <NavigationButton text="Dashboard" Icon={MdSpaceDashboard} route="/Dashboard" />
                <NavigationButton text="Expense" Icon={GiExpense} route="/Expense" />
                <NavigationButton text="Debt & Loan" Icon={TbReportMoney} route="/Debt&Loan" />
                <NavigationButton text="Personal Saving" Icon={FaChartPie} route="/Investment" />
                <NavigationButton text="Reports" Icon={FaFileAlt} route="/Reports" />
                <NavigationButton text="Setting" Icon={IoMdSettings} route="/setting" />

                <div className="flex-grow" />
                <div
                    className="w-[200px] h-[43px] flex cursor-auto items-center justify-start px-2 rounded-[20px] text-[#1C1C26] transition-colors duration-200 mb-2 hover:bg-red-800 hover:text-white"
                    onClick={handleLogout}
                >
                    <div className="flex items-center">
                        <IoLogOut className="text-2xl" />
                        <p className="font-['Poppins'] px-2 text-[16px]">Logout</p>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;