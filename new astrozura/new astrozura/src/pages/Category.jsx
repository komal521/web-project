import { useState } from "react";
import Footer from "../components/Footer";
import natural from "../assets/natural.png";
import checkmark from "../assets/checkmark.png";
import star from "../assets/christmas-star.png";
import rudraksha from "../assets/4.webp";
import stone from "../assets/h1.jpeg";
import healing from "../assets/h2.jpeg";
import yantra from "../assets/h3.jpeg";
import pooja from "../assets/h4.jpeg";
import book from "../assets/h5.jpeg";
import arrow from "../assets/right-arrow.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import undo from "../assets/undo.png";
import guidance from "../assets/guidance.png";
import s1 from "../assets/s1.jpg";
import pro1 from "../assets/pro1.jpg";
import s2 from "../assets/s2.jpeg";
import s3 from "../assets/s3.jpeg";
import icon4 from "../assets/icon4.png";
import s4 from "../assets/s4.jpeg";
import s5 from "../assets/s5.jpeg";
import s6 from "../assets/s6.jpeg";
import s7 from "../assets/s7.jpeg";
import { useNavigate } from "react-router-dom";
export default function Category() {
  const [activeBtn, setActiveBtn] = useState("shop");
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(false);
  const [activeTrending, setActiveTrending] = useState(false);
const [activeFeature, setActiveFeature] = useState(null);
  const categories = [
    { img: rudraksha, title: "Rudraksha", desc: "Sacred beads for spiritual growth" },
    { img: stone, title: "Gemstones", desc: "Astrology-based powerful stones" },
    { img: healing, title: "Healing Crystals", desc: "Balance your energy & aura" },
    { img: yantra, title: "Yantras", desc: "Ancient tools for divine energy" },
    { img: pooja, title: "Pooja Items", desc: "Essential items for rituals" },
    { img: book, title: "Spiritual Books", desc: "Knowledge & spiritual wisdom" },
  ];
  const featuredProducts = [
    { img: s1, title: "Premium Amethyst Cluster", price: "$45.00", tag: "Best Seller", reviews: 124 },
    { img: pro1, title: "5 Mukhi Rudraksha Mala", price: "$28.50", reviews: 89 },
    { img: s2, title: "Copper Sri Yantra Plate", price: "$32.00", tag: "New", reviews: 56 },
    { img: s3, title: "White Sage Smudge Bundle", price: "$12.00", reviews: 210 },
  ];
  const trendingProducts = [
  { img: s4, title: "Blue Sapphire Ring", price: "$199.00", reviews: 12 },
  { img: s5, title: "Singing Bowl - Hand Hammered", price: "$75.00", tag: "Trending", reviews: 45 },
  { img: s6, title: "Incense Sampler Set", price: "$18.00", reviews: 320 },
  { img: s7, title: "Rose Quartz Heart Stone", price: "$22.00", reviews: 87 },
];
  return (
    <>
    <div className="bg-[#f8f7f3] ">
      {/* HERO SECTION */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs tracking-widest bg-[#f3efe6] text-[#23255b] px-3 py-1 rounded-full ">
              PURE • NATURAL • ENERGIZED
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight text-[#2c2c2c]">
              Discover the Power of <br />
              <span className="text-[#184070] italic">Spiritual Energy</span>
            </h1>
            <p className="text-[#6e6e6e] mt-4">
              Handpicked sacred items crafted to align your mind, body, and soul.
            </p>
            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => setActiveBtn("shop")}
                className={`px-6 py-2 rounded-full border ${
                  activeBtn === "shop" ? "bg-[#184070] text-white" : "bg-white"
                }`} >
                Shop Sacred Collection
              </button>
              <button
                onClick={() => setActiveBtn("learn")}
                className={`px-6 py-2 rounded-full border ${
                  activeBtn === "learn" ? "bg-[#184070] text-white" : "bg-white"
                }`}>
                Explore Spiritual Wisdom
              </button>
            </div>
            {/* STATS */}
            <div className="flex gap-10 mt-8 text-sm">
              <div>
                <h3 className="font-bold text-lg">15,000+</h3>
                <p className="text-[#8a8a8a]">Blessed Customers</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">100%</h3>
                <p className="text-[#8a8a8a]">Genuine & Certified</p>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="relative flex justify-center">
            <img
              src={natural}
              className="rounded-2xl shadow-lg w-[280px] md:w-[350px]" />
            <div className="absolute bottom-5 left-5 bg-white px-4 py-3 rounded-xl shadow-md text-sm space-y-2">
              <div className="flex items-center gap-2">
                <img src={checkmark} className="w-4" />
                <span>Certified Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={star} className="w-4" />
                <span>Lab Tested Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CATEGORIES */}
      <div className="py-2 mt-0 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Sacred Categories</h2>
          <p className="text-[#7a7a7a] mt-2 text-sm">
            Explore powerful spiritual tools
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {categories.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveCategory(item.title)}
                className={`rounded-2xl overflow-hidden shadow-md cursor-pointer transition ${
                  activeCategory === item.title
                    ? "ring-2 ring-[#c7926a] scale-[1.03]"
                    : "hover:shadow-xl"
                }`} >
                <div className="relative overflow-hidden group">
              <img src={item.img}
        className="w-full h-[230px] object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  </div>
                <div className="bg-white p-4 text-left">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                  <button className="mt-3 flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#f3efe6] hover:bg-[#d8b14a] hover:text-white">
                    Explore <img src={arrow} className="w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* FEATURES */}
      <div className="py-8 bg-white mt-5">
  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6">
    {[
      { img: icon2, title: "Global Delivery" },
      { img: icon3, title: "Authenticity Guaranteed" },
      { img: undo, title: "Easy Returns" },
      { img: guidance, title: "Spiritual Guidance" },
    ].map((item, i) => (
      <div
        key={i}
        onClick={() => setActiveFeature(item.title)}
        className={`flex flex-col items-center gap-2 cursor-pointer transition ${
          activeFeature === item.title
            ? "text-[#d8b14a] scale-105"
            : "hover:text-[#d8b14a]"
        }`} >
        <img src={item.img} className="w-8" />
        <p className="text-sm font-medium">{item.title}</p>
      </div>
    ))}
      </div>
       </div>
      {/* FEATURED COLLECTION */}
      <div className="py-16 px-6 md:px-16 bg-[#f8f9fc]">
        <div className="max-w-6xl mx-auto">
       <div className="flex justify-between items-center mb-10">
       <div>
    <h2 className="text-2xl md:text-3xl font-semibold">
      Featured Collection
    </h2>
    <p className="text-sm text-gray-500">
      Handpicked spiritual tools for your collection.
    </p>
         </div>
         <button
    onClick={() => setActiveView(prev => !prev)}
    className={`flex items-center gap-2 text-sm transition ${
      activeView ? "text-[#d8b14a]" : "text-[#4974a4]" }`} >
          View All Featured
         <img src={arrow} className="w-3" />
         </button>
           </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg">
                <div className="relative">
                  <img src={item.img} className="h-[180px] w-full object-cover rounded-lg" />
                  {item.tag && (
                    <span className="absolute top-2 left-2 bg- text-[#4974a4] text-xs px-2 py-1 rounded-full">
                      {item.tag}
                    </span> )}
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={icon4} className="w-3" />
                  ))}
                  <span className="text-xs text-gray-400">
                    ({item.reviews})
                  </span>
                </div>
                <h3 className="text-sm font-semibold mt-2">
                  {item.title}
                </h3>
                <p className="text-[#4974a4] font-semibold text-sm">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* TRENDING NOW */}
     <div className="py-16 px-6 md:px-16 bg-[#f8f9fc]">
  <div className="max-w-6xl mx-auto">
    {/* HEADER */}
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold">
          Trending Now
        </h2>
        <p className="text-sm text-gray-500">
          What other seekers are currently loving.
        </p>
      </div>
        <button onClick={() => setActiveTrending(prev => !prev)}
         className={`flex items-center gap-2 text-sm transition ${
    activeTrending ? "text-[#d8b14a]" : "text-[#4974a4]" }`}>
              Explore Trending
       <img src={arrow} className="w-3" />
         </button>
    </div>
    {/* GRID */}
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
      {trendingProducts.map((item, i) => (
        <div
          key={i}
          className="bg-[#f8f9fc] p-4 rounded-xl hover:shadow-lg transition cursor-pointer"
          onClick={() => alert(item.title)}>
          <div className="relative">
            <img
              src={item.img}
              className="w-full h-[170px] object-cover rounded-lg" />
            {item.tag && (
              <span className="absolute top-2 left-2 bg-blue-100 text-[#4974a4] text-xs px-2 py-1 rounded-full">
                {item.tag}
              </span>  )}
          </div>
          {/* RATING */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={icon4} className="w-3" />
            ))}
            <span className="text-xs text-gray-400">
              ({item.reviews})
            </span>
          </div>
          {/* TITLE */}
          <h3 className="text-sm font-semibold mt-2">
            {item.title}
          </h3>
          {/* PRICE */}
          <p className="text-[#4974a4] font-semibold text-sm">
            {item.price}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>
{/* PURPLE CTA SECTION */}
<div className="px-6 md:px-16 pb-20">
  <div className="max-w-6xl mx-auto bg-gradient-to-r from-[#4974a4] to-[#4974a4] rounded-3xl text-center py-14 px-6 text-white shadow-lg">
    <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
      Shop Authentic Spiritual Products & <br className="hidden md:block" />
      Transform Your Energy
    </h2>
    <p className="text-sm mt-4 opacity-90 max-w-xl mx-auto">
      Join over 15,000 customers who trust AuraStore for their sacred tools and spiritual guidance.
    </p>
    {/* BUTTONS */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
      {/* SHOP NOW */}
      <button
        type="button"
        onClick={() => setActiveBtn("shop")}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
          activeBtn === "shop"
            ? "bg-[#d8b14a] text-black"
            : "bg-white text-[#4974a4]"  }`} >
        Shop Now
      </button>
      {/* CONSULT */}
      <button
        type="button"
        onClick={() => setActiveBtn("consult")}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
          activeBtn === "consult"
            ? "bg-[#d8b14a] text-black border-[#d8b14a]"
            : "bg-white text-[#4974a4] border-white"  }`}>
        Consult an Expert
      </button>
    </div>
  </div>
</div>
    </div>
    <Footer />
    </>
  );
}