import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import SignUp from "./pages/SignUp.jsx";
import DebtandLoan from "./pages/DebtandLoan.jsx";
import Expense from "./pages/Expense.jsx";
import Setting from "./pages/Setting.jsx";
import Reports from "./pages/Report.jsx";
import Investment from "./pages/Invesment.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";

function App() {
    return (
        <Router>
            <div className="App w-full h-full">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/Expense" element={<Expense />} />
                    <Route path="/Debt&Loan" element={<DebtandLoan />} />
                    <Route path="/Investment" element={<Investment />} />
                    <Route path="/Reports" element={<Reports />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/notification" element={<NotificationPage />} />


                </Routes>
            </div>
        </Router>
    );
}

export default App;
