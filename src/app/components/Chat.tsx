import { useState, useEffect, useRef } from "react";
import { ChatBubble } from "../ui/chatBubble";
import { globals, sendMessage } from "@/api/api";
import type { Message, Sender, Recipient } from "@/api/api";

interface ChatProps {
  goToHome: () => void;
}

interface VMessage {
  text: string;
  type: "sent" | "received";
  timestamp: string;
  name: string;
}

export default function Chat({ goToHome }: ChatProps) {
  const [messages, setMessages] = useState<VMessage[]>([
    { text: "Hi! How are you?", type: "received", timestamp: "10:00 AM", name: "test_user" },
    { text: "I'm good, thanks!", type: "sent", timestamp: "10:01 AM", name: "test_user" },
  ]);
  const [input, setInput] = useState("");
  const [personName, setPersonName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const userMessage: VMessage = {
        text: input,
        type: "sent" as const,
        timestamp: currentTime,
        name: "You"
      }
      
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const globalUserMessage: Message = {
        sender: { name: "Unknown Number", email: "" },  // Add appropriate email if available
        recipient: { name: "Bot", email: "" }, // Add appropriate email if available
        message: input,
        senderType: "user"
      };
      if (globals.messages) {
        globals.messages.push(globalUserMessage);
      }
      
      const response = await sendMessage(input);
      if (response) {
        const currentTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const responseMessage: VMessage = {
          text: response,
          type: "received" as const,
          timestamp: currentTime,
          name: personName
        };
        setMessages(prevMessages => [...prevMessages, responseMessage]);

        const globalResponseMessage: Message = {
          sender: { name: responseMessage.name, email: "" },  // Add appropriate email if available
          recipient: { name: responseMessage.name, email: "" }, // Add appropriate email if available
          message: responseMessage.text,
          senderType: "AI"
        };
        if (globals.messages) {
          globals.messages.push(globalResponseMessage);
        }
      }
      setInput("");
    }
  };

  useEffect(() => {
    const apiMessages = globals.messages;
    if (apiMessages && Array.isArray(apiMessages) && apiMessages.length > 0) {
      const fetchedMessages: VMessage[] = apiMessages.map((message: any) => {
        const currentTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        if (message.sender.name !== "Unknown Number" && !personName) {
          setPersonName(message.sender.name);
        }
        return {
          text: message.message.substring(3),
          type: message.sender.name === "Unknown Number" ? ("sent" as const) : ("received" as const),
          timestamp: message.timestamp || currentTime,
          name: message.sender.name === "Unknown Number" ? "You" : message.sender.name
        };
      });
      setMessages(fetchedMessages);
    }
  }, [globals.messages]);

  return (
    <div className="flex flex-col h-full bg-[#134B70]">
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
            name={msg.name}
          />
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
      </div>

      {/* Chat Input */}
      <div className="p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-white border border-gray-300"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}