"use client";
import { useState } from "react";
import { AndroidTabMockup } from "react-device-mockup";
import HomeScreen from "./HomeScreen";
import Chat from "./Chat";
import Notepad from '@/app/components/Notepad';

const Phone = () => {
  const [currentScreen, setCurrentScreen] = useState<"home" | "chat">("home"); // State with a union type for allowed screen values

  const goToHome: () => void = () => setCurrentScreen("home"); // Function to navigate to the home screen
  const goToChat: () => void = () => setCurrentScreen("chat"); // Function to navigate to the chat screen

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(10,37,64)]">
      {/* Phone Frame */}
      <AndroidTabMockup screenWidth={900} isLandscape>
        <div className="relative w-full h-full bg-gray-200">
          {currentScreen === "home" && <HomeScreen goToChat={goToChat} />}
          {currentScreen === "chat" && <Chat goToHome={goToHome} />}
        </div>
      </AndroidTabMockup>
      <div className="top-0 right-0 w-2/3 h-1/2 z-10">
        <Notepad />
      </div>
    </div>
  );
};

export default Phone;
