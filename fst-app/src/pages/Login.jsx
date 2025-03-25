import React, { useState } from 'react';
import InputField from "../components/InputField.jsx";
import Button from "../components/button.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSignupLoad = () => {
        // Add logout logic here (e.g., clear auth)
        navigate('/signup'); // Redirect to login page
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg("");  // Reset message before making the request

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });

            // Assuming the backend returns a token on successful login
            if (response.status === 200) {
                const { token } = response.data;  // The token returned from your backend
                localStorage.setItem('authToken', token);  // Store the token in localStorage
                setMsg("Login successful!");

                // Redirect to another page after successful login
                navigate('/dashboard');  // Redirect to dashboard or home
            }
        } catch (error) {
            // Handle errors (e.g., wrong username/password)
            if (error.response && error.response.data) {
                setMsg(error.response.data.detail || "Login failed, please try again.");
            } else {
                setMsg("Network error, please try again.");
            }
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-slate-300 ">
            <div className="w-[1170px] h-[751px] flex justify-center items-center m-14 bg-white rounded-[20px] shadow-[1px_1px_5px_1px_rgba(0,0,0,0.10)] flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-full flex justify-center items-center">
                    <form className="w-[415px] h-[420px]" onSubmit={handleLogin}>
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
                        <div className="mb-[15px]">
                            <InputField
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button text="login" type="submit" />

                        <label className="flex justify-center px-2 py-2 text-[18px] font-['Cabin']">
                            <a onClick={handleSignupLoad}>or <span className="text-blue-600">signup!!!</span></a>
                        </label>

                        {/* Displaying the message (success or error) */}
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
