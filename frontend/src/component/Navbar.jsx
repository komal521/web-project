import { useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../assets/search.png";
import heartIcon from "../assets/heart.png";
import cartIcon from "../assets/shopping-cart.png";
import userIcon from "../assets/user.png";
import menuIcon from "../assets/menu1.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-purple-600 font-bold text-xl">
              Shop.
            </h1>
            <nav className="hidden md:flex items-center gap-7">
              <Link to="/home" className="text-purple-600 font-medium">
                Home
              </Link>
              <Link to="/services"
                className="text-gray-600 hover:text-purple-600">
                Products
              </Link>
              <Link to="/categories"
                className="text-gray-600 hover:text-purple-600" >
                Categories
              </Link>
              <Link  to="/about"
                className="text-gray-600 hover:text-purple-600" >
                About
              </Link>
              <Link to="/contact"
                className="text-gray-600 hover:text-purple-600" >
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-5 py-3 w-[420px]">
            <img src={searchIcon} alt="" className="w-5 h-5 opacity-60" />
            <input type="text" placeholder="Search products..."
              className="bg-transparent outline-none ml-3 w-full text-sm" />
          </div>
          <div className="flex items-center gap-3">
            <img src={heartIcon} alt=""
              className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
            <div className="relative cursor-pointer">
              <img src={cartIcon} alt="" className="w-5 h-5 md:w-6 md:h-6"/>
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <Link  to="/login"
              className="hidden sm:flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm" >
              <img src={userIcon} alt="" className="w-4 h-4 invert" />
              Login
            </Link>
            <Link to="/profile"
              className="hidden sm:block border border-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-600 hover:text-white"  >
              Profile
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              <img src={menuIcon} alt="" className="w-7 h-7"  />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="flex flex-col gap-4">
              <Link to="/home">Home</Link>
              <Link to="/services">
                Products
              </Link>
              <Link to="/categories">
                Categories
              </Link>
              <Link to="/about">
                About
              </Link>
              <Link to="/contact">
                Contact
              </Link>
              <Link to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-center">
                Login
              </Link>
              <Link to="/profile"
                className="border border-purple-600 px-4 py-2 rounded-lg text-center" >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;