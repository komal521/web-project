import { useState, useEffect } from "react";
import icon4 from "../assets/icon4.png";
import bowl from "../assets/bowl.jpeg";
import cluster from "../assets/geode cluster.jpeg";
import sandalwood from "../assets/sandalwood.jpeg";
import yoga from "../assets/yoga mat.jpeg";
import flag from "../assets/flag.jpeg";
import stone from "../assets/stone.jpeg";
import water from "../assets/water.jpeg";
import floor from "../assets/floor.jpeg";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function ShopLayout() {
  const [price, setPrice] = useState(150);
  const [open, setOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selected, setSelected] = useState("Featured");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const categories = [
    { name: "Incense & Fragrance", count: 124 },
    { name: "Crystals & Stones", count: 86 },
    { name: "Meditation Bowls", count: 42 },
    { name: "Yoga Essentials", count: 65 },
    { name: "Spiritual Decor", count: 93 },
    { name: "Books & Journals", count: 215 },
  ];

  const options = [
    "Featured",
    "Latest",
    "Price Low to High",
    "Price High to Low",
  ];

  const products = [
    { name: "Handcrafted Meditation Singing Bowl", price: 349, img: bowl },
    { name: "Amethyst Geode Cluster", price: 189, img: cluster },
    { name: "Natural Sandalwood Incense Sticks", price: 45, img: sandalwood },
    { name: "Original Cork Yoga Mat", price: 499, img: yoga },
    { name: "Tibetan Prayer Flags", price: 89, img: flag },
    { name: "Raw Quartz Healing Stones", price: 120, img: stone },
    { name: "Zen Indoor Water Fountain", price: 275, img: water },
    { name: "Saffron Meditation Floor Cushion", price: 420, img: floor },
  ];

  const handleClearFilters = () => {
    setPrice(150);
    setSelected("Featured");
    setMsg("Filters Cleared");
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <>
      <div className="bg-[#f5f5f7] min-h-screen px-4 sm:px-6 lg:px-10 py-6">
        {/* TOAST */}
        {msg && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#184070] text-white px-6 py-2 rounded-lg shadow-lg z-50 text-sm">
            {msg}
          </div>
        )}

        {/* MOBILE SIDEBAR */}
        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            ></div>

            <div className="relative w-[260px] bg-white h-full p-5 overflow-y-auto shadow-lg">
              <h2 className="font-semibold mb-4">Categories</h2>

              <ul className="space-y-3 text-sm">
                {categories.map((cat, i) => (
                  <li key={i} className="flex justify-between">
                    {cat.name} <span>{cat.count}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t my-5"></div>

              <h2 className="font-semibold mb-2">Price Range</h2>

              <input
                type="range"
                min="10"
                max="500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full" />

              <div className="flex justify-between text-sm mt-2">
                <span className="border px-2 py-1 rounded">₹10</span>
                <span className="border px-2 py-1 rounded">₹{price}</span>
              </div>

              <button
                onClick={() => {
                  handleClearFilters();
                  setOpen(false);
                }}
                className="mt-4 w-full py-2 text-white rounded-lg bg-[#184070]"
              >
                Clear All Filters
              </button>

              <button
                onClick={() => setOpen(false)}
                className="mt-3 w-full py-2 border rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="mb-6">
          <p className="text-xs text-gray-600">Home & Shop</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Spiritual Store
          </h1>
          <p className="text-sm mt-2 max-w-xl">
            Ethically sourced treasures to inspire mindfulness.
          </p>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden mb-4 w-full py-2 bg-[#184070] text-white rounded-lg"
        >
          Filters
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:block w-[260px] bg-white rounded-xl p-5 border h-fit">
            <h2 className="font-semibold mb-4">Categories</h2>

            <ul className="space-y-3 text-sm">
              {categories.map((cat, i) => (
                <li key={i} className="flex justify-between">
                  {cat.name} <span>{cat.count}</span>
                </li>
              ))}
            </ul>

            <div className="border-t my-5"></div>

            <h2 className="font-semibold mb-2">Price Range</h2>

            <input
              type="range"
              min="10"
              max="500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />

            <div className="flex justify-between text-sm mt-2">
              <span className="border px-2 py-1 rounded">₹10</span>
              <span className="border px-2 py-1 rounded">₹{price}</span>
            </div>

            <button
              onClick={handleClearFilters}
              className="mt-4 w-full py-2 text-white rounded-lg bg-[#184070]"
            >
              Clear All Filters
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">
            {/* SORT BAR */}
            <div className="bg-white border rounded-xl px-4 py-3 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing 1 - 8 of 24 results
              </p>

              <div className="flex items-center gap-2 text-sm">
                Sort by:
                <div className="relative">
                  <div
                    onClick={() => setSortOpen(!sortOpen)}
                    className="cursor-pointer text-[#2c4c7c] font-medium"
                  >
                    {selected} ▼
                  </div>

                  {sortOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
                      {options.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setSelected(item);
                            setSortOpen(false);
                          }}
                          className={`px-3 py-2 cursor-pointer ${
                            selected === item
                              ? "bg-[#2c4c7c] text-white"
                              : ""
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {products.map((product, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl border hover:shadow-md transition flex flex-col"
                >
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
                    <img
                      src={product.img}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex mt-2">
                    {[...Array(5)].map((_, idx) => (
                      <img key={idx} src={icon4} className="w-4 h-4" />
                    ))}
                  </div>

                  <h3
                    onClick={() => navigate("/products")}
                    className="text-sm mt-2 cursor-pointer hover:text-[#184070]"
                  >
                    {product.name}
                  </h3>

                  <p className="font-semibold mt-1">₹{product.price}</p>

                  <button
                    onClick={() => setMsg("Added to cart 🛒")}
                    className="mt-auto w-full py-2 text-white rounded-lg bg-[#184070]"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center mt-8 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === num
                      ? "bg-[#184070] text-white"
                      : "bg-white border"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}