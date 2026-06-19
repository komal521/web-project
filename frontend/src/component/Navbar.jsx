import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import searchIcon from "../assets/search.png";
import heartIcon from "../assets/heart.png";
import cartIcon from "../assets/shopping-cart.png";
import userIcon from "../assets/user.png";
import menuIcon from "../assets/menu1.png";
import sunIcon from "../assets/sun.png";
import moonIcon from "../assets/moon.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || document.documentElement.classList.contains("dark");
  });
  const location = useLocation();
  const fetchWishlistCount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { setWishlistCount(0); return; }
    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/${user.id}`);
      const data = await res.json();
      if (data.success) setWishlistCount(data.wishlist?.length || 0);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchWishlistCount();
    window.addEventListener("wishlistUpdated", fetchWishlistCount);
    return () => window.removeEventListener("wishlistUpdated", fetchWishlistCount);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  const navLink = (path) =>
    location.pathname === path
      ? "text-[#6f4e37] font-semibold border-b-2 border-[#6f4e37] pb-0.5"
      : `hover:text-[#6f4e37] transition-colors duration-200 ${darkMode ? "text-gray-300" : "text-gray-600"}`;
  return (
    <header className={`sticky top-0 z-50 border-b shadow-sm transition-colors duration-300 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/home" className="md:hidden">
              <h1 className="text-purple-600 font-bold text-xl">Home</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-7">
              <Link to="/home" className={navLink("/home")}>Home</Link>
              <Link to="/services" className={navLink("/services")}>Products</Link>
              <Link to="/categories" className={navLink("/categories")}>Categories</Link>
              <Link to="/about" className={navLink("/about")}>About</Link>
              <Link to="/contact" className={navLink("/contact")}>Contact</Link>
            </nav>
          </div>
          <div className={`hidden lg:flex items-center rounded-full px-5 py-3 w-[420px] transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <img src={searchIcon} alt="" className={`w-5 h-5 opacity-60 ${darkMode ? "invert" : ""}`} />
            <input type="text" placeholder="Search products..."
              className={`bg-transparent outline-none ml-3 w-full text-sm ${darkMode ? "text-white placeholder-gray-400" : "text-black"}`}/>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 sm:gap-1 mr-2">
              <button
                onClick={() => setDarkMode(false)}
                title="Light Mode"
                className={`p-2 rounded-full transition-all duration-300 ${!darkMode ? "bg-yellow-100 shadow-md scale-105" : "hover:bg-gray-700"}`}>
                <img src={sunIcon} alt="light" className="w-4 h-4 object-contain" />
              </button>
              <button onClick={() => setDarkMode(true)} title="Dark Mode"
                className={`p-2 rounded-full transition-all duration-300 ${darkMode ? "bg-gray-700 shadow-md scale-105" : "hover:bg-gray-100"}`} >
                <img src={moonIcon} alt="dark" className="w-4 h-4 object-contain" />
              </button>
            </div>
            <Link to="/wishlist" className="relative cursor-pointer flex items-center gap-1">
              <img src={heartIcon} alt="" className={`w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition-transform ${darkMode ? "invert" : ""}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative cursor-pointer flex items-center gap-1">
              <img src={cartIcon} alt="" className={`w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition-transform ${darkMode ? "invert" : ""}`} />
              <span className={`hidden sm:inline font-semibold text-sm ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Cart</span>
              <span className="absolute -top-2 -left-2 bg-[#6f4e37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {JSON.parse(localStorage.getItem("cart"))?.length || 0}
              </span>
            </Link>
            <Link to="/login"
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                location.pathname === "/login"
                  ? "bg-[#5a3d2b] text-white"
                  : "bg-[#6f4e37] text-white hover:bg-[#5a3d2b]"}`}>
              <img src={userIcon} alt="" className="w-4 h-4 invert" />
              Login
            </Link>
            <div className="relative group hidden sm:block">
              <Link  to="/profile"
                className={`block px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  location.pathname === "/profile"
                    ? "bg-[#6f4e37] text-white border border-[#6f4e37]"
                    : "border border-[#6f4e37] text-[#6f4e37] hover:bg-[#6f4e37] hover:text-white" }`} >
                Profile
              </Link>
              <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                  <p className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>My Account</p>
                  <p className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{JSON.parse(localStorage.getItem("user"))?.email || "Guest"}</p>
                </div>
                <div className="p-2">
                  <Link to="/profile" className={`block px-4 py-2 text-sm rounded-lg ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-amber-50"}`}>View Profile</Link>
                  <button onClick={() => { localStorage.removeItem("user"); window.location.href="/login"; }} className={`w-full text-left block px-4 py-2 text-sm rounded-lg ${darkMode ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-red-50"}`}>Logout</button>
                </div>
              </div>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              <img src={menuIcon} alt="" className={`w-7 h-7 ${darkMode ? "invert" : ""}`} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className={`md:hidden border-t py-4 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="flex flex-col gap-4 px-2">
              {[
                { path: "/services", label: "Products" },
                { path: "/categories", label: "Categories" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <Link key={path} to={path} onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === path
                      ? "bg-purple-50 text-purple-600 font-semibold"
                      : `${darkMode ? "text-gray-300 hover:text-purple-400" : "text-gray-700 hover:text-purple-600"}`
                  }`}>
                  {label}
                </Link>
              ))}
              <Link to="/login"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-center text-sm font-semibold ${
                  location.pathname === "/login"
                    ? "bg-[#5a3d2b] text-white"
                    : "bg-[#6f4e37] text-white" }`} >
                Login
              </Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-center text-sm font-semibold border border-[#6f4e37] ${
                  location.pathname === "/profile"
                    ? "bg-[#6f4e37] text-white"
                    : "text-[#6f4e37]"  }`} >
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