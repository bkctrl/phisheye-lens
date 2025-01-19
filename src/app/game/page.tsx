"use client";
import Phone from "@/app/components/Phone";
import RegexCard from '@/app/components/RegexCard';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Phone/>
      <RegexCard/>
      <div className="fixed bottom-4 right-4 m-4 z-40">
        <button onClick={() => window.location.href = "/"} className="bg-red-500 text-white rounded-lg p-4 hover:bg-red-600 transition-colors text-lg font-semibold">End Game</button>
      </div>
    </div>
  );
}