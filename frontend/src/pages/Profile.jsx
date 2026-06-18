import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import b3 from "../assets/b3.jpeg";
import pencil from "../assets/pencil (1).png";
import bag from "../assets/bag.webp";
import heart from "../assets/heart (1).png";
import checkout from "../assets/checkout.png";
import medal from "../assets/medal.png";
import user from "../assets/user.png";
import gmail from "../assets/gmail.png";
import phone from "../assets/phone-call.png";
import verified from "../assets/verified.png";
import location from "../assets/location.png";
import { useEffect, useState } from "react";
import notification from "../assets/notification (1).png";
import padlock from "../assets/padlock.png";
import checked from "../assets/checked.png";
import rightArrow from "../assets/right-arrow.png";
import box from "../assets/box.png";
import shoppingCart from "../assets/shopping-cart.png";
import appointment from "../assets/appointment.png";
import logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [userData, setUserData] = useState({
    id: "", fullName: "", email: "", phone: "", address: "",
    profileImage: "", username: "",
  });
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount] = useState(0);
  const [rewardPoints] = useState(15420);
  const [notifications, setNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUserData({
      id: storedUser.id || "",
      fullName: storedUser.fullName || "",
      email: storedUser.email || "",
      phone: storedUser.phone || "",
      address: storedUser.address || "",
      profileImage: storedUser.profileImage || "",
      username: storedUser.username || "",
    });
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
    if (storedUser.id) {
      fetchUserFromBackend(storedUser.id);
      fetchUserOrders(storedUser.email);
      fetchActivities();
    } else {
      setLoading(false);
    }
  }, []);
  const fetchUserFromBackend = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users`);
      const data = await res.json();
      if (data.success) {
        const found = data.users.find((u) => u.id === Number(userId));
        if (found) {
          setUserData((prev) => ({
            ...prev,
            fullName: found.fullName || prev.fullName,
            email: found.email || prev.email,
            phone: found.phone || prev.phone,
            address: found.address || prev.address,
          }));
        }
      }
    } catch (err) {
      console.log("Backend fetch failed:", err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserOrders = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders`);
      const data = await res.json();
      if (data.success) {
        const myOrders = data.orders.filter(
          (o) => o.email?.toLowerCase() === email?.toLowerCase()
        );
        setOrders(myOrders);
        setOrderCount(myOrders.length);
      }
    } catch (err) {
      console.log("Orders fetch failed:", err.message);
    }
  };
  const fetchActivities = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/activities");
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.log("Activities fetch failed:", err);
    }
  };

  const handleSave = async () => {
    if (!userData.id) {
      setSaveMsg("Please log in to save profile.");
      return;
    }
    setIsSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg("✓ Profile updated successfully!");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), ...userData })
        );
        setIsEditing(false);
        setTimeout(() => setSaveMsg(""), 3000);
      } else {
        setSaveMsg("Failed to update profile.");
      }
    } catch (err) {
      setSaveMsg("Server error. Please start the backend.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const formatINR = (val) =>
    `₹${Number(val || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  const statusColor = (status) => {
    const s = (status || "Pending").toLowerCase();
    if (s === "completed") return "bg-green-100 text-green-700";
    if (s === "cancelled") return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-700";
  };

  const statsCards = [
    { label: "Total Orders", value: orderCount, img: bag, bg: "bg-purple-100" },
    { label: "Wishlist Items", value: wishlistCount, img: heart, bg: "bg-pink-100" },
    { label: "Cart Items", value: cartCount, img: checkout, bg: "bg-yellow-100" },
    { label: "Reward Points", value: rewardPoints.toLocaleString("en-IN"), img: medal, bg: "bg-purple-100" },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 px-4 pb-12">

        {/* Hero Banner */}
        <div className="bg-[#E6D38B] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt=""
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-yellow-500" />
              ) : (
                <img src={b3} alt=""
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-yellow-500" />
              )}
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow cursor-pointer hover:bg-yellow-50 transition">
                <img src={pencil} alt="" className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold">
                {loading ? "Loading..." : userData.fullName || "Guest User"}
              </h2>
              <p className="text-gray-700 mt-1 text-sm">{userData.email}</p>
              <span className="inline-block mt-2 bg-yellow-800 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                GOLD PATRON
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            {saveMsg && (
              <p className={`text-sm font-medium px-4 py-1 rounded-full ${saveMsg.startsWith("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {saveMsg}
              </p>
            )}
            {isEditing ? (
              <div className="flex gap-3">
                <button onClick={handleSave} disabled={isSaving}
                  className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 disabled:opacity-60 transition">
                  {isSaving ? "Saving..." : "Save Profile"}
                </button>
                <button onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)}
                className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-800 transition">
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {statsCards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`w-14 h-14 ${card.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <img src={card.img} alt="" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold leading-tight">{card.label}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mt-0.5">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
              {["info", "orders", "activity"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition ${activeTab === tab ? "bg-white shadow text-purple-700" : "text-gray-500 hover:text-gray-700"}`}>
                  {tab === "info" ? "Personal Info" : tab === "orders" ? `My Orders (${orderCount})` : "Activity Timeline"}
                </button>
              ))}
            </div>
            {activeTab === "info" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                    <p className="text-gray-400 text-sm mt-0.5">Manage your contact and shipping details.</p>
                  </div>
                  <button onClick={() => setIsEditing(!isEditing)}>
                    <img src={pencil} alt="" className="w-5 h-5 cursor-pointer opacity-60 hover:opacity-100 transition" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Full Name</label>
                      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 min-h-[52px] focus-within:border-purple-400 transition">
                        <img src={user} alt="" className="w-5 h-5 flex-shrink-0" />
                        {isEditing ? (
                          <input type="text" className="w-full outline-none text-gray-700 text-sm"
                            value={userData.fullName}
                            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} />
                        ) : (
                          <span className="text-gray-700 text-sm">{userData.fullName || "—"}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Email Address</label>
                      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 min-h-[52px] focus-within:border-purple-400 transition">
                        <img src={gmail} alt="" className="w-5 h-5 flex-shrink-0" />
                        {isEditing ? (
                          <input type="email" className="w-full outline-none text-gray-700 text-sm"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                        ) : (
                          <span className="text-gray-700 text-sm break-all">{userData.email || "—"}</span>
                        )}
                      </div>
                    </div>
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Phone Number</label>
                      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 min-h-[52px] focus-within:border-purple-400 transition">
                        <img src={phone} alt="" className="w-5 h-5 flex-shrink-0" />
                        {isEditing ? (
                          <input type="text" className="w-full outline-none text-gray-700 text-sm"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                        ) : (
                          <span className="text-gray-700 text-sm">{userData.phone || "Not provided"}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Preferred Language</label>
                      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 min-h-[52px]">
                        <img src={verified} alt="" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">English (United States)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Primary Billing Address</label>
                    <div className="flex items-start gap-3 border border-gray-200 rounded-xl px-4 py-3 min-h-[52px] focus-within:border-purple-400 transition">
                      <img src={location} alt="" className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      {isEditing ? (
                        <textarea className="w-full outline-none resize-none text-gray-700 text-sm"
                          value={userData.address}
                          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                          rows="2" placeholder="Enter your address" />
                      ) : (
                        <span className="text-gray-700 text-sm">{userData.address || "Not provided"}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 mt-2">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Account Settings</h2>
                    <p className="text-gray-500 text-sm mt-0.5">Security and communication preferences.</p>
                  </div>
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <img src={notification} alt="" className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Push Notifications</h4>
                        <p className="text-xs text-gray-500">Shipping updates and exclusive drops.</p>
                      </div>
                    </div>
                    <button onClick={() => setNotifications(!notifications)}
                      className={`relative w-14 h-7 rounded-full transition-all ${notifications ? "bg-purple-600" : "bg-gray-300"}`}>
                      <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${notifications ? "right-0.5" : "left-0.5"}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <img src={padlock} alt="" className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Change Password</h4>
                        <p className="text-xs text-gray-500">Last updated 3 months ago.</p>
                      </div>
                    </div>
                    <button onClick={() => {
                        const newPassword = prompt("Enter new password:");
                        if(newPassword && newPassword.length >= 6) {
                            fetch(`http://localhost:5000/api/users/password/${userData.id}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ password: newPassword }),
                            }).then(res => res.json()).then(data => {
                                if(data.success) alert("Password updated successfully!");
                                else alert("Failed to update password");
                            }).catch(err => alert("Error updating password"));
                        } else if(newPassword) {
                            alert("Password must be at least 6 characters");
                        }
                    }} className="px-4 py-1.5 bg-gray-100 rounded-full text-xs font-semibold hover:bg-gray-200 transition">Manage</button>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      <img src={checked} alt="" className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Help & Support</h4>
                        <p className="text-xs text-gray-500">24/7 VIP concierge assistance.</p>
                      </div>
                    </div>
                    <img src={rightArrow} alt="" className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 transition" />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">My Orders</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Your recent purchase history</p>
                </div>
                {orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img src={bag} alt="" className="w-8 h-8 object-contain" />
                    </div>
                    <p className="text-gray-500 font-medium">No orders yet</p>
                    <p className="text-gray-400 text-sm mt-1">Your orders will appear here after checkout</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                        <tr>
                          <th className="px-5 py-3 text-left">Order #</th>
                          <th className="px-5 py-3 text-left">Date</th>
                          <th className="px-5 py-3 text-left">Amount</th>
                          <th className="px-5 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 transition">
                            <td className="px-5 py-4 font-semibold text-gray-800 text-sm">#{order.id}</td>
                            <td className="px-5 py-4 text-gray-500 text-sm">{formatDate(order.created_at)}</td>
                            <td className="px-5 py-4 font-bold text-gray-900 text-sm">{formatINR(order.total_amount)}</td>
                            <td className="px-5 py-4">
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(order.status)}`}>
                                {order.status || "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {activeTab === "activity" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">Activity Timeline</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Recent system activities</p>
                </div>
                <div className="p-6">
                  {activities.length === 0 ? (
                    <p className="text-gray-500 text-center">No recent activities</p>
                  ) : (
                    <div className="space-y-6 border-l-2 border-purple-100 ml-3 pl-5">
                      {activities.map((act, i) => (
                        <div key={i} className="relative">
                          <span className="absolute -left-7 top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-white shadow" />
                          <p className="text-sm text-gray-800">
                            <span className="font-semibold">{act.name}</span> {act.text}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{act.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Quick Management</h3>
            <div className="space-y-3">
              {[
                { label: "My Orders", sub: `${orderCount} orders placed`, icon: box, to: null },
                { label: "My Wishlist", sub: "Items you've been eyeing", icon: heart, to: null },
                { label: "Shopping Cart", sub: `${cartCount} items ready for checkout`, icon: shoppingCart, to: "/cart" },
                { label: "Saved Addresses", sub: "Manage delivery locations", icon: location, to: null },
                { label: "Payment Methods", sub: "Secure cards and wallets", icon: appointment, to: null },
              ].map((item, i) => (
                <button key={i}
                  onClick={() => item.to ? navigate(item.to) : null}
                  className="w-full bg-white border rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-purple-200 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img src={item.icon} alt="" className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-sm text-gray-800">{item.label}</h4>
                      <p className="text-xs text-gray-400">{item.sub}</p>
                    </div>
                  </div>
                  <img src={rightArrow} alt="" className="w-4 h-4 opacity-40" />
                </button>
              ))}
              <button onClick={handleLogout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition shadow-lg shadow-purple-100">
                <img src={logout} alt="" className="w-5 h-5 invert" />
                LOGOUT SECURELY
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;