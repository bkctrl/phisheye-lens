import { submitGuess } from "@/api/api";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";


interface RBCProps {
  goToHome: () => void;
}

export default function RBC({ goToHome }: RBCProps) {
  const [guess, setGuess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const result = await submitGuess(password);
    if (result) {
      setError(false);
      setIsLoggedIn(true);
      setShowConfetti(true);
      setUsername("");
      setPassword("");
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="relative w-full h-full bg-[#006AC3] bg-[url('/assets/images/rbc-icon.png')] bg-contain bg-center">
      {showConfetti && <Confetti />}

      <button
        onClick={goToHome}
        className={`relative z-10 m-4 font-bold ${
          isLoggedIn
            ? "text-[#006AC3] hover:text-[#018cfe]"
            : "text-gray-200 hover:text-white"
        }`}
      >
        Back
      </button>

      {!isLoggedIn ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">RBC Online Banking Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              setUsername("");
              setPassword("");
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">Incorrect password</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-white">
          <h2 className="text-2xl font-bold text-center pt-8">Dashboard</h2>
          <p className="text-center text-gray-600 mb-8">Welcome to RBC Online Banking</p>
          <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700">Account Balance</h3>
              <p className="text-3xl font-bold text-blue-600">$109,384.23</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
