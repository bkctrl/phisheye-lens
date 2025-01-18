import { AndroidTabMockup } from 'react-device-mockup'
import { FaMessage } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { 
  FaChrome,
  FaCamera, 
  FaImage,
  FaCalendar,
  FaCalculator,
  FaCog,
  FaGooglePlay,
  FaGoogle,
  FaClock
} from 'react-icons/fa'
import { RiNetflixFill } from 'react-icons/ri'
import Image from 'next/image'


const Phone = () => {
  const appIcons = [
    {name: "messages", icon: <FaMessage size={40}/>},
    {name: "email", icon: <MdEmail size={50}/>},
    {name: "browser", icon: <FaChrome size={45}/>},
    {name: "camera", icon: <FaCamera size={45}/>},
    {name: "gallery", icon: <FaImage size={45}/>},
    {name: "calendar", icon: <FaCalendar size={45}/>},
    {name: "calculator", icon: <FaCalculator size={45}/>},
    {name: "settings", icon: <FaCog size={45}/>},
    {name: "store", icon: <FaGooglePlay size={45}/> },
    {name: "google", icon: <FaGoogle size={45}/> },
    {name: "netflix", icon: <RiNetflixFill size={45}/> },
    {name: "clock", icon: <FaClock size={45}/> },
  ];

  return (
    <div className="p-4">
        <AndroidTabMockup screenWidth={600} isLandscape>
          <div className="w-full flex items-center justify-center">
              <Image src="/assets/images/tabletbg.png" layout="fill" objectFit="cover" alt="phone" style={{zIndex: -1}}/>
              <div className="grid grid-cols-4 gap-8 gap-x-14 items-center justify-items-center content-center">
                {appIcons.map((item, index) => (
                    <div key={index} className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-2xl shadow-xl 
                    hover:-translate-y-2 duration-300">
                      {item.icon}
                    </div>
                ))}
              </div>
          </div>
        </AndroidTabMockup>
    </div>
  )
}

export default Phone