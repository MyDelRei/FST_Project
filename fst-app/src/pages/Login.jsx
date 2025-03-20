import React, { useState } from 'react';
import InputField from "../components/InputField.jsx";
import Button from "../components/button.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMsg(data.message);
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setMsg(data.error);
            }
        } catch (error) {
            setMsg("Network error");
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-slate-300 ">
            <div className="w-[1170px] h-[751px] flex justify-center items-center m-14 bg-white rounded-[20px] shadow-[1px_1px_5px_1px_rgba(0,0,0,0.10)] flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-full flex justify-center items-center">
                    <form className="w-[415px] h-[420px]" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                        <div className="flex items-center justify-center">
                            <img src="/public/img/logo.svg" alt="Logo" />
                            <h1 className="text-[40px] font-['Cabin'] font-semibold px-[23px] py-[30px]">login</h1>
                        </div>
                        <div className="mb-[15px]">
                            <InputField
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <InputField
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <label className="flex justify-end px-2 py-2 text-[18px] text-[#999999] font-['Cabin']">
                            <a>forgot password?</a>
                        </label>
                       <Button text="login" type="submit"/>

                        <label className="flex justify-center px-2 py-2 text-[18px] font-['Cabin']">
                            <a>or <span className="text-blue-600">signup!!!</span></a>
                        </label>
                        {msg && (
                            <p className={`text-center mt-2 ${msg.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                                {msg}
                            </p>
                        )}
                    </form>
                </div>
                <div className="hidden md:flex w-1/2 h-full justify-center items-center">
                    <div className="w-[562px] h-[727px] rounded-[20px] overflow-hidden">
                        <img src="/public/img/city.jpg" alt="City" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;