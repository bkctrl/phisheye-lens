"use client";
import { useState } from "react";
import { AndroidTabMockup } from "react-device-mockup";
import HomeScreen from "./HomeScreen";
import Chat from "./Chat";

const Phone = () => {
  const [currentScreen, setCurrentScreen] = useState<"home" | "chat">("home"); // State with a union type for allowed screen values

  const goToHome: () => void = () => setCurrentScreen("home"); // Function to navigate to the home screen
  const goToChat: () => void = () => setCurrentScreen("chat"); // Function to navigate to the chat screen

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(10,37,64)]">
      {/* Phone Frame */}
      <AndroidTabMockup screenWidth={600} screenHeight={450} isLandscape>
        <div className="relative w-full h-full bg-gray-200">
          {currentScreen === "home" && <HomeScreen goToChat={goToChat} />}
          {currentScreen === "chat" && <Chat goToHome={goToHome} />}
        </div>
      </AndroidTabMockup>
    </div>
  );
};

export default Phone;
