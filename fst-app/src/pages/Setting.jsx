import React, { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar.jsx";
import InputField from "../components/InputField.jsx";
import { FaPenAlt } from "react-icons/fa";
import Button from "../components/button.jsx";
import axios from 'axios';

const Setting = () => {
    const [userData, setUserData] = useState(null);
    const [userState, setUserState] = useState({
        is_locked: false,
        notifications_enabled: true,
    });
    const [msg, setMsg] = useState("");
    const [updatedUserData, setUpdatedUserData] = useState({
        username: '',
        email: '',
        balance_amount: '',
        picture: null,
    });

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No auth token found');

            const response = await axios.get('http://localhost:8000/api/get-user-profile/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = response.data;
            setUserData(data);
            setUpdatedUserData({
                username: data.username,
                email: data.email,
                balance_amount: data.balance || '',
                picture: null,
            });
        } catch (error) {
            setMsg(error.response?.data?.error || "Failed to fetch user data.");
            setUserData(null);
        }
    };

    const fetchUserState = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No auth token found');

            const response = await axios.get('http://localhost:8000/api/user-state/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUserState(response.data);
        } catch (error) {
            setMsg(error.response?.data?.error || "Failed to fetch user state.");
        }
    };

    const updateUserState = async (key, value) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post('http://localhost:8000/api/user-state/',
                { [key]: value },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setUserState(response.data);
            setMsg(response.data.message || "State updated successfully");
            location.reload();
        } catch (error) {
            setMsg(error.response?.data?.error || "Failed to update user state.");
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchUserState();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (updatedUserData.username) formData.append('username', updatedUserData.username);
        if (updatedUserData.email) formData.append('email', updatedUserData.email);
        if (updatedUserData.balance_amount !== '') formData.append('balance_amount', updatedUserData.balance_amount);
        if (updatedUserData.picture) formData.append('picture', updatedUserData.picture);

        try {
            const response = await axios.post('http://localhost:8000/api/update-profile/', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setUserData(response.data.user);
            setMsg(response.data.message);
            setUpdatedUserData(prev => ({ ...prev, picture: null }));
            setTimeout(() => setMsg(""), 5000);
        } catch (error) {
            setMsg(error.response?.data?.error || "Failed to update profile.");
        }
    };

    const handlePictureChange = (file) => {
        setUpdatedUserData({ ...updatedUserData, picture: file });
    };

    if (!userData) {
        return (
            <div>
                {msg ? <div className="text-red-500">{msg}</div> : "Loading..."}
            </div>
        );
    }

    return (
        <div className="flex justify-start min-h-screen">
            <aside className="fixed top-0 left-0 h-screen p-[19px] z-10">
                <Sidebar />
            </aside>
            <main className="flex ml-[259px] py-[19px]">
                <div className="flex flex-col w-full h-full">
                    <div className="w-[1220px] h-[943px] bg-white rounded-[20px] flex flex-col">
                        <h1 className="font-['Poppins'] text-[28px] font-black py-[20px] px-[40px]">Settings</h1>
                        {msg && (
                            <div className={`text-center py-2 ${msg.includes("success") ? "text-green-500" : "text-red-500"}`}>
                                {msg}
                            </div>
                        )}
                        <form onSubmit={updateUser}>
                            <div className="flex px-[50px] pt-[40px]">
                                <div className="gap-[10px] flex flex-col ml-8">
                                    <h1 className="font-['Poppins'] text-[28px] font-black px-[40px]">Personal Information</h1>
                                    <div className="px-[35px]">
                                        <InputField
                                            placeholder="Username"
                                            value={updatedUserData.username}
                                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, username: e.target.value })}
                                            disabled={userState.is_locked}
                                        />
                                    </div>
                                    <div className="px-[35px]">
                                        <InputField
                                            placeholder="Email"
                                            value={updatedUserData.email}
                                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
                                            disabled={userState.is_locked}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="mx-8 mt-[20px] border-t-1 border-[#C8C8C8]" />
                            <div className="flex px-[50px] pt-[40px]">
                                <div className="gap-[10px] flex flex-col">
                                    <h1 className="font-['Poppins'] text-[28px] font-black px-[10px] pb-[30px]">Account</h1>
                                    <div className="px-[35px] flex gap-[40px]">
                                        <div>
                                            <label>Balance</label>
                                            <InputField
                                                placeholder="Balance"
                                                value={updatedUserData.balance_amount}
                                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, balance_amount: e.target.value })}
                                                disabled={userState.is_locked}
                                                type="number"
                                            />
                                        </div>
                                        <div>
                                            <label>Expense</label>
                                            <InputField
                                                placeholder="Expense"
                                                value={userData.total_expense || 0}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="px-[35px]">
                                        <label>Saving</label>
                                        <InputField
                                            placeholder="Saving"
                                            value={0}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr className="mx-8 mt-[20px] border-t-1 border-[#C8C8C8]" />
                            <ToggleSwitch
                                label="Lock Account"
                                isChecked={userState.is_locked}
                                onToggle={() => updateUserState('is_locked', !userState.is_locked)}
                            />
                            <div className="flex justify-end py-[50px] px-[40px] gap-2">
                                <Button text="Save" width="120px" type="submit" disabled={userState.is_locked} />
                                <Button text="Cancel" width="120px" bgColor="#E6E6E6" textColor="black" onClick={() => fetchUserData()} />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

const ToggleSwitch = ({ label, isChecked, onToggle }) => {
    return (
        <div className="flex px-[50px] pt-[10px] items-center">
            <div className="relative inline-block w-11 h-5">
                <input
                    id={`switch-${label}`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={onToggle}
                    className="peer hidden"
                />
                <label
                    htmlFor={`switch-${label}`}
                    className={`block w-11 h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                        isChecked ? "bg-green-600" : "bg-slate-100"
                    }`}
                ></label>
                <div
                    className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 ${
                        isChecked ? "translate-x-6 border-green-600" : ""
                    }`}
                ></div>
            </div>
            <label className="text-slate-600 text-[16px] cursor-pointer px-[20px]">
                {label}
            </label>

        </div>
    );
};

const ProfilePicture = ({ picture, onPictureChange, disabled }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (picture) {
            setImage(`/img/profile_pics/${picture}`);
        } else {
            setImage("/img/profile.webp");
            setError('No picture provided');
        }
    }, [picture]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = `/img/profile_pics/${file.name}`;
            setImage(imageUrl);
            setError(null);
            onPictureChange(file);
        }
    };

    const openFilePicker = () => {
        if (!disabled) {
            document.getElementById("file-input").click();
        }
    };

    return (
        <div className="relative inline-block">
            <img
                src={image || "/img/profile.webp"}
                alt="avatar"
                className="h-[120px] w-[120px] rounded-full object-cover object-center"
                onError={(e) => {
                    setError('Image failed to load');
                    e.target.src = "/img/profile.webp";
                }}
            />
            {error && (
                <div className="absolute bottom-0 left-0 text-red-500 text-xs bg-white p-1 rounded">
                    {error}
                </div>
            )}
            <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={disabled}
            />
            <FaPenAlt
                className={`absolute top-1 right-0 text-white bg-gray-800 p-2 rounded-full text-[30px] ${
                    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                onClick={openFilePicker}
            />
        </div>
    );
};

export default Setting;