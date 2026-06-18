import { useState } from "react";
import Footer from "../components/Footer";
import locationIcon from "../assets/location.png";
import cardIcon from "../assets/carti.png";
import upiIcon from "../assets/upi.png";
import deliveryIcon from "../assets/delivery.png";
import arrow from "../assets/right-arrow.png";
import silk from "../assets/o1.jpeg";
import candle from "../assets/o2.jpeg";
import holder from "../assets/o3.jpeg";
import secure from "../assets/verified.png";

export default function CheckoutPage() {
  const [method, setMethod] = useState("card");

  return (
    <>
      <div className="bg-[#f6f6f8] min-h-screen p-4 md:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* SHIPPING */}
            <div className="bg-white p-6 rounded-2xl border">
              <div className="flex items-center gap-2 mb-1">
                <img src={locationIcon} className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Shipping Address</h2>
              </div>

              <p className="text-xs text-gray-500 mb-5">
                Where should we deliver your luxury pieces?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name</label>
                  <input className="input" placeholder="Enter name" />
                </div>
                <div>
                  <label className="label">Phone Number</label>
                  <input className="input" placeholder="+91 00000 00000" />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Street Address</label>
                  <input className="input" placeholder="Enter address" />
                </div>
                <div>
                  <label className="label">City</label>
                  <input className="input" placeholder="City" />
                </div>
                <div>
                  <label className="label">Zip Code</label>
                  <input className="input" placeholder="000000" />
                </div>
              </div>
            </div>
            {/* PAYMENT */}
            <div className="bg-white p-6 rounded-2xl border">
              <div className="flex items-center gap-2 mb-4">
                <img src={cardIcon} className="w-4 h-4" />
                <h2 className="text-sm font-semibold">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setMethod("card")}
                  className={`payment ${method === "card" ? "active" : ""}`}   >
                  <img src={cardIcon} className="w-6 mb-2" />
                  Credit Card
                </button>
                <button
                  onClick={() => setMethod("upi")}
                  className={`payment ${method === "upi" ? "active" : ""}`} >
                  <img src={upiIcon} className="w-6 mb-2" />
                  UPI
                </button>
                <button
                  onClick={() => setMethod("cod")}
                  className={`payment ${method === "cod" ? "active" : ""}`} >
                  <img src={deliveryIcon} className="w-6 mb-2" />
                  On Delivery
                </button>
              </div>
              {method === "card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="label">Card Number</label>
                    <input className="input" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label className="label">Expiry</label>
                    <input className="input" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="label">CVV</label>
                    <input className="input" placeholder="123" />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="bg-white p-6 rounded-2xl border h-fit shadow-sm">
            <h2 className="text-sm font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-4">
              {[ 
                { img: silk, name: "Silk Meditation Robe", price: 249 },
                { img: candle, name: "Crystal Infused Candle", price: 45 },
                { img: holder, name: "Sacred Geometry Incense Holder", price: 78 },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <img src={item.img} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Premium Collection
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="border-t mt-6 pt-4 space-y-2 text-sm">

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹417.00</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-gray-800">
                  COMPLIMENTARY
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Estimated Taxes</span>
                <span>₹34.20</span>
              </div>

            </div>

            {/* TOTAL */}
            <div className="border-t mt-4 pt-4">
              <p className="text-xs font-semibold text-[#d8b14a] tracking-wide">
                TOTAL AMOUNT
              </p>

              <h2 className="text-2xl font-bold text-[#1e1b4b] mt-1">
                ₹451.20
              </h2>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => alert("Order Placed!")}
              className="mt-6 w-full bg-[#184070] hover:bg-[#184070] text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md">
              Place Order
              <img src={arrow} className="w-4 h-4" />
            </button>

            {/* SSL */}
            <div className="mt-4 flex flex-col items-center gap-2 text-xs text-gray-500">
              <p className="flex items-center gap-1">
                < img src={cardIcon} className="w-4 h-4"/>
                SECURE SSL ENCRYPTION
              </p>

              <div className="flex gap-2 opacity-70">
                <div className="w-8 h-4 bg-gray-300 rounded"></div>
                <div className="w-8 h-4 bg-gray-300 rounded"></div>
                <div className="w-8 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>

          </div>

        </div>

        {/* STYLES */}
        <style jsx>{`
          .input {
            width: 100%;
            height: 42px;
            padding: 0 12px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            font-size: 13px;
            background: #fcfcfd;
            outline: none;
          }
          .label {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 4px;
            display: block;
          }
          .payment {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 12px;
            font-size: 13px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: 0.2s;
          }
          .payment:hover {
            border-color: #000;
          }
          .payment.active {
            border: 1px solid #d8b14a;
            background: #fff9e6;
          }
        `}</style>
      </div>

      <Footer />
    </>
  );
}