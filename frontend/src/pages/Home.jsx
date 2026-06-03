import heroImage from "../assets/p1.avif";
import arrowIcon from "../assets/right-arrow (1).png";
import starIcon from "../assets/star.png";
import Navbar from "../component/Navbar";
import { useState } from "react";
import k1 from "../assets/k1.webp";
import k2 from "../assets/k2.webp";
import k3 from "../assets/k3.webp";
import k4 from "../assets/k4.webp";
import k5 from "../assets/k5.webp";
import k6 from "../assets/k6.webp";
import m1 from "../assets/m1.webp";
import m2 from "../assets/m2.webp";
import m3 from "../assets/m3.webp";
import m4 from "../assets/m4.webp";
import o1 from "../assets/o1.webp";
import addIcon from "../assets/add.png";
import rightArrow from "../assets/right-arrow.png";
import leftArrow from "../assets/left-arrow.png";
import u1 from "../assets/u1.avif";
import u2 from "../assets/u2.webp";
import u3 from "../assets/u3.avif";
import truckIcon from "../assets/cargo-truck.png";
import verifiedIcon from "../assets/verified.png";
import musicIcon from "../assets/musical-note.png";
import Footer from "../component/Footer";
import cartIcon from "../assets/shopping-cart.png";
import viewArrow from "../assets/right-arrow (1).png";
const Home = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [activeReview, setActiveReview] = useState(3);
  const categories = [
  {
    id: 1,
    name: "Electronics",
    products: "1,240 Products",
    image: k1,
  },
  {
    id: 2,
    name: "Fashion",
    products: "4,500 Products",
    image: k2,
  },
  {
    id: 3,
    name: "Accessories",
    products: "890 Products",
    image: k3,
  },
  {
    id: 4,
    name: "Home & Living",
    products: "2,100 Products",
    image: k4,
  },
  {
    id: 5,
    name: "Beauty",
    products: "1,150 Products",
    image: k5,
  },
  {
    id: 6,
    name: "Computers",
    products: "670 Products",
    image: k6,
  },
];
const featuredProducts = [
  {
    id: 1,
    image: m1,
    category: "Electronics",
    title: "Aura Noise Cancelling",
    price: "₹20,999",
    oldPrice: "₹24,999",
    discount: "17% OFF",
  },
  {
    id: 2,
    image: m2,
    category: "Accessories",
    title: "Lumina Smart Timepiece",
    price: "₹33,999",
    oldPrice: "₹39,999",
    discount: "",
  },
  {
    id: 3,
    image: m3,
    category: "Home & Living",
    title: "Zenith Minimalist Coffee",
    price: "₹10,999",
    oldPrice: "₹13,499",
    discount: "19% OFF",
  },
  {
    id: 4,
    image: m4,
    category: "Fashion",
    title: "Voyager Leather Travel",
    price: "₹18,499",
    oldPrice: "₹22,999",
    discount: "",
  },
];
const newArrivals = [
  {
    id: 1,
    image: k2,
    title: "Urban Edge Hoodie",
    price: "₹5,500",
  },
  {
    id: 2,
    image: k1,
    title: "Nordic Ceramic Vases",
    price: "₹12,000",
  },
  {
    id: 3,
    image: k4,
    title: "Professional Tablet Pro",
    price: "₹99,000",
  },
];

const testimonials = [
  {
    id: 1,
    image: u1,
    name: "Sarah Jenkins",
    role: "Interior Designer",
    review:
      "The quality of the home decor items surpassed my expectations. The minimalist aesthetic perfectly matches my studio.",
  },
  {
    id: 2,
    image: u2,
    name: "Marcus Thorne",
    role: "Tech Reviewer",
    review:
      "The Aura headphones are a game changer. Customer service was incredibly responsive when I had a shipping question.",
  },
  {
  id: 3,
  image: u3,
  name: "Elena Rodriguez",
  role: "Professional Photographer",
  review: "Finding premium bags that are actually durable is tough. The voyager duffel is now my go-to for all location shoots.",
},
];
  return (
       <>
      <Navbar />
    <section className="bg-[#f7f7f7] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full">
              SPRING COLLECTION 2024
            </span>
            <h1 className="mt-6 text-5xl lg:text-7xl font-bold leading-tight">
              Refine Your
              <br />
              <span className="text-blue-600 italic">
                Aesthetic
              </span>
              <br />
              Every Day.
            </h1>
            <p className="mt-6 text-gray-600 text-lg max-w-lg">
              Discover curated selections from the world's most innovative
              brands. Premium quality, sustainable materials and timeless
              design at your fingertips.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-blue-600 text-white px-7 py-4 rounded-full flex items-center gap-3 hover:bg-blue-700">
                Shop Now
                <img src={arrowIcon} alt="" className="w-4 h-4 invert"/>
              </button>
              <button className="border border-gray-300 px-7 py-4 rounded-full hover:bg-white">
                Explore Products
              </button>
            </div>
            <div className="flex flex-wrap gap-10 mt-12">
              <div>
                <h3 className="text-3xl font-bold">15k+</h3>
                <p className="text-gray-500">Premium Items</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">98%</h3>
                <p className="text-gray-500">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">24h</h3>
                <p className="text-gray-500">Fast Delivery</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={heroImage} alt="" className="rounded-2xl shadow-2xl w-full"/>
            <div className="absolute -bottom-5 left-4 bg-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3">
              <img src={starIcon} alt="" className="w-5 h-5"/>
              <div>
                <h4 className="font-semibold text-sm">
                  Flash Deal Live
                </h4>
                <p className="text-xs text-gray-500">
                  Up to 40% off electronics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<section className="bg-[#f7f7f7] py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between mb-10">
      <div>
        <h2 className="text-4xl font-bold text-gray-900">
          Shop by Category
        </h2>
        <p className="text-gray-500 mt-2">
          Find exactly what you're looking for across our curated departments.
        </p>
      </div>
      <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold">
        View All
        <img  src={viewArrow}  alt=""  className="w-4 h-4"/>
      </button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
      {categories.map((item) => (
        <div key={item.id}
          onClick={() => setActiveCategory(item.id)}
          className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 flex flex-col items-center text-center
          ${
            activeCategory === item.id
              ? "bg-sky-500 text-white border-sky-500 shadow-lg"
              : "bg-white border-gray-200 hover:shadow-md"
          }`} >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4
            ${
              activeCategory === item.id
                ? "bg-white"
                : "bg-gray-100"
            }`}>
            <img src={item.image} alt={item.name}  className="w-8 h-8 object-contain" />
          </div>
          <h3 className={`font-semibold ${   activeCategory === item.id
                ? "text-white"
                : "text-gray-900"
            }`}>
            {item.name}
          </h3>
          <p
            className={`text-sm mt-1 ${
              activeCategory === item.id
                ? "text-white/80"
                : "text-gray-500"
            }`} >
            {item.products}
          </p>
        </div>
      ))}
    </div>
    <div className="md:hidden flex justify-center mt-8">
      <button className="flex items-center gap-2 text-blue-600 font-semibold">
        View All
        <img src={viewArrow} alt=""  className="w-4 h-4" />
      </button>
    </div>
  </div>
</section>
<section className="py-20 bg-gradient-to-r from-[#e9e9ef] to-[#c7b8ff]">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900">
        Featured Products
      </h2>
      <p className="text-gray-600 mt-3">
        Handpicked by our experts for exceptional quality and innovative design.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <div  key={product.id}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
          <div className="relative">
            <img  src={product.image} alt="" className="w-full h-64 object-cover" />
            {product.discount && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {product.discount}
              </span>
            )}
          </div>
          <div className="p-4">
            <p className="text-xs uppercase text-gray-400 mb-2">
              {product.category}
            </p>
            <h3 className="font-semibold text-lg text-gray-900">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 my-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <img key={item} src={starIcon} alt="" className="w-4 h-4" />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold">
                {product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 border border-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
                Details
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <img src={cartIcon} alt="" className="w-4 h-4 invert"/>
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="bg-[#f7f7f7] py-16">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-xl">
      <div className="bg-yellow-400 p-8 md:p-14 flex flex-col justify-center">
        <span className="bg-black text-white text-xs px-4 py-2 rounded-full w-fit mb-6">
          LIMITED TIME OFFER
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Mid-Season Sale:
          <br />
          Up to 60% Off
          <br />
          Selected Items
        </h2>
        <p className="text-white/90 mt-5">
          Upgrade your lifestyle with our most popular products
          at unbeatable prices.
        </p>
        <div className="flex gap-3 mt-8 flex-wrap">
          <div className="bg-purple-600 text-white rounded-lg px-4 py-3 text-center">
            <div className="font-bold">02</div>
            <div className="text-xs">Days</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg px-4 py-3 text-center">
            <div className="font-bold">14</div>
            <div className="text-xs">Hrs</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg px-4 py-3 text-center">
            <div className="font-bold">35</div>
            <div className="text-xs">Min</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg px-4 py-3 text-center">
            <div className="font-bold">08</div>
            <div className="text-xs">Sec</div>
          </div>
        </div>
        <button className="mt-8 bg-black text-white px-8 py-3 rounded-full w-fit">
          Shop the Sale Now
        </button>
      </div>
      <div>
        <img src={o1} alt="" className="w-full h-full object-cover min-h-[300px]"/>
      </div>
    </div>
  </div>
</section>
<section className="bg-[#f7f7f7] py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-4xl font-bold text-gray-900">
          New Arrivals
        </h2>
        <p className="text-gray-500 mt-2">
          The latest trends and tech, fresh from the design studio.
        </p>
      </div>
      <div className="hidden md:flex gap-3">
        <button className="w-10 h-10 rounded-full border flex items-center justify-center">
         <img src={leftArrow} alt="" className="w-3" /> 
        </button>
        <button className="w-10 h-10 rounded-full border flex items-center justify-center">
          <img src={rightArrow} alt="" className="w-3" />
        </button>
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {newArrivals.map((item) => (
        <div key={item.id}
          className="bg-white border rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition">
          <img src={item.image} alt="" className="w-24 h-24 rounded-lg object-cover"/>
          <div>
            <h3 className="font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="text-blue-600 font-bold mt-1">
              {item.price}
            </p>
            <button className="mt-2 flex items-center gap-2 text-sm text-gray-500 hover:text-black">
              Add to Cart
  <img src={addIcon} alt="" className="w-4 h-4"  /></button>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-28">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-3">
          Real experiences from our global community of design enthusiasts.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
         <div key={item.id} onClick={() => setActiveReview(item.id)}
  className={`rounded-2xl p-8 border cursor-pointer transition-all duration-300 ${
    activeReview === item.id
      ? "bg-yellow-300 border-yellow-300"
      : "bg-white hover:shadow-lg"
  }`}>
            <div className="flex gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <img key={star} src={starIcon} alt="" className="w-4 h-4"/>
              ))}
            </div>
            <p className="text-gray-600 italic leading-relaxed">
              "{item.review}"
            </p>
            <div className="flex items-center gap-3 mt-6">
              <img src={item.image} alt=""
                className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="border-t mt-20 pt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center gap-4">
          <img src={truckIcon} alt="" className="w-8 h-8" />
          <div>
            <h4 className="font-semibold">
              Free Express Shipping
            </h4>
            <p className="text-sm text-gray-500">
              Orders over ₹1500
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img src={verifiedIcon} alt="" className="w-8 h-8" />
          <div>
            <h4 className="font-semibold">
              Secure Payment
            </h4>
            <p className="text-sm text-gray-500">
              100% protected data
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img src={starIcon} alt="" className="w-8 h-8" />
          <div>
            <h4 className="font-semibold">
              Genuine Products
            </h4>
            <p className="text-sm text-gray-500">
              Direct from manufacturers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <img src={musicIcon} alt="" className="w-8 h-8" />
          <div>
            <h4 className="font-semibold">
              24/7 Support
            </h4>
            <p className="text-sm text-gray-500">
              Dedicated team
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
  <Footer />
     </>
       
  );
};

export default Home;