import { useState, useEffect } from "react";
import { ChatBubble } from "../ui/chatBubble";
import { globals } from "@/api/api";
// import { ChatBubble } from "./ChatBubble";

interface ChatProps {
  goToHome: () => void;
}

interface Message {
  text: string;
  type: "sent" | "received";
  timestamp: string; // Timestamp for the message
}

export default function Chat({ goToHome }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How are you?", type: "received", timestamp: "10:00 AM" },
    { text: "I'm good, thanks!", type: "sent", timestamp: "10:01 AM" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Get the current time in HH:MM AM/PM format
      setMessages([
        ...messages,
        { text: input, type: "sent", timestamp: currentTime },
      ]);
      setInput(""); // Clear input
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
        <button onClick={goToHome} className="text-white">
          Back
        </button>
        <h1 className="text-lg font-bold">Messages</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            text={msg.text}
            type={msg.type}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-white border border-gray-300"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
