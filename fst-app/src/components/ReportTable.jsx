import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const ReportTable = ({ transactions }) => {
    const [filter, setFilter] = useState('All Transaction');

    const filteredTransactions = transactions.filter((transaction) => {
        if (filter === 'All Transaction') return true;
        return transaction.type === filter;
    });

    const handlePrint = () => {
        const printContent = `
            <h1>Transaction Report</h1>
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="padding: 8px;">Description</th>
                        <th style="padding: 8px;">Type</th>
                        <th style="padding: 8px;">Amount</th>
                        <th style="padding: 8px;">Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredTransactions.map((transaction) => `
                        <tr>
                            <td style="padding: 8px;">${transaction.description}</td>
                            <td style="padding: 8px;">${transaction.type}</td>
                            <td style="padding: 8px;">${transaction.type === 'income' ? '+' : transaction.type === 'spending' ? '-' : ''}$${transaction.amount}</td>
                            <td style="padding: 8px;">${transaction.date}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head><title>Print Transaction Report</title></head>
                <body>${printContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const renderAmount = (amount, type) => {
        if (type === 'income') return <p className="text-sm text-green-500">+${amount}</p>;
        if (type === 'spending') return <p className="text-sm text-red-500">-${amount}</p>;
        return <p className="text-sm text-slate-800">${amount}</p>;
    };

    const renderTypeBadge = (type) => {
        let badgeClass = '';
        switch (type) {
            case 'income':
                badgeClass = 'bg-green-100 text-green-800';
                break;
            case 'spending':
                badgeClass = 'bg-red-100 text-red-800';
                break;
            case 'loans':
                badgeClass = 'bg-yellow-100 text-yellow-800';
                break;
            case 'saving':
                badgeClass = 'bg-blue-100 text-blue-800';
                break;
            default:
                badgeClass = 'bg-gray-100 text-gray-800';
        }
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
                {type}
            </span>
        );
    };

    return (
        <div className="w-full h-full bg-white rounded-[20px]">
            <div className="w-full h-[150px] flex flex-col justify-center px-[24px]">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold font-['Poppins'] text-[#1C1C26] text-[28px]">Report</h1>
                    <button
                        onClick={handlePrint}
                        className="px-4 py-2 bg-[#1C1C26] text-white rounded-[10px] text-sm hover:bg-[#333]"
                    >
                        Print Report
                    </button>
                </div>
                <div>
                    <div className="w-full max-w-sm min-w-[200px]">
                        <div className="mt-[19px] relative">
                            <select
                                id="Report"
                                name="Report"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-[218px] h-[40px] border border-blue-600 appearance-none rounded-[15px] bg-[#1C1C26] py-1.5 pr-10 pl-4 text-bold text-[18px] font-['Poppins'] text-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1C1C26] sm:text-sm/6"
                            >
                                <option>All Transaction</option>
                                <option>spending</option>
                                <option>income</option>
                                <option>loans</option>
                                <option>saving</option>
                            </select>
                            <IoIosArrowDown
                                className="absolute bottom-0.5 left-1/2 transform -translate-y-1/2 text-white text-[18px] pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex items-center justify-between">
                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white rounded-[20px] bg-clip-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Description</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Type</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Amount</p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">Date</p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-slate-50">
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="block text-sm text-slate-800">{transaction.description}</p>
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {renderTypeBadge(transaction.type)}
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        {renderAmount(transaction.amount, transaction.type)}
                                    </td>
                                    <td className="p-4 border-b border-slate-200">
                                        <p className="block text-sm text-slate-800">{transaction.date}</p>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-slate-800">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportTable;