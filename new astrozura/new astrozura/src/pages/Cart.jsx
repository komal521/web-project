import { useState } from "react";
import { useNavigate } from "react-router-dom";
import plus from "../assets/w1.png";
import minus from "../assets/w2.png";
import del from "../assets/w3.png";
import ship from "../assets/icon2.png";
import secure from "../assets/icon3.png";
import undo from "../assets/undo.png";
import arrow from "../assets/right-arrow.png";
import j1 from "../assets/j1.jpeg";
import j2 from "../assets/j2.jpeg";
import j3 from "../assets/j3.jpeg";
import Footer from "../components/Footer";
export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      category: "HOME DECOR",
      name: "Artisan Ceramic Vase",
      price: 124,
      qty: 1,
      img: j1,
      color: "Sandstone",
      size: "Large",
    },
    {
      id: 2,
      category: "APPAREL",
      name: "Premium Cotton Lounge Set",
      price: 89.5,
      qty: 2,
      img: j2,
      color: "Midnight Blue",
      size: "Medium",
    },
    {
      id: 3,
      category: "LIGHTING",
      name: "Minimalist Walnut Desk Lamp",
      price: 210,
      qty: 1,
      img: j3,
      color: "Natural Walnut",
      size: "Standard",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    )); };
  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    )); };
  const deleteItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shipping = 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const navigate = useNavigate();
  return (
    <>
    <div className="min-h-screen bg-[#f6f7fb] p-6 md:p-12">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#161439]">
            Your Cart
          </h1>
          <p className="text-gray-500 text-sm">
            You have {cartItems.length} premium items in your selection.
          </p>
        </div>
        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => alert("Continue Shopping Clicked")}
          className="flex items-center gap-2 text-[#6c3583] text-sm hover:underline">
          Continue Shopping
          <img src={arrow} className="w-3" />
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl flex items-center justify-between shadow-sm" >
              <div className="flex gap-4 items-center w-[55%]">
                <img src={item.img} className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <p className="text-xs text-[#5e6bcd] font-semibold">
                    {item.category}
                  </p>
                  <h2 className="font-medium text-[#161439]">
                    {item.name}
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Color: {item.color} &nbsp; Size: {item.size}
                  </p>
                </div>
              </div>
              <div className="text-[#161439] font-medium">
                ₹{item.price}
                <p className="text-xs text-gray-400">Per Unit</p>
              </div>
              <div className="flex items-center gap-3 border px-3 py-1 rounded-lg">
                <button onClick={() => decreaseQty(item.id)}>
                  <img src={minus} className="w-4" />
                </button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>
                  <img src={plus} className="w-4" />
                </button>
              </div>
              <button onClick={() => deleteItem(item.id)}>
                <img src={del} className="w-5" />
              </button>
            </div>
          ))}
          {/* FEATURES */}
          <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600">
            <div
              onClick={() => alert("Free Shipping Info")}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer" >
              <img src={ship} className="w-5" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-xs text-gray-400">
                  On all orders over ₹500
                </p>
              </div>
            </div>
            <div
              onClick={() => alert("Secure Payment Info")}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer">
              <img src={secure} className="w-5" />
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-xs text-gray-400">
                  100% encrypted checkout
                </p>
              </div>
            </div>
            <div
              onClick={() => alert("Return Policy")}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer" >
              <img src={undo} className="w-5" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-xs text-gray-400">
                  30-day hassle-free policy
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">

            <h2 className="text-lg font-semibold mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Taxes</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Total</span>
              <span className="text-[#d8b14a]">
                ₹{total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#184070] text-white py-2 rounded-lg" >
              Proceed to Checkout
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">
              By proceeding you agree to terms & privacy policy.
            </p>
            {/* PROMO */}
            <div className="mt-4 flex gap-2">
              <input
                placeholder="ENTER CODE"
                className="flex-1 border px-2 py-1 rounded-md text-sm" />
              <button
                onClick={() => alert("Promo Applied")}
                className="border px-3 rounded-md text-sm" >
                APPLY
              </button>
            </div>
          </div>
          {/* JOIN CLUB */}
          <div className="bg-[#eef0ff] p-5 rounded-xl text-center">
            <h3 className="font-semibold">
              Join the Collector's Club
            </h3>
            <p className="text-sm text-gray-500">
              Get 10% off your first order.
            </p>
            <button
              onClick={() => alert("Joined Club")}
              className="mt-3 text-[#5e6bcd] hover:underline" >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}