interface RBCProps {
    goToHome: () => void;
  }
  
  export default function RBC({ goToHome }: RBCProps) {
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
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition-colors">
                Login
                </button>
            </div>
            </div>
        </div>
    );
  }
