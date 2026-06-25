import searchIcon from "../assets/search.png";
import sunIcon from "../assets/sun.png";
import moonIcon from "../assets/moon.png";
import notificationIcon from "../assets/notification.png";
import messageIcon from "../assets/msg.png";
import userImg from "../assets/u2.jpg";
import { useState, useEffect } from "react";
const Navbar = ({ setOpen, darkMode, setDarkMode, setActive }) => {
  const [searchVal, setSearchVal] = useState("");
  const [adminName, setAdminName] = useState("Julian Vane");
  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings?.fullName) {
          setAdminName(data.settings.fullName);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <nav
      className={`  sticky top-0 z-30 w-full border-b  px-3 sm:px-5 py-3  flex items-center justify-between gap-3
        backdrop-blur-xl transition-all duration-300
        ${darkMode
          ? "bg-gray-900/95 border-gray-700 text-white"
          : "bg-white/95 border-gray-200 text-black"
        } `} >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button onClick={() => setOpen(true)}
          className={`  md:hidden flex-shrink-0 flex items-center justify-center
            w-9 h-9 rounded-xl shadow-md transition-all duration-300
            ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-[#111] hover:bg-gray-800"} `}
          aria-label="Open menu"  >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`
            flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full flex-1
            transition-all duration-300
            ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`} >
          <img src={searchIcon} alt="search" className="w-4 h-4 opacity-60 flex-shrink-0" />
          <input  type="text"  value={searchVal}  onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search..."
            className={`  bg-transparent outline-none w-full text-sm font-medium
              ${darkMode ? "placeholder:text-gray-500 text-white" : "placeholder:text-gray-400 text-black"}
            `} />
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button  onClick={() => setDarkMode(!darkMode)}
            title="Toggle Theme"
            className={`p-2 rounded-full transition-all duration-300 shadow-md ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-yellow-100 hover:bg-yellow-200"}`} >
            <img src={darkMode ? moonIcon : sunIcon} alt="theme" className="w-4 h-4 object-contain" />
          </button>
        </div>
        <button className={`relative p-2 rounded-full transition-all duration-300 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          title="Notifications" >
          <img src={notificationIcon} alt="notification" className="w-5 h-5 object-contain" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
        <button className={`hidden sm:flex p-2 rounded-full transition-all duration-300 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          title="Messages">
          <img src={messageIcon} alt="message" className="w-5 h-5 object-contain" />
        </button>
        <div  onClick={() => setActive && setActive("Profile")}
          className={`flex items-center gap-2 pl-2 sm:pl-3 border-l cursor-pointer hover:opacity-80 transition-opacity ${darkMode ? "border-gray-700" : "border-gray-200"}`} >
          <div className="hidden sm:block text-right">
            <h3 className="text-xs sm:text-sm font-semibold whitespace-nowrap">{adminName}</h3>
            <p className={`text-[10px] sm:text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Admin Portal
            </p>
          </div>
          <div className="relative">
            <img  src={userImg}  alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-md" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
