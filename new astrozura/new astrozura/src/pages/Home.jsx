import { useState } from "react";
import heroImg from "../assets/1.jpg";
import arrow from "../assets/right-arrow.png";
import icon1 from "../assets/icon3.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/solar-energy.png";
import icon4 from "../assets/christmas-star.png";
import u1 from "../assets/u1.webp";
import u2 from "../assets/u2.jpg";
import u3 from "../assets/u3.avif";
import Footer from "../components/Footer";
import p1 from "../assets/p1.webp";
import p2 from "../assets/p2.webp";
import p3 from "../assets/pro1.jpg";
import p4 from "../assets/p4.webp";
import c1 from "../assets/c1.webp";
import moon1 from "../assets/moon1.webp";
import vedic from "../assets/k3.webp";
import rudraksha from "../assets/4.webp";
export default function Home() {
  const [activeBtn, setActiveBtn] = useState("shop");
const [clickedBtn, setClickedBtn] = useState({}); 
  const handleCart = (name) => {
    alert(`${name} added to cart `);
  };
  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="relative h-[420px] md:h-[520px] flex items-center"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c4c7c]/80 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-16 max-w-xl text-white">
          <p className="text-xs tracking-widest text-[#d8ba4a] mb-2">
            SPIRITUAL COLLECTION
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Discover Inner Peace <br />
            <span className="text-[#d8ba4a]">Through Sacred Energy</span>
          </h1>
          <p className="mt-4 text-sm text-gray-200">
            Explore powerful crystals, authentic rudraksha, and spiritual tools
            designed to balance your energy and elevate your lifestyle.
          </p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveBtn("shop")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeBtn === "shop"
                  ? "bg-[#d8ba4a] text-black"
                  : "border border-white"
              }`} >
              Shop Now
            </button>
            <button
              onClick={() => setActiveBtn("view")}
              className={`px-5 py-2 rounded-full transition ${
                activeBtn === "view"
                  ? "bg-[#d8ba4a] text-black"
                  : "border border-white"
              }`} >
              View Lookbook
            </button>
          </div>
        </div>
      </div>
     {/* CATEGORY SECTION */}
<div className="bg-gray-50 py-14 text-center">
  <p className="text-xs text-[#161439] tracking-widest">
    CURATED COLLECTIONS
  </p>

  <h2 className="text-2xl md:text-3xl font-bold mt-2 text-[#23205b]">
    Shop by Category
  </h2>

  <div className="max-w-6xl mx-auto mt-12 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
    
    {[p1, p2, p3, p4].map((img, i) => (
      <div
        key={i}
        className="cursor-pointer hover:scale-110 transition text-center" >
        <img
          src={img}
          alt="category"
          className="w-32 h-32 rounded-full mx-auto object-cover shadow-md"  />
        <p className="mt-4 text-sm text-[#161439] font-medium">
          {[
            "Ethical Crystals",
            "Sacred Books",
            "Authentic Rudraksha",
            "Ritual Kits",
          ][i]}
        </p>
      </div>
    ))}
  </div>
</div>
     {/* TRENDING SECTION */}
<div className="py-16 px-6 md:px-16 bg-[#f8f9fc]">
  <div className="max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-10">
      <div>
        <p className="text-xs text-[#d8b14a] tracking-widest font-semibold">
          MOST LOVED
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#5e6bcd]">
          Trending This Week
        </h2>
      </div>
      <div
        onClick={() => alert("Redirecting ")}
        className="flex items-center gap-2 text-[#5e6bcd] cursor-pointer hover:underline" >
        <span className="text-sm font-medium">View All Arrivals</span>
        <img src={arrow} className="w-4 h-4" />
      </div>
    </div>
    {/* PRODUCTS */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {[
    {
      img: c1, 
      cat: "CRYSTALS",
      name: "Citrine Energy Point",
      price: "$48.00",
    },
    {
      img: moon1, 
      cat: "KITS",
      name: "Moon Phase Ritual Kit",
      price: "$65.00",
    },
    {
      img: vedic, 
      cat: "STATIONERY",
      name: "Vedic Wisdom Journal",
      price: "$32.00",
    },
    {
      img: rudraksha, 
      cat: "RUDRAKSHA",
      name: "5-Mukhi Mala Beads",
      price: "$89.00",
    },
  ].map((item, i) => (
    <div
      key={i}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition" >
      <img
        src={item.img}
        className="rounded-xl h-52 w-full object-cover" />

      <p className="text-[10px] mt-4 text-[#161439] tracking-widest">
        {item.cat}
      </p>
      <h3 className="text-sm font-semibold text-[#5e6bcd] mt-1">
        {item.name}
      </h3>

      <p className="text-[#d8b14a] font-semibold mt-1">
        {item.price}
      </p>
<div className="flex gap-3 mt-4">
  <button
    onClick={() => {
      setClickedBtn({ ...clickedBtn, [i]: "cart" });
      handleCart(item.name);
    }}
    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
      (clickedBtn[i] || "cart") === "cart"
        ? "bg-[#23205b] text-white"
        : "bg-white text-black border"
    }`} >
    Add to Cart
  </button>
  <button
    onClick={() => {
      setClickedBtn({ ...clickedBtn, [i]: "buy" });
      handleCart(item.name);
    }}
    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
      (clickedBtn[i] || "cart") === "buy"
        ? "bg-[#23205b] text-white"
        : "bg-white text-black border"
    }`} >
    Buy Now
  </button>
</div>
    </div>
  ))}
</div>
  </div>
</div>
      {/* FEATURE SECTION */}
      <div className="bg-[#4974a4] py-10 px-6 md:px-16 text-center text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: icon1,
              title: "Ethically Sourced",
              desc: "Supporting local artisans globally.",
            },
            {
              icon: icon2,
              title: "Fast Delivery",
              desc: "Quick & safe shipping worldwide.",
            },
            {
              icon: icon3,
              title: "Energy Cleansed",
              desc: "All items purified before shipping.",
            },
            {
              icon: icon4,
              title: "Trusted by 15k+",
              desc: "Loved by our spiritual community.",
            },
          ].map((item, i) => (
            <div key={i} className="hover:scale-105 transition">
              <img src={item.icon} className="w-10 mx-auto mb-3" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm opacity-80 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL */}
<div className="bg-gray-50 py-14 px-6 md:px-16 text-center">
  <p className="text-xs text-[#23205b] tracking-widest">
    CUSTOMER STORIES
  </p>

  <h2 className="text-2xl md:text-3xl font-bold mt-2 text-[#184070]">
    What Our Tribe Says
  </h2>

  <div className="grid md:grid-cols-3 gap-8 mt-10">
    {[
      {
        img: u1,
        text: `"The citrine point I received is absolutely breathtaking. You can feel the energy radiating from it. Truly the best crystal shop I've found."`,
        name: "Sienna Grace",
        role: "Yoga Instructor",
      },
      {
        img: u2,
        text: `"Finding authentic rudraksha is difficult, but Aura & Earth is my trusted source. The quality is unmatched and the packaging is beautiful."`,
        name: "Marcus Thorne",
        role: "Meditation Practitioner",
      },
      {
        img: u3,
        text: `"The ritual kits make the perfect gift for loved ones. They are curated with such intention and care. I buy one for every housewarming!"`,
        name: "Elena Rossi",
        role: "Wellness Advocate",
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
      >
                {/*STARS (IMAGE ICON) */}
<div className="flex justify-center gap-1 mb-3">
  {[...Array(5)].map((_, i) => (
    <img key={i} src={icon4} className="w-4 h-4" />
  ))}
</div>
        {/* TEXT */}
        <p className="text-sm text-[#4974a4] italic leading-relaxed">
          {item.text}
        </p>
        {/* IMAGE */}
        <img
          src={item.img}
          className="w-14 h-14 rounded-full mx-auto mt-4 object-cover"
        />
        {/* NAME */}
        <h4 className="mt-3 font-semibold text-[#5e6bcd]">
          {item.name}
        </h4>
        {/* ROLE */}
        <p className="text-xs text-gray-500">{item.role}</p>
      </div>
    ))}
  </div>
</div>
      <Footer />
    </div>
  );
}