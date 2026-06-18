import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import arrow from "../assets/right-arrow.png";
import pro1 from "../assets/pro1.jpg";
import pro2 from "../assets/pro2.jpg";
import pro3 from "../assets/pro3.webp";
import pro5 from "../assets/pro5.jpg";
import pro7 from "../assets/pro7.jpeg";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import heart from "../assets/heart.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import moon1 from "../assets/moon1.webp";
import img1 from "../assets/OIP (1).webp";
import img2 from "../assets/OIP (2).webp";
import img3 from "../assets/OIP.webp";
export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeBtn, setActiveBtn] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const images = [pro1, pro2, pro3, pro5, pro7];
  const navigate = useNavigate();

  return (
    <>
<div className="bg-[#f8f7f2] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 pt-4 text-sm text-[#d8b14a] hover:text-[#23205b] "
        onClick={() => alert("clicked")}>
          Home <span className = " text-[#d8b14a] hover:text-[#23205b] ">Products</span> / <span className="text-[#d8b14a] hover:text-[#23205b] ">Rudraksha Mala</span>
        </div>
        {/* MAIN */}
        <div className="max-w-6xl mx-auto bg-[#fffdf7] rounded-xl p-4 md:p-6 shadow-sm mt-4">
         <div className="grid md:grid-cols-2 gap-6">
           {/* LEFT */}
            <div className="flex flex-col md:flex-row gap-4">

              <div className="flex md:flex-col gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <img key={index} src={img}
                    onClick={() => setActiveImage(index)}
                    className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer border-2 ${
                      activeImage === index
                        ? "border-[#5e6bcd]"
                        : "border-gray-200"
                    }`} />
                ))}
              </div>
              <div className="flex-1 relative">
                <img
                  src={images[activeImage]}
                  className="w-full rounded-xl object-cover"  />

                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button className="bg-white p-2 rounded-full shadow">
                    <img src={heart} className="w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow">
                    <img src={icon2} className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* RIGHT */}
            <div>
              <span className="text-xs bg-purple-100 text-[#5e6bcd] px-2 py-1 rounded">
                Spiritual Tool
              </span>

              <h1 className="text-xl md:text-2xl font-bold mt-2">
                Sacred 108 Bead Rudraksha Mala
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <img src={icon4} className="w-5 h-5" />
                <span className="text-sm text-gray-500">
                  (124 verified reviews)
                </span>
              </div>
              <div className="mt-4 text-2xl font-bold">$49.00</div>
              <p className="text-gray-600 mt-3 text-sm">
                Handcrafted with authentic Rudraksha beads from Himalayas.
              </p>
              {/* Quantity */}
              <div className="mt-6">
                <p className="text-sm mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded" >
                    <img src={minus} className="w-4 h-4" />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded">
                    <img src={plus} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button onClick={() => {
              setActiveBtn("cart");
             navigate("/cart");  }}
       className={`px-6 py-2 rounded-lg border ${
             activeBtn === "cart"
      ? "bg-[#d8b14a] text-white"
      : "bg-white"  }`}>
           Add to Cart
         </button>
       <button onClick={() => {
          setActiveBtn("buy");
            navigate("/cart");  
              }}
       className={`px-6 py-2 rounded-lg border ${
    activeBtn === "buy"
      ? "bg-[#d8b14a] text-white"
      : "bg-white" }`}>
           Buy Now</button>
              </div>
              {/* FEATURES */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
           <div   className="flex items-center gap-2 cursor-pointer hover:text-[#d8b14a]"
    onClick={() => alert("Authenticity Guaranteed Info")} >
    <img src={icon3} className="w-5 h-5" />
    <span>Authenticity Guaranteed</span>
  </div>
  <div 
    className="flex items-center gap-2 cursor-pointer hover:text-[#d8b14a]"
    onClick={() => alert("Free Shipping Details")}>
    <img src={icon2} className="w-5 h-5" />
    <span>Free Shipping</span>
  </div>
  <div 
    className="flex items-center gap-2 cursor-pointer hover:text-[#d8b14a]"
    onClick={() => alert("30-Day Return Policy")} >
    <img src={icon1} className="w-5 h-5" />
    <span>30-Day Returns</span>
  </div>
</div>
            </div>
          </div>
          {/*  TABS SECTION */}
          <div className="mt-10">
           
            <div className="flex gap-6 border-b text-sm">
              {["description", "benefits", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-[#5e6bcd] text-[#5e6bcd]"
                      : "text-gray-500" }`} >
                  {tab}
                </button>
              ))}
            </div>
            {/* Content */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* LEFT TEXT */}
              <div>
                <h2 className="font-bold text-lg mb-2">
                  Divine Energy in Every Bead
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Rudraksha Mala is more than just an accessory; it is a conduit for spiritual energy. Each bead is hand-picked for its distinct mukhi characteristics and size consistency.
                  <br /><br />
                  Worn for centuries by sages and seekers, the Rudraksha seed is believed to create a protective cocoon of your own energy. It’s an ideal companion for long meditation sessions, helping the practitioner focus and achieve deeper states of consciousness.
                </p>
              </div>
              {/* RIGHT SPEC BOX */}
              <div className="border rounded-lg p-4 bg-[#f8f7f2]">
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="text-sm flex justify-between py-1">
                  <span>Bead Count</span>
                  <span>108 + 1 Guru Bead</span>
                </div>

                <div className="text-sm flex justify-between py-1">
                  <span>Bead Size</span>
                  <span>8mm</span>
                </div>

                <div className="text-sm flex justify-between py-1">
                  <span>Seed Type</span>
                  <span>5 Mukhi Himalayan Rudraksha</span>
                </div>

                <div className="text-sm flex justify-between py-1">
                  <span>Thread</span>
                  <span>High-strength nylon with silk tassel</span>
                </div>

                <div className="text-sm flex justify-between py-1">
                  <span>Origin</span>
                  <span>Fair-trade sourced from Nepal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
<div className="max-w-6xl mx-auto mt-10 px-4 bg-[#f8f7f2] py-6 rounded-xl">

  <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
    <div>
      <h2 className="text-xl font-bold">Complete Your Ritual</h2>
      <p className="text-sm text-gray-500">
        Spiritual tools that harmonize perfectly with your new mala.
      </p>
    </div>

    <button
      onClick={() => alert("View All Products")}
      className="text-[#5e6bcd] text-sm flex items-center gap-1 hover:underline" >
      View All Products
      <img src={arrow} alt="arrow" className="w-3 h-3 mt-[2px]" />
    </button>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    {[
      { img: moon1, name: "Amethyst Crystal Cluster", price: "$35.00" },
      { img: img1, name: "Premium Incense Set", price: "$18.00" },
      { img: img2, name: "Moon Cycle Journal", price: "$24.00" },
      { img: img3, name: "Himalayan Salt Lamp", price: "$42.00" },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-[#fffdf7] rounded-xl p-3 shadow-sm hover:shadow-md transition"  >

        <div className="w-full h-40 bg-[#f3f1ea] rounded-lg flex items-center justify-center p-2">
          <img
            src={item.img}
            alt={item.name}
            className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300" />
        </div>
        <h3 className="text-sm font-medium mt-3 cursor-pointer text-[#23205b] hover:text-[#d8b14a]" onClick={()=>("clicked")}>{item.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-[#5e6bcd] text-sm font-semibold">
            {item.price}
          </span>
          <button
            onClick={() => alert(`${item.name} added to cart`)}
            className="p-1 hover:scale-110 transition"   >
            <img src={plus} alt="add" className="w-5 h-5" />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
{/* CONSULT BANNER */}
<div className="max-w-6xl mx-auto mt-10 mb-11 px-4">
  <div className="bg-[#d8b14a] rounded-xl p-6 md:flex justify-between items-center">

    <div>
      <h2 className="text-lg md:text-xl font-bold">
        Consult an Astrologer
      </h2>
      <p className="text-sm text-gray-700 mt-1">
        Get personalized insights and navigate your life's journey
        with expert guidance.
      </p>
    </div>

    <button
      onClick={() => alert("Book Now Clicked")}
      className="mt-4 md:mt-0 bg-[#5e6bcd] text-white px-6 py-2 rounded-full hover:bg-[#23205b] transition" >
      Book Now
    </button>
      </div>
       </div>
        <Footer />
         </>
           );
           }


