import React, {useState} from 'react'
import InputField from "../components/InputField.jsx";
import Button from "../components/button.jsx";

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="w-full h-full flex justify-center items-center bg-slate-300">
            <div className="w-[1170px] h-[751px] flex justify-center items-center m-14 bg-white rounded-[20px] shadow-[1px_1px_5px_1px_rgba(0,0,0,0.10)] flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-full flex justify-center items-center">
                    <form className="w-[415px] h-[550px]">
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
                        <Button text="signup" type="submit" />
                        <label className="flex justify-center px-2 py-2 text-[18px] font-['Cabin']">
                            <a>Already have an account? <span className="text-blue-600">login!!!</span></a>
                        </label>
                    </form>
                </div>

            </div>
        </div>
    );
}
export default SignUp
