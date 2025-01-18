import { useState, useEffect } from "react";
import Confetti from 'react-confetti';

interface RBCProps {
    goToHome: () => void;
}

export default function RBC({ goToHome }: RBCProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const validatePassword = async (pass: string): Promise<boolean> => {
        // Simulate password validation
        return pass === "password123";
    };

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 5000); // Show confetti for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    return (
        <div className="relative w-full h-full bg-[#006AC3] bg-[url('/assets/images/rbc-icon.png')] bg-contain bg-center">
            {showConfetti && <Confetti />}
            
            {/* Back Button */}
            <button
                onClick={goToHome}
                className={`relative z-10 m-4 font-bold ${isLoggedIn ? "text-[#006AC3] hover:text-[#018cfe]" : "text-gray-200 hover:text-white"}`}
            >
                Back
            </button>

            {/* Centered Card */}
            {!isLoggedIn ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">RBC Online Banking Login</h2>
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
                        {error && (
                            <p className="text-red-500 text-sm">Incorrect password</p>
                        )}
                        <button 
                            onClick={async () => {
                                const isValid = await validatePassword(password);
                                if (isValid) {
                                    setError(false);
                                    setIsLoggedIn(true);
                                    setShowConfetti(true);
                                } else {
                                    setError(true);
                                }
                            }} 
                            className="w-full bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 w-full h-full bg-white">
                    <div className="absolute rounded-full top-4 right-4 w-12 h-12 bg-[url('/assets/images/rbc-icon.png')] bg-contain bg-center bg-no-repeat"></div>
                    <h2 className="text-2xl font-bold text-center pt-8">Dashboard</h2>
                    <p className="text-center text-gray-600 mb-8">Welcome to RBC Online Banking</p>
                    
                    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-700">Account Balance</h3>
                            <p className="text-3xl font-bold text-blue-600">$109384.23</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-lg shadow">
                                <h4 className="font-medium mb-2">Make a Deposit</h4>
                                <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                    Deposit Funds
                                </button>
                            </div>

                            <div className="p-4 bg-white rounded-lg shadow">
                                <h4 className="font-medium mb-2">Transfer Money</h4>
                                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                    New Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
