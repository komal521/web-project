import { useState } from "react";
import { NavLink } from "react-router-dom";
import vedic from "../assets/vedic-astrology.png";
import menuIcon from "../assets/menu-icon.png";
import cart from "../assets/carts.png";

export default function Navbar() {
  const [showMsg, setShowMsg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignIn = () => {
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };
  const menuItems = [
    { path: "/", name: "Home" },
    { path: "/category", name: "Category" },
    { path: "/products", name: "Products" },
    { path: "/allproduct", name: "Allproduct"},
    { path: "/Contact" , name: "Contact"},
    { path: "/About", name:"About"}

  
  ];

  return (
    <>
      {/* NOTIFICATION */}
      {showMsg && (
        <div className="fixed top-0 left-0 w-full bg-[#4974a4] text-white text-center py-2 z-[100]">
          Sign In Button Clicked
        </div>
      )}

      <nav className="bg-white shadow-sm px-4 md:px-10 py-6.5 sticky top-0 z-50">
        <div className="flex justify-between items-center">

          {/* LOGO */}
          <img src={vedic} alt="logo" className="h-20 md:h-24 object-contain" />

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 text-sm items-center font-medium">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md transition ${
                      isActive
                        ? "bg-[#d8b14a] text-white"
                        : "text-gray-700 hover:bg-[#d8ba4a]"
                    }`
                  }  >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* CART */}
            <NavLink to="/cart">
              <img
                src={cart}
                alt="cart"
                className="h-6 w-6 cursor-pointer hover:scale-110 transition"
              />
            </NavLink>

            {/* SIGN IN */}
            <button
              onClick={handleSignIn}
              className="bg-[#184070] text-white px-4 py-1.5 rounded-full text-sm hover:bg-[#161439]">
              Sign In
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"  >
              <img src={menuIcon} alt="menu" className="h-7 w-7" />
            </button>
          </div>
        </div>
        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-3 bg-white rounded-xl shadow-md p-5">
            <ul className="flex flex-col gap-3 text-gray-700">

              {menuItems.map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md ${
                        isActive
                          ? "bg-[#D4A73C] text-white"
                          : "hover:bg-[#FFF6E5]"
                      }` } >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {/* MOBILE CART */}
              <li>
                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#FFF6E5]" >
                  <img src={cart} alt="cart" className="h-5 w-5" />
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}