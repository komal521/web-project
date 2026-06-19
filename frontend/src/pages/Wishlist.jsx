import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import a2 from "../assets/a2.jpeg";
import a5 from "../assets/a5.jpeg";
import bag from "../assets/bag.webp";
import c1 from "../assets/c1.avif";
import c3 from "../assets/c3.avif";
import earrings from "../assets/earrings.webp";
import closeIcon from "../assets/close.png";
import heartIcon from "../assets/heart (1).png";
import checkoutIcon from "../assets/checkout.png";
import addIcon from "../assets/add.png";
import binIcon from "../assets/bin (1).png";
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
useEffect(() => {
  const storedWishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];
  setWishlistItems(storedWishlist);
}, []);
 const total = wishlistItems.reduce(
  (sum, item) =>
    sum +
    Number(
      String(item.price)
        .replace("₹", "")
        .replace(/,/g, "")
    ),
  0
);
const removeFromWishlist = (id) => {
  const updatedWishlist = wishlistItems.filter(
    (item) => item.id !== id
  );
  setWishlistItems(updatedWishlist);
  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );
};
const navigate = useNavigate();
const moveAllToCart = () => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const newCartItems = wishlistItems.map((item) => ({
    id: item.id,
    img: item.image,      
    title: item.name,    
    price: item.price,
    quantity: 1
  }));
  const updatedCart = [...existingCart, ...newCartItems];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  localStorage.removeItem("wishlist");
  setWishlistItems([]);
  navigate("/cart"); 
};
const clearWishlist = () => {
  localStorage.removeItem("wishlist");
  setWishlistItems([]);
};
const goToAddMore = () => {
  navigate("/categories");
};
  return (
    <>
      <Navbar />
      <div className="bg-[#FAF9F6] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#4A3428]">
              My Wishlist
            </h1>
            <p className="text-gray-500 mt-1">
              Save your favorite products for later.
            </p>
          </div>
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-72 object-cover"  />
                     <button  onClick={() => removeFromWishlist(item.id)}
  className="absolute top-3 left-3 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center"> 
                        <img
                          src={closeIcon}
                          alt=""
                          className="w-4 h-4"  />
                      </button>
                      <button className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center">
                        <img
                          src={heartIcon}
                          alt=""
                          className="w-4 h-4"/>
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-xs uppercase text-gray-400">
                        {item.category}
                      </p>
                      <h3 className="font-semibold text-[#4A3428] mt-1">
                        {item.name}
                      </h3>
                     <p className="text-xl font-bold text-[#8B6B4A] mt-3">
                     {item.price}
                       </p>
                      <button className="mt-4 w-full bg-[#8B6B4A] hover:bg-[#73563A] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition">
                        Add To Cart
                        <img
                          src={checkoutIcon}
                          alt=""
                          className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div onClick={goToAddMore}
  className="bg-white border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center min-h-[430px] cursor-pointer hover:bg-gray-50 transition">
                  <img src={addIcon} alt=""
                    className="w-12 h-12 mb-4"
                  />
                  <h3 className="font-semibold text-[#4A3428]">
                    Add More Items
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 text-center px-4">
                    Continue shopping and save more products.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#4A3428] mb-5">
                  Wishlist Summary
                </h2>
                <div className="flex -space-x-3 mb-5">
                  <img   src={a2}   alt=""
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"/>
                  <img  src={a5}  alt=""
                    className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                  <img  src={bag}  alt=""
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"  />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{wishlistItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Value</span>
                    <span>
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <hr className="my-5" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
  onClick={moveAllToCart}
  className="w-full mt-6 bg-[#8B6B4A] hover:bg-[#73563A] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition">
  <img src={checkoutIcon} alt="" className="w-4 h-4" />
  Move All To Cart
</button>
                <button onClick={clearWishlist}
  className="w-full mt-3 border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 text-[#4A3428] hover:bg-gray-50 transition">
  <img src={binIcon} alt="" className="w-4 h-4"/>
  Clear Wishlist</button>
              </div>
            </div>
          </div>
          <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold text-[#4A3428]">
                Wait, there's more!
              </h3>
              <p className="text-gray-500 text-sm">
                Explore our latest arrivals and exclusive
                collections.
              </p>
            </div>
          <button onClick={goToAddMore}
  className="bg-[#4A3428] text-white px-6 py-3 rounded-xl"> New Collection
</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Wishlist;