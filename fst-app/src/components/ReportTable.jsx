import React from 'react'
import {IoIosArrowDown} from "react-icons/io";

const ReportTable = () => {
    return (
        <div className="w-full h-full bg-white rounded-[20px]">
            <div className="w-full h-[150px] flex flex-col justify-center px-[24px] ">
                <div>
                    <h1 className="font-bold font-['Poppins'] text-[#1C1C26] text-[28px]">Report</h1>
                </div>
                <div>
                    <div className="w-full max-w-sm min-w-[200px]">
                        <div className="mt-[19px] relative">
                            <select
                                id="Report"
                                name="Report"
                                autoComplete="UserReport"
                                className="w-[218px] h-[40px] border border-blue-600 appearance-none rounded-[15px] bg-[#1C1C26] py-1.5 pr-10 pl-4 text-bold text-[18px] font-['Poppins'] text-white outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1C1C26] sm:text-sm/6"
                            >
                                <option>All Transaction</option>
                                <option>Bills</option>
                                <option>Income</option>
                            </select>
                            <IoIosArrowDown
                                className="absolute bottom-0.5 left-1/2 transform -translate-y-1/2 text-white text-[18px] pointer-events-none"
                            />
                        </div>
                    </div>
                </div>


            </div>
            <div className="w-full h-full flex items-center justify-between">
                <div
                    className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white  rounded-[20px] bg-clip-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
export default ReportTable
