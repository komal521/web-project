import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
    if (items.length === 0) {
      navigate("/cart");
    }
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customer_name: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
      }));
    }
  }, [navigate]);
  const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0), 0);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const itemNames = cartItems.map((item) => item.title).join(", ");
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, total_amount: total, items: itemNames })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        localStorage.removeItem("cart");
        setTimeout(() => navigate("/home"), 3000);
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };
  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#111827] flex items-center justify-center">
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
            <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Order Placed!</h2>
            <p className="text-gray-400 mb-8">Thank you for your purchase. We'll send you an email confirmation shortly.</p>
            <p className="text-sm text-gray-500">Redirecting to home...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#111827] py-12 px-4 md:px-8 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-serif mb-6 text-white">Billing Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-gray-400 font-medium">Full Name</label>
                <input type="text" name="customer_name" required value={formData.customer_name} onChange={handleChange}
                  className="w-full mt-2 border border-[#333] bg-[#222] text-white rounded-lg px-4 py-3 outline-none focus:border-[#d7a53f]" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm text-gray-400 font-medium">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="w-full mt-2 border border-[#333] bg-[#222] text-white rounded-lg px-4 py-3 outline-none focus:border-[#d7a53f]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-sm text-gray-400 font-medium">Phone Number</label>
                <input type="text" name="phone" required value={formData.phone} onChange={handleChange}
                  className="w-full mt-2 border border-[#333] bg-[#222] text-white rounded-lg px-4 py-3 outline-none focus:border-[#d7a53f]" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="text-sm text-gray-400 font-medium">Shipping Address</label>
                <textarea name="address" required value={formData.address} onChange={handleChange} rows="3"
                  className="w-full mt-2 border border-[#333] bg-[#222] text-white rounded-lg px-4 py-3 outline-none focus:border-[#d7a53f]" placeholder="123 Street Name, City, Country"></textarea>
              </div>
              <button type="submit" disabled={submitting}
                className="w-full bg-[#d7a53f] hover:bg-[#c4922b] text-[#111] py-4 rounded-xl font-semibold text-lg transition disabled:opacity-60">
                {submitting ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
              </button>
            </form>
          </div>
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-8 h-fit">
            <h2 className="text-2xl font-serif mb-6 text-white">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt={item.title} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="font-medium text-sm text-gray-200">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.tag}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-300">{item.price}</span>
                </div>
              ))}
            </div>
            <hr className="border-[#333] my-4" />
            <div className="flex justify-between items-center text-lg font-bold text-white">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
