"use client";
import { useState } from "react";
interface RBCProps {
    goToHome: () => void;
}

export default function RBC({ goToHome }: RBCProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [balance, setBalance] = useState(10000); // Starting balance of $10,000

    const dummyPassword = "password123"; // Matching the server's dummy password

    const handleLogin = () => {
        if (password === dummyPassword) {
            setIsLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleDeposit = () => {
        setBalance(prevBalance => prevBalance + 100); // Deposit $100
    };

    const handleTransfer = () => {
        if (balance >= 100) {
            setBalance(prevBalance => prevBalance - 100); // Transfer $100
        } else {
            alert('Insufficient funds');
        }
    };

    if (isLoggedIn) {
        return (
            <div className="w-full h-full bg-[#006AC3]">
                <div className="w-full h-full flex flex-col">
                    <div className="bg-white p-4 shadow-md">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <button
                                onClick={goToHome}
                                className="text-blue-600 hover:text-blue-800 font-bold"
                            >
                                Back
                            </button>
                            <img src="/assets/images/rbc-icon.png" alt="RBC Icon" className="w-10 h-10 rounded-full" />
                        </div>
                    </div>
                    
                    <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
                        <div className="bg-white rounded-lg shadow-xl p-8">
                            <h2 className="text-3xl font-bold mb-8 text-gray-800">Account Dashboard</h2>
                            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                                <p className="text-xl font-semibold text-gray-600">Current Balance</p>
                                <p className="text-4xl font-bold text-blue-600 mt-2">${balance.toLocaleString()}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <button 
                                    onClick={handleDeposit}
                                    className="bg-green-500 text-white rounded-lg p-4 hover:bg-green-600 transition-colors text-lg font-semibold"
                                >
                                    Deposit
                                </button>
                                <button 
                                    onClick={handleTransfer}
                                    className="bg-blue-500 text-white rounded-lg p-4 hover:bg-blue-600 transition-colors text-lg font-semibold"
                                >
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-[#006AC3] bg-[url('/assets/images/rbc-icon.png')] bg-contain bg-center">
            {/* Back Button */}
            <button
                onClick={goToHome}
                className="relative z-10 m-4 text-white hover:text-gray-200"
            >
                Back
            </button>
    
            {/* Centered Card */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
