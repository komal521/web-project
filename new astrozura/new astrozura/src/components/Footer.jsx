import { useState } from "react";
import { Link } from "react-router-dom";
import vedic from "../assets/vedic-astrology.png";
import youtube from "../assets/youtube.png";
import instagram from "../assets/instagram.png";
import earth from "../assets/earth.png";
import phone from "../assets/phone-call.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    if (!email) {
      setMsg("Please enter email");
    } else {
      setMsg("Subscribed successfully!");
      setEmail("");
    }
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <footer className="bg-[#1E3557] text-white mt-2">

      {/* MESSAGE */}
      {msg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#d8b14a] px-6 py-3 rounded-lg text-sm shadow z-50">
          {msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* LEFT SECTION */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl h-16 md:h-20 px-6 shadow-md flex items-center justify-center">
            <img src={vedic} alt="AstroZura Logo"
              className="h-[150%] w-full object-contain" />
          </div>

          <p className="text-sm text-gray-300 mt-5 leading-relaxed max-w-xs">
            Bringing celestial wisdom to your fingertips. AstroZura connects
            you with the world's most gifted astrologers.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 mt-5">
            {[earth, instagram, phone, youtube].map((icon, i) => (
              <div
                key={i}
                className="w-9 h-9 bg-[#5e6bcd] hover:bg-[#d8ba4a] hover:scale-110 transition rounded-full flex items-center justify-center cursor-pointer">
                <img src={icon} alt="icon"
                  className="w-5 h-5 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Company</h3>

          <ul className="space-y-2 text-sm text-gray-300">

            <li>
              <Link to="/about" className="hover:text-[#d8ba4a] transition">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-[#d8ba4a] transition">
                Contact Support
              </Link>
            </li>

            <li>
              <Link to="/shipping-return" className="hover:text-[#d8ba4a] transition">
                Shipping & Return Policy
              </Link>
            </li>

            <li>
             <Link to="/privacy-policy" className="hover:text-[#d8ba4a] transition">
                Privacy Policy</Link>
              </li>
            <li>
             <Link to="/support" className="hover:text-[#d8ba4a] transition">
                      Support
                     </Link>
                 </li>
                 <li>
            <Link to="/refund-policy" className="hover:text-[#d8ba4a] transition">
            Refund & Exchange Policy </Link>
            </li>
          </ul>
        </div>
        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Newsletter</h3>

          <p className="text-sm text-gray-300 mb-4">
            Get daily cosmic insights delivered to your inbox.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-[#23205b] px-4 py-3 rounded-md text-sm text-white placeholder-gray-400 outline-none mb-3 focus:ring-2 focus:ring-[#d8ba4a]"/>

          <button
            onClick={handleSend}
            className="w-full bg-[#d8ba4a] py-3 rounded-md text-sm font-semibold hover:bg-[#d8ba4a] transition">
            Subscribe
          </button>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#2C4870] py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          
          <p>© 2024 AstroZura Inc. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="cursor-pointer hover:text-[#d8ba4a] transition">
              Disclaimer
            </span>
            <span className="cursor-pointer hover:text-[#d8ba4a] transition">
              Sitemap
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}