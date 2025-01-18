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
  goToChat: () => void;
  goToEmail: () => void;
  goToRBC: () => void;
}

export default function HomeScreen({ goToChat, goToEmail, goToRBC }: HomeScreenProps) {
  const appIcons = [
    { name: "Messages", icon: <FaMessage size={40} className="text-dark-green"/>, action: goToChat }, // Navigate to Chat
    { name: "Email", icon: <MdEmail size={50} className="text-dark-green"/>, action: goToEmail },
    { name: "Browser", icon: <FaChrome size={45} className="text-dark-green"/> },
    { name: "Camera", icon: <FaCamera size={45} className="text-dark-green"/> },
    { name: "Gallery", icon: <FaImage size={45} className="text-dark-green"/> },
    { name: "Calendar", icon: <FaCalendar size={45} className="text-dark-green"/> },
    { name: "Calculator", icon: <FaCalculator size={45} className="text-dark-green"/> },
    { name: "Settings", icon: <FaCog size={45} className="text-dark-green"/> },
    { name: "Store", icon: <FaGooglePlay size={45} className="text-dark-green"/> },
    { name: "Netflix", icon: <RiNetflixFill size={45} className="text-dark-green"/> },
    { name: "Clock", icon: <FaClock size={45} className="text-dark-green"/> },
    { name: "RBC", icon: (
      <div className="filter dark-green-filter">
        <Image src="/assets/images/rbc-icon.png" width={65} height={65} alt="rbc" />
      </div>
    ), action: goToRBC },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Background Image */}
      <Image
        src="/assets/images/tabletbg.png"
        layout="fill"
        objectFit="cover"
        alt="tablet background"
        className="absolute z-0"
        priority
      />
      {/* App Icons Grid */}
      <div className="grid grid-cols-4 gap-12 gap-x-16 items-center justify-items-center content-center z-10">
        {appIcons.map((item, index) => (
          <div
            key={index}
            className="flex-row items-center justify-center justify-items-center hover:scale-110 duration-200"
            onClick={item.action} // Trigger navigation when clicked
          >
            <div className="flex items-center justify-center w-16 h-16 bg-light-cyan overflow-hidden rounded-2xl shadow-xl transition-transform transform hover:scale-110 hover:-translate-y-1">
              {item.icon}
            </div>
            <span className="mt-2 text-xs text-center text-simple-light">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
