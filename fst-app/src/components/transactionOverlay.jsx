import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const TransactionOverlay = ({ open, onClose, transactionData }) => {
    const [description, setDescription] = useState(transactionData.description);
    const [type, setType] = useState(transactionData.type);
    const [date, setDate] = useState(transactionData.date);
    const [amount, setAmount] = useState(transactionData.amount);
    const [status, setStatus] = useState(transactionData.status);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/update-transaction/${transactionData.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    description,
                    type,
                    status,
                    amount,
                }),
            });

            if (response.ok) {
                console.log('Transaction updated successfully');
                location.reload();
                onClose(); // Close the overlay
            } else {
                console.error('Failed to update transaction');
            }
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/delete-transaction/${transactionData.id}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.ok) {
                console.log('Transaction deleted successfully');
                location.reload();
                onClose(); // Close the overlay after deletion
            } else {
                console.error('Failed to delete transaction');
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        open && (
            <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-opacity-50 z-50">
                <div className="w-[480px] p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl font-bold mb-4">Update Transaction</h2>

                    <div className="mb-4">
                        <InputField
                            placeholder="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={true}
                        />
                    </div>

                    <div className="mb-4">
                        <InputField
                            placeholder="Type"
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            disabled={true}
                        />
                    </div>

                    <div className="mb-4">
                        <InputField
                            placeholder="Date"
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={true}
                        />
                    </div>

                    <div className="mb-4">
                        <InputField
                            placeholder="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="w-full">
                            <select
                                id="status"
                                name="status"
                                className="w-[415px] h-[60px] font-['Cabin'] bg-transparent placeholder:text-slate-400 text-slate-400 text-[20px] border border-slate-200 rounded-[20px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-evenly gap-5">
                        <Button
                            text="Update"
                            type="button"
                            bgColor="#1C1C26"
                            textColor="white"
                            width="200px"
                            height="60px"
                            onClick={handleUpdate}
                        />
                        <Button
                            text="Delete"
                            type="button"
                            bgColor="Red"
                            textColor="white"
                            width="200px"
                            height="60px"
                            onClick={handleDelete}
                        />
                        <Button
                            text="Close"
                            type="button"
                            bgColor="gray"
                            textColor="white"
                            width="200px"
                            height="60px"
                            onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default TransactionOverlay;



