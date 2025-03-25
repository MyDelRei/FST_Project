import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField'; // Adjust path
import Button from './button'; // Adjust path

const SavingUpdateOverlay = ({ isOpen, onClose, savingData, onUpdate }) => {
    const [progress, setProgress] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (savingData) {
            setProgress('0.00');
        }
    }, [savingData]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!progress || parseFloat(progress) < 0) {
            setError('Please enter a valid progress amount');
            return;
        }

        const updateData = { amount: progress };

        try {
            const response = await axios.put(
                `http://localhost:8000/api/savings/${savingData.id}/update/`,
                updateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
            console.log('Saving updated:', response.data);
            onUpdate(response.data.saving); // Callback to update parent state
            onClose();
            location.reload();
        } catch (err) {
            console.error('Error updating saving:', err);
            setError(err.response?.data?.message || 'Failed to update saving');
        }
    };

    if (!isOpen || !savingData) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-[460px] shadow-lg">
                <h2 className="font-['Cabin'] text-[24px] text-slate-700 mb-6">
                    Update Saving: {savingData.reason}
                </h2>
                {error && (
                    <div className="mb-4">
                        <p className="text-red-500 text-[16px]">{error}</p>
                    </div>
                )}
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="mb-4">
                        <p className="text-slate-700 text-[16px]">
                            Saving Goal: ${savingData.goal}
                        </p>
                    </div>
                    <InputField
                        placeholder="Progress Amount"
                        type="number"
                        value={progress}
                        onChange={(e) => setProgress(e.target.value)}
                        width="415px"
                        height="60px"
                        step="0.01"
                        min="0"
                    />
                    <div className="flex justify-between mt-6 gap-2">
                        <Button
                            text="Save"
                            type="submit"
                            width="130px"
                            height="60px"
                            bgColor="#1C1C26"
                            textColor="white"
                            hoverBgColor="#333"
                        />
                        <Button
                            text="Cancel"
                            width="130px"
                            height="60px"
                            bgColor="#e0e0e0"
                            textColor="#1C1C26"
                            hoverBgColor="#d1d1d1"
                            onClick={onClose}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SavingUpdateOverlay;