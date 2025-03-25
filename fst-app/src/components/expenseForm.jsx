import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import InputField from "../components/InputField.jsx";
import Button from "./Button.jsx";
import axios from 'axios';

const ExpenseForm = () => {
    // Track form inputs
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('spending');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post(
                'http://localhost:8000/api/transactions/', // Your backend URL here
                {
                    description,
                    type,
                    amount: parseFloat(amount),
                    status: 'pending', // You can modify this based on logic
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
            console.log('Transaction added:', response.data);
            // Reset form after submission
            setDescription('');
            setAmount('');
            location.reload();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className="w-full h-full">
            <h1 className="font-['Poppins'] font-bold text-[24px] text-[#1C1C26] p-8">Add new expense</h1>

            {/* Form for handling input and submission */}
            <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full flex items-center justify-center ">
                    <InputField
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="">
                        <select
                            id="Report"
                            name="Report"
                            autoComplete="UserReport"
                            className="w-[415px] h-[60px] ml-[40px] font-['Cabin'] bg-transparent placeholder:text-slate-400 text-slate-400 text-[20px] border border-slate-200 rounded-[20px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="spending">Spending</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center pt-[10px]">
                    <InputField
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="w-[450px]">
                        <div className="flex gap-2 ml-[40px]">
                            {/* Button type="submit" will trigger the form submission */}
                            <Button type="submit" text="Add" width="145px" />
                            <Button type="button" text="Cancel" width="148px" bgColor={'#E6E6E6'} textColor="black"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;
