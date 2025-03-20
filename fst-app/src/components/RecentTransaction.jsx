import React from 'react'

const RecentTransaction = () => {
    return (
        <div className="w-full h-[450px] bg-white rounded-[20px]">
            <div className="w-full h-[150px] flex items-center justify-between px-[19px] ">
                <div>
                    <h1 className="font-bold font-['Poppins'] text-[#1C1C26] text-[28px]">Recent Transaction</h1>
                    <p className="text-[18px]"><span className="font-['Poppins'] text-[#1C1C26] font-medium ">12 Total</span>, this week</p>
                </div>
                <div className="flex ">
                    <div className="flex flex-col items-center px-4">
                        <h1 className="text-[28px] font-semibold font-['Poppins']">5</h1>
                        <p className="text-[15px] font-normal font-['Poppins']">Done</p>
                    </div>
                    <div className="flex flex-col items-center px-4">
                        <h1 className="text-[28px] font-semibold font-['Poppins']">12</h1>
                        <p className="text-[15px] font-normal font-['Poppins']">Incomplete</p>
                    </div>
                </div>

            </div>
            <div className="w-full h-[300px] flex items-center justify-between">
                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-[20px] bg-clip-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Role
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Email
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-300 bg-white">
                                <p className="block text-sm font-normal leading-none text-slate-500">
                                    Location
                                </p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    John Michael
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Manager
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    john.michael@example.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    New York, USA
                                </p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Alexa Liras
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Developer
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    alexa.liras@example.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    San Francisco, USA
                                </p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Laurent Perrier
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Executive
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    laurent.perrier@example.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Paris, France
                                </p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Michael Levi
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Developer
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    michael.levi@example.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    London, UK
                                </p>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Alexa Liras
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    Developer
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    alexa.liras@example.com
                                </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <p className="block text-sm text-slate-800">
                                    San Francisco, USA
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default RecentTransaction
