"use client";
import React, { useState } from 'react'
import Phone from "@/app/components/Phone";
import RegexCard from '@/app/components/RegexCard';
import GuessHistory from "../components/GuessHistory";
import {startNewGame, globals } from "@/api/api";

export default function Home() {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleClick = () => {
      window.location.href = "/";
      startNewGame();
  }

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="relative min-h-screen">
      <GuessHistory/>
      <Phone/>
      <RegexCard/>
      <div className="fixed bottom-4 right-4 m-4 z-40 flex flex-col space-y-2">
        <button onClick={togglePopup} className="bg-blue-500 text-white rounded-lg p-4 hover:bg-blue-600 transition-colors text-lg font-semibold">Get Solution</button>
        <button onClick={handleClick} className="bg-red-500 text-white rounded-lg p-4 hover:bg-red-600 transition-colors text-lg font-semibold">End Game</button>
      </div>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-light-cyan p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 font-mono">Password:</h2>
            <p className="font-mono text-simple-dark">{globals.correctPassword}</p>
            <button
              onClick={togglePopup}
              className="mt-4 bg-gray-500 text-white rounded-lg p-2 hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}