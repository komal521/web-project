import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import b3 from "../assets/b3.jpeg";
import pencil from "../assets/pencil (1).png";
import bag from "../assets/bag.webp";
import heart from "../assets/heart (1).png";
import checkout from "../assets/checkout.png";
import  medal from "../assets/medal.png";
import user from "../assets/user.png";
import gmail from "../assets/gmail.png";
import phone from "../assets/phone-call.png";
import verified from "../assets/verified.png";
import location from "../assets/location.png";
import { useState } from "react";
import notification from "../assets/notification (1).png";
import padlock from "../assets/padlock.png";
import checked from "../assets/checked.png";
import rightArrow from "../assets/right-arrow.png";
import box from "../assets/box.png";
import shoppingCart from "../assets/shopping-cart.png";
import appointment from "../assets/appointment.png";
import logout from "../assets/logout.png";
const profile = () =>{
    const [notifications, setNotifications] = useState(true);
    return(
        <>
        <Navbar/>
        <div className="max-w-6xl mx-auto mt-10 px-4">
           <div className="bg-[#E6D38B] rounded-xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow">
               <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    <div className="relative">
                        <img src={b3} alt=""
                     className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-yellow-500"/>
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow">  
                             <img src ={pencil} alt="" className="w-5 h-5"/></div>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold">  Maximilian Thorne</h2> 
                        <p className="text-gray-700 mt-2">m.thorne@aurelian-luxe.com</p>
                        <span className="inline-block mt-2 bg-yellow-800 text-black text-xs  font-semibold px-3 py-1 rounded-full">
                             GOLD PATRON</span>
                    </div>
                </div>
                <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold
                hover:bg-purple-800">Edit Profile </button>
            </div>
            <div className=" max-w-6xl  mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-500 flex items-center gap-4 ">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                            <img src={bag} alt="" className="w-7 h-7 object-contain"/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-semibold">  Total Orders</p>
                            <h3 className="text-3xl font-bold text-gray-600">48</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-14 h-14  bg-pink-100 rounded-full flex items-center justify-center">
                            <img  src={heart} alt="" className="w-6 h-6 object-contain"/>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-semibold"> Wishlist Items</p>
                            <h3 className="text-3xl font-bold text-gray-600">124</h3>
                        </div>
                    </div>
                     {/* Cart */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <img src={checkout} alt="" className="w-6 h-6 object-contain" />
            </div>
      <div>
        <p className="text-xs text-gray-500 uppercase font-semibold">
          Cart Items
        </p>
        <h3 className="text-3xl font-bold text-gray-800">03</h3>
      </div>
    </div>
    {/* Reward */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
        <img src={medal} alt="" className="w-6 h-6 object-contain" />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase font-semibold">
          Reward Points
        </p>
        <h3 className="text-3xl font-bold text-gray-800">15,420</h3>
      </div>
    </div>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 mb-6">
  <div className="lg:col-span-2 space-y-8">
            <div className=" bg-white rounded-2xl shadow-sm border border-gray-200  overflow-hidden"> 
                <div className=" flex items-center justify-between p-6 border-b  border-gray-400">
                    <div>
                        <h2 className="text -xl font-bold  text-gray-400">Personal Information</h2>
                        <p className="text-gray-400 text-sm mt-1"> Manage your primary contact and shipping details.</p>
                    </div>
                    <img src ={pencil} alt="" className="w-5 h-5 cursor-pointer"/>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font font-semibold text-gray-500 uppercase mb-2"> Full Name</label>
                            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4 min-h-[56px]">
            <img src={user} alt="" className="w-5 h-5" />
            <span className="text-gray-700">
              Maximilian Thorne
            </span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
            Email Address
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <img src={gmail} alt="" className="w-5 h-5" />
            <span className="text-gray-700 break-all">
              m.thorne@aurelian-luxe.com
            </span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
            Phone Number
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <img src={phone} alt="" className="w-5 h-5" />
            <span className="text-gray-700">
              +1 (555) 902-1432
            </span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
            Preferred Language
          </label>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
            <img src={verified} alt="" className="w-5 h-5" />
            <span className="text-gray-700">
              English (United States)
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
          Primary Billing Address
        </label>

        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
          <img src={location} alt="" className="w-5 h-5" />
          <span className="text-gray-700">
            742 Evergreen Terrace, Suite 10, New York, NY 10001
          </span>
        </div>
      </div></div>
    <div className="mt-8">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">
        Account Settings
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Configure security and communication preferences.
      </p>
    </div>
    <div className="flex items-center justify-between p-5 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <img src={notification} alt="" className="w-5 h-5" />
        <div>
          <h4 className="font-medium text-gray-800">
            Push Notifications
          </h4>
          <p className="text-xs text-gray-500">
            Receive alerts about shipping updates and exclusive drops.
          </p>
        </div>
      </div>
      <button onClick={() => setNotifications(!notifications)}
        className={`relative w-14 h-8 rounded-full transition-all ${
          notifications ? "bg-purple-600" : "bg-gray-300"
        }`}>
        <span
          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
            notifications ? "right-1" : "left-1"
          }`} />
      </button>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 gap-4">
      <div className="flex items-center gap-4">
        <img src={padlock} alt="" className="w-5 h-5" />
        <div>
          <h4 className="font-medium text-gray-800">
            Change Password
          </h4>
          <p className="text-xs text-gray-500">
            Last updated 3 months ago. We recommend regular changes.
          </p>
        </div>
      </div>
      <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
        Manage
      </button>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 gap-4">
      <div className="flex items-center gap-4">
        <img src={verified} alt="" className="w-5 h-5" />
        <div>
          <h4 className="font-medium text-gray-800">
            Privacy & Data
          </h4>
          <p className="text-xs text-gray-500">
            Control how your browsing data is used for personalization.
          </p>
        </div>
      </div>
      <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
        Configure
      </button>
    </div>
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-4">
        <img src={checked} alt="" className="w-5 h-5" />
        <div>
          <h4 className="font-medium text-gray-800">
            Help & Support
          </h4>
          <p className="text-xs text-gray-500">
            Reach our 24/7 VIP concierge for luxury assistance.
          </p>
        </div>
    </div>
      <img src={rightArrow} alt="" className="w-4 h-4 cursor-pointer"   />
         </div>
         </div>
       </div>
                </div> 
                </div>
    <div className="lg:col-span-1">
  <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
    Quick Management
  </h3>
  <div className="space-y-4">
    <div className="bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <img src={box} alt="" className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">My Orders</h4>
          <p className="text-xs text-gray-500">
            Track, return, or buy again
          </p>
        </div>
      </div>
      <img src={rightArrow} alt="" className="w-4 h-4" />
    </div>
    <div className="bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <img src={heart} alt="" className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">My Wishlist</h4>
          <p className="text-xs text-gray-500">
            Items you've been eyeing
          </p>
        </div>
      </div>
      <img src={rightArrow} alt="" className="w-4 h-4" />
    </div>
    <div className="bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <img src={shoppingCart} alt="" className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">Shopping Cart</h4>
          <p className="text-xs text-gray-500">
            3 items ready for checkout
          </p>
        </div>
      </div>
      <img src={rightArrow} alt="" className="w-4 h-4" />
    </div>
    <div className="bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <img src={location} alt="" className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">Saved Addresses</h4>
          <p className="text-xs text-gray-500">
            Manage your delivery locations
          </p>
        </div>
      </div>
      <img src={rightArrow} alt="" className="w-4 h-4" />
    </div>
    <div className="bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <img src={appointment} alt="" className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-sm">Payment Methods</h4>
          <p className="text-xs text-gray-500">
            Secure cards and digital wallets
          </p>
        </div>
      </div>
      <img src={rightArrow} alt="" className="w-4 h-4" />
    </div>
    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold">
      <img src={logout} alt="" className="w-5 h-5 invert" />
      LOGOUT SECURELY
    </button>

  </div>
</div>
  </div>
        </div>
            </div>
        <Footer/>
        </>
    );
};
export default profile;