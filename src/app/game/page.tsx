"use client";
import Phone from "@/app/components/Phone";
import GuessHistory from "../components/GuessHistory";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/assets/images/NavyBlue.jpg')] bg-cover bg-center h-64 w-full">
      <GuessHistory/>
      <Phone/>
      <div className="absolute bottom-0 right-0 m-4 z-10">
        <button onClick={() => window.location.href = "/"} className="bg-red-500 text-white rounded-lg p-4 hover:bg-red-600 transition-colors text-lg font-semibold">End Game</button>
      </div>
    </div>
  );
}