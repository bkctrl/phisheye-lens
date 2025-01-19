interface ChatBubbleProps {
    text: string; // The message text
    type: "sent" | "received"; // Message type
    timestamp: string; // The message timestamp
    name: string;
  }
  
  export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, type, timestamp, name }) => {
    const isSent = type === "sent";
    return (
      <div
        className={`flex ${isSent ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`p-3 rounded-lg max-w-xs ${
            isSent ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          } break-words`}
        >
          <p className="font-bold">{name}</p>
          <p>{text}</p>
          <span className={`text-xs block mt-1 ${
            isSent ? "text-gray-50" : "text-gray-500"
          }`}>
            {timestamp}
          </span>
        </div>
      </div>
    );
  };
  