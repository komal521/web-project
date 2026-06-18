import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import cloths from "../assets/cloths.jpeg";
import filterIcon from "../assets/filter.png";
import downArrow from "../assets/down-arrow.png";
import k3 from "../assets/k3.webp";
import purse from "../assets/purse.webp";
import c2 from "../assets/c2.webp";
import bag from "../assets/bag.webp";
import earrings from "../assets/earrings.webp";
import shoes from "../assets/shoes.webp";
import heart from "../assets/heart (1).png";
import star from "../assets/star (1).png";
import cart from "../assets/shopping-cart.png";
import b1 from "../assets/b1.webp";
import b3 from "../assets/b3.webp";
import c3 from "../assets/c3.avif";
import bagIcon from "../assets/bag.png";
import watchIcon from "../assets/wristwatch.png";
import laptopIcon from "../assets/laptop.png";
import rightArrow from "../assets/right-arrow (1).png";
const Categories =() =>{
  const products =[
    {
      id: 1,
      image: k3,
      category: "Watches",
      name :"Regency Gold Chronograph",
      price: "₹89,999",
       badge: "NEW ARRIVAL",
    },
    {
      id : 2,
      image: purse,
      category :"Bags",
      name:"Midnight Suede Clutch",
      price:"₹52,000",
    },
    {
      id: 3,
      image:c2 ,
      category:"ACCESSORIES",
      name:"Versatile Silk Scarf",
      price:"₹24,000",
      badge: "Sale",
    },
    {
      id: 4,
      image: bag,
      category:"BAGS",
      name:"Premium Tote Bag",
      price:"₹32,000",
    },
    {
      id: 5,
      image :earrings,
      category : "JEWELRY",
      name :"Aura Crystal Earrings",
      price : "₹49,000",
      badge:"NEW ARRIVAL",
    },
    {
      id:6,
      image : shoes,
      category: "SHOES",
      name:"Empire Leather Loafers",
       price: "₹54,999",
    },
  ];
const [categories,setCategories] = useState([]);
const [activePage, setActivePage] = useState(1);
useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/categories"
    );

    const data = await res.json();
console.log("API Response:", data);
    console.log(data);
setCategories(
  Array.isArray(data)
    ? data
    : data.categories || []
);
    
  } catch (error) {
    console.log(error);
  }
};
console.log("Categories State:", categories);
  return(
    <>
    <Navbar/>
    <div className ="bg-[#f5f5fa] min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden  rounded-3xl h-[220px] md:h-[320px]">
          <img src= {cloths}alt="Luxury Collection" className="w-full h-full object-cover"/>
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white max-w-md">
          <span className="bg-yellow-400 text-black top-7 px-3 py-1 rounded-full text-xs font-semibold">   Curated Selection</span>
          <h1 className="mt-3 text-3xl md:text-6xl font-bold leading-none"> Luxury <br/>
          <span className="text-blue-400 italic">  Essentials</span></h1>
          <p className="mt-3 text-sm  md:text-base"> Explore our artisan-crafted collection designed
                for the modern lifestyle.</p>
          <div className="flex gap-3 mt-4">
          <button className="bg-white text-purple-700  px-4 py-2 rounded-lg font-medium">  Explore All</button>
          <button className= "bg-white/90 text-gray-700 px-4 py-2 rounded-lg font-medium">View Lookbook</button>
          </div>
           </div>
            </div>
             </div>
             <div className ="max-w-7xl mx-auto mt-8">
              <div className="flex flex-col lg:flex-row gap-6">
              <div className = "w-full lg:w-72 bg-white rounded-2xl p-5 shadow-sm ">
                <div className ="flex items-center justify-between  mb-6">
                  <div className="flex items-center gap-2">
                    <img src ={filterIcon} alt="" className="w-4 h-4"></img>
                    <h3 className ="font-semibold">Filter By</h3>
                  </div>
                  <button className="text-xs text-gray-500">Clear All</button>
                </div>
                {/*Categories*/}
                <div className ="border-b pb-4 mb-4">
                  < div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm  font-bold ">Categories</h4>
                  <img src={downArrow} alt="" className="W-3 h-3"/>
                  </div>
               <div className="space-y-2 text-sm text-gray-600">
  {categories.map((item) => (
    <label
      key={item.id}
      className="flex items-center gap-2" >
      <input type="checkbox" />
      {item.category_name}
              </label>
                   ))}
                   </div>
                                </div>
                        <div className="border-b pb-4 mb-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className=" text-sm font-medium">Price Range</h4>
                            <img src={downArrow} alt="" className="w-3 h-3"/>
                          </div>
                          <input type="range" min ="50" max ="200" className="w-full accent-purple-800"/>
                          <div className="flex gap-3 mt-4">
                            <div>
                              <p className="text-[10px] text-gray-600 mb-1"> MIN </p>
                              <input type="text" value="₹0" readOnly 
                              className="w-20 border rounded px-2 py-1 text-sm"/>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-500 mb-1">Max</p>
                              <input type="text" value="₹200"  readOnly className="w-20 border rounded px-2 py-1 text-sm"/>
                            </div>
                           </div>
                            </div>
                             {/* Featured Brands */}
                            <div className="border-b pb-4 mb-4">
                              <div className="flex items-center  justify-between mb-3">
                                <h4 className="text-sm  font-semibold">Featured Brands</h4>
                                <img src ={downArrow} alt="" className="w-3 h-3"/>
                              </div>
                              <div className="space-y-2 text-sm  text-gray-600">
                                <label className="flex items-center gap-2" >
                                  <input type="checkbox"/>
                                      Aura Private Label
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type ="checkbox"/>
                                   Vincenzo & Co.
                                </label>
                                <label className=" flex items-center gap-2">
                                  <input type ="checkbox"/>Lumina Paris
                                </label>
                                <label className="flex items-center gap-2">
                                  <input type="checkbox"/>
                                   Ethereal Swiss
                                </label>
                                <label className="flex items-center gap-2" >
                                  <input type ="checkbox"/>
                                  Marquis London
                                </label>
                              </div>
                            </div>
                            {/*Colour Palette*/}
                            <div className="border-b pb-4  mb-6">
                              <div className="flex items-center justify-between" >
                                <h4 className="text-sm  font-medium"> Colour Palette</h4>
                                <img  src={downArrow} alt="" className=" w-3 h-3"/>
                              </div>
                            </div>
                            <div  className=" bg-purple-400 border border-purple-500 rounded-2xl p-4">
                              <h4 className="text-yellow-800 font-semibold mb-2"> Prive Membership</h4>
                              <p className="text-xs text-gray-600 mb-4"> Join our inner circle for exclusive early access and bespoke concierge services.</p>
                              <button className="bg-white text-black  px-4 py-2 rounded-full text-xs font-medium">Join Now</button>
                            </div>
                             </div>
                             {/* Products Section */}
                     <div className="flex-1">
                      <div className="flex items-center justify-between mb-6">
                       <p className="text-sm text-gray-500">
                         Showing 1-12 of 48 exquisite items
                          </p>
                <div className="flex items-center gap-2">
                 <span className="text-xs text-gray-500">SORT BY</span>
                       <button className="border rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                     Most Coveted
                     <img src={downArrow} alt="" className="w-3 h-3" />
               </button>
                 </div>
                  </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
  {categories.map((item) => (
   <div
  key={item.id}
  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
>
  <div className="relative">
    <img
      src={`http://localhost:5000/uploads/${item.image}`}
      alt={item.category_name}
      className="w-full h-64 object-cover"
    />

    <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
      <img src={heart} alt="" className="w-4 h-4" />
    </button>
    <button 
      onClick={() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.push({ img: `http://localhost:5000/uploads/${item.image}`, title: item.category_name, tag: "Category", price: "₹1,450" });
        localStorage.setItem("cart", JSON.stringify(cartItems));
        window.location.href = "/cart";
      }}
      className="absolute top-3 right-12 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
      <img src={cart} alt="" className="w-4 h-4" />
    </button>
  </div>

  <div className="p-4">
    <p className="text-[10px] tracking-wider text-gray-500 uppercase">
      CATEGORY
    </p>

    <h3 className="mt-1 font-medium text-gray-800">
      {item.category_name}
    </h3>

    <button 
      onClick={() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.push({ img: `http://localhost:5000/uploads/${item.image}`, title: item.category_name, tag: "Category", price: "₹1,450" });
        localStorage.setItem("cart", JSON.stringify(cartItems));
        window.location.href = "/cart";
      }}
      className="mt-4 w-full bg-purple-700 hover:bg-purple-800 transition text-white py-2 rounded-lg">
      Add to Cart
    </button>
  </div>
</div>
                    ))}
                      </div>
                        </div>                
                           </div>
          <div className="flex justify-center items-center gap-3 mt-10">
              <button className="border px-4 py-2 rounded-lg text-gray-500">
               Prev
              </button>
           {[1, 2, 3, 4, 5].map((page) => (
    <button
      key={page}
      onClick={() => setActivePage(page)}
      className={`w-10 h-10 rounded-lg transition
        ${
          activePage === page
            ? "bg-purple-700 text-white shadow-lg"
            : "bg-white text-gray-700 border"
        }`} >
      {page}
    </button>))}
  <button className="border px-4 py-2 rounded-lg text-gray-700">
    Next
  </button>
</div>  
    </div>
       </div>
         <div></div>
                <Footer/>
       </>
  )
}
export default Categories;  