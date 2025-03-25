import React, { useState } from 'react';
import InputField from "../components/InputField.jsx";
import Button from "../components/button.jsx";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const nagivate = useNavigate();

    const handleloginLoad = () => {
        nagivate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        // Basic password matching check
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/signup/', {
                username,
                email,
                password,
                confirm_password: confirmPassword
            });
            setSuccess(response.data.message);
            // Clear form fields after success
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => nagivate('/login'), 3000);

        } catch (err) {

            const errorMessage = err.response?.data?.error || err.message || "An error occurred during signup";
            setError(errorMessage);


        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center bg-slate-300">
            <div className="w-[1170px] h-[751px] flex justify-center items-center m-14 bg-white rounded-[20px] shadow-[1px_1px_5px_1px_rgba(0,0,0,0.10)] flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-full flex justify-center items-center">
                    <form className="w-[415px] h-[550px]" onSubmit={handleSubmit}>
                        <div className="flex items-center justify-center">
                            <img src="/public/img/logo.svg" alt="Logo" />
                            <h1 className="text-[40px] font-['Cabin'] font-semibold px-[23px] py-[30px]">Signup</h1>
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
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <div className="mb-[15px]">
                            <InputField
                                placeholder="confirm password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button text="signup" type="submit" />
                        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
                        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                        <label className="flex justify-center px-2 py-2 text-[18px] font-['Cabin']" onClick={handleloginLoad}>
                            <a>Already have an account? <span className="text-blue-600">login!!!</span></a>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
