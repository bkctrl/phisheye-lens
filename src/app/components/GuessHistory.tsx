import { globals } from "@/api/api";
import { useState } from "react";

export default function GuessHistory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 top-4 p-3 bg-[#0A2540] text-[#F6F8FF] rounded-lg hover:bg-[#0f3259] transition-colors font-mono"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            
            <div
                className={`fixed left-4 top-1/2 -translate-y-1/2 w-1/6 h-[85vh] bg-[#0A2540] text-[#F6F8FF] shadow-xl rounded-lg p-4 font-mono transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Guess History</h1>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-[#0f3259] rounded-lg transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
                    </button>
                </div>
                <ul className="list-disc list-inside">
                    {globals.guessHistory?.map((guess: string, index: number) => (
                        <li key={index} className="mb-2">{guess}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}
