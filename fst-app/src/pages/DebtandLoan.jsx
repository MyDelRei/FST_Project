import React, { useState } from 'react';
import Sidebar from "../components/sidebar.jsx";
import PageHeader from "../components/pageHeader.jsx";
import ProfileCard from "../components/profileCard.jsx";
import InfoCard from "../components/infoCard.jsx"; // Updated version
import { TbMoneybag } from "react-icons/tb";
import { TbBusinessplan } from "react-icons/tb";
import { SiMoneygram } from "react-icons/si";
import ActiveLoanTable from "../components/ActiveLoanTable.jsx";
import LoanOverlayForm from "../components/loanOverlayForm.jsx"; // Adjust path

const DebtandLoan = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [overlayData, setOverlayData] = useState({});

    const handleCardClick = (title, amount) => {
        const typeMap = {
            "Personal Loan": "personal",
            "Business Loan": "business",
            "Custom Loan": "custom",
        };
        const loanType = typeMap[title] || "custom";
        const cleanAmount = amount.replace(/[^0-9.]/g, ""); // Remove $, commas, etc.

        // Set interest rates based on loan type
        const interestRateMap = {
            personal: "5.00",  // 5% for Personal Loan
            business: "7.50",  // 7.5% for Business Loan
            custom: "0.00",    // 0% for Custom Loan
        };

        setOverlayData({
            amount: cleanAmount || "", // Ensure it’s a string for input
            loan_type: loanType,
            interest_rate: interestRateMap[loanType],
        });
        setIsOverlayOpen(true);
    };

    const handleOverlaySubmit = (data) => {
        console.log("Loan Submitted:", data); // Replace with API call if needed
    };

    return (
        <div className="flex justify-start min-h-screen">
            <aside className="fixed top-0 left-0 h-screen p-[19px] z-10">
                <Sidebar />
            </aside>
            <main className="flex ml-[259px] py-[19px]">
                <div className="flex flex-col w-full h-full">
                    <div className="w-full flex">
                        <div className="w-[700px]">
                            <PageHeader />
                        </div>
                        <div className="w-[550px] px-[19px] flex flex-col">
                            <ProfileCard />
                        </div>
                    </div>
                    <div className="flex justify-start gap-[28px] w-full h-[120px] py-[19px]">
                        <InfoCard
                            title="Personal Loan"
                            Descripton="$2,000"
                            onClick={() => handleCardClick("personal", "2,000")}
                        />
                        <InfoCard
                            title="Debt Amount"
                            Descripton="$$$$"
                            Icon={TbMoneybag}
                        />
                        <InfoCard
                            title="Business Loan"
                            Descripton="$50,000"
                            Icon={TbBusinessplan}
                            onClick={() => handleCardClick("business", "50,000")}
                        />
                        <InfoCard
                            title="Custom Loan"
                            Descripton="$$$"
                            Icon={SiMoneygram}
                            onClick={() => handleCardClick("custom", "0")}
                        />
                    </div>
                    <div className="w-full h-full pt-[39px] mb-[150px] pr-[19px]">
                        <ActiveLoanTable />
                    </div>
                </div>
            </main>
            <LoanOverlayForm
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onSubmit={handleOverlaySubmit}
                initialData={overlayData}
            />
        </div>
    );
};

export default DebtandLoan;