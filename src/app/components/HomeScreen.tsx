import { FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  FaChrome,
  FaCamera,
  FaImage,
  FaCalendar,
  FaCalculator,
  FaCog,
  FaGooglePlay,
  FaGoogle,
  FaClock,
} from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";
import Image from "next/image";

// Define the props type
interface HomeScreenProps {
  goToChat: () => void; // Function type
}

export default function HomeScreen({ goToChat }: HomeScreenProps) {
  const appIcons = [
    { name: "messages", icon: <FaMessage size={40} />, action: goToChat }, // Navigate to Chat
    { name: "email", icon: <MdEmail size={50} /> },
    { name: "browser", icon: <FaChrome size={45} /> },
    { name: "camera", icon: <FaCamera size={45} /> },
    { name: "gallery", icon: <FaImage size={45} /> },
    { name: "calendar", icon: <FaCalendar size={45} /> },
    { name: "calculator", icon: <FaCalculator size={45} /> },
    { name: "settings", icon: <FaCog size={45} /> },
    { name: "store", icon: <FaGooglePlay size={45} /> },
    { name: "google", icon: <FaGoogle size={45} /> },
    { name: "netflix", icon: <RiNetflixFill size={45} /> },
    { name: "clock", icon: <FaClock size={45} /> },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Background Image */}
      <Image
        src="/assets/images/tabletbg.png"
        layout="fill"
        objectFit="cover"
        alt="tablet background"
        className="absolute"
      />
      {/* App Icons Grid */}
      <div className="grid grid-cols-4 gap-8 gap-x-14 items-center justify-items-center content-center z-10">
        {appIcons.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-2xl shadow-xl hover:-translate-y-2 duration-300 cursor-pointer"
            onClick={item.action} // Trigger navigation when clicked
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
