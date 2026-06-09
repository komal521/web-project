import searchIcon from "../assets/search.png";
import heartIcon from "../assets/heart.png";
import cartIcon from "../assets/shopping-cart.png";
import userIcon from "../assets/user.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-purple-600 font-bold text-lg cursor-pointer">
              Shop.
            </h1>
            <nav className="hidden md:flex items-center gap-7">
             <Link to="/home" className="text-purple-600 font-medium">Home </Link>
              <Link to="/services" className="text-gray-600 hover:text-purple-600">
               Products
                 </Link>
              <Link to ="/categories" className="text-gray-600 hover:text-fuchsia-700">
               Categories</Link>
             <Link to="/about" className="text-gray-600 hover:text-purple-600">
                About
              </Link>
              <a href="/" className="text-gray-600 hover:text-purple-600">
                Contact
              </a>
            </nav>
          </div>
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-5 py-3 w-[420px]">
            <img  src={searchIcon}  alt=""  className="w-5 h-5 opacity-60" />
            <input type="text" placeholder="Search premium products..."
              className="bg-transparent outline-none ml-3 w-full text-sm" />
          </div>
          <div className="flex items-center gap-5">
            <img src={heartIcon} alt="" className="w-6 h-6 cursor-pointer"/>
            <div className="relative cursor-pointer">
              <img src={cartIcon} alt="" className="w-6 h-6"/>
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition">
              <img src={userIcon} alt="" className="w-4 h-4 invert"/>
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;