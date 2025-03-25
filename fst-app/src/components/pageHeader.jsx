import React, { useEffect, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';

const PageHeader = () => {

    const getCurrentDate = () => {
        const today = new Date();
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return today.toLocaleDateString('en-GB', options);
    };

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        picture: '',
        total_expense: 0.00,
        balance: 0.00,
    });

    useEffect(() => {
        // Fetch data from the API
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get-user-profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assuming you're storing JWT token
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);
    return (
        <div className="w-[699px] h-[105px] flex items-center justify-between bg-white rounded-[20px] ">
            <div className="ml-[20px]">
                <h1 className="font-bold font-['Poppins'] text-[28px] text-[#1C1C26]">Dashboard</h1>
                <p className="font-regular font-['Poppins'] text-[#5A5A5E]">{getCurrentDate()}</p>
            </div>
            <div className="Card w-[190px] h-[80px] bg-[#E2DDF4] hover:bg-indigo-300 transition ease-in-out duration-300 flex justify-between mx-4 rounded-[10px]">
                <div className="w-full h-full flex flex-col justify-center px-4 ">
                    <p className="font-regular font-['Poppins'] text-[14px] text-[#1C1C26]">Total Balance</p>
                    <h2 className="font-bold font-['Poppins'] text-[20px] text-[#1C1C26]">
                        ${userData.balance.toLocaleString()}
                    </h2>
                </div>
                <Link to={'/setting'}>
                <BsThreeDots className="m-4 text-[20px]" />
                </Link>
            </div>
        </div>
    );
};

export default PageHeader;
