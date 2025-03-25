import React, { useEffect, useState } from 'react';
import { FaBell } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import {Link} from "react-router-dom";

const SmallIconBtn = ({ Icon, route = "/" }) => {
    return (
        <Link to={route} className="no-underline">
            <div className="rounded-[10px] mx-1 bg-[#ECEBEB] p-2.5 border border-transparent
                text-center text-[22px] text-[#1C1C26] transition-all shadow-sm
                hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700
                hover:bg-[#1C1C26] hover:text-white active:shadow-none
                disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                cursor-pointer">
                <Icon />
            </div>
        </Link>
    );
};

const ProfileCard = () => {
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
        <div className="w-full h-[70px] bg-white rounded-[20px] flex items-center justify-between">
            <div className="mx-[15px] flex items-center justify-between">
                <SmallIconBtn Icon={FaBell} route="/notification" />
                <SmallIconBtn Icon={ImProfile} route="/setting" />
            </div>
            <div className="Information-user flex items-center justify-between px-[15px]">
                <div className="info-user px-[10px]">
                    <h3 className="text-[14px] font-['Poppins'] font-regular text-right">{userData.username}</h3>
                    <p className="text-[10px] font-['Poppins'] font-regular">{userData.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
