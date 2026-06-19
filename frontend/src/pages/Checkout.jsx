import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import upiIcon from "../assets/credit-card.png";
import cardIcon from "../assets/credit-card (1).png";
import cashIcon from "../assets/money.png";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    payment_method: "upi"
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
        body: JSON.stringify({ ...formData, total_amount: total, items: itemNames, payment_method: formData.payment_method })
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
        <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 p-10 rounded-3xl shadow-lg text-center max-w-md w-full">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-[#111] mb-4">Order Placed!</h2>
            <p className="text-gray-500 mb-8">Thank you for your purchase. We'll send you an email confirmation shortly.</p>
            <p className="text-sm text-gray-400">Redirecting to home...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f6f2] py-12 px-4 md:px-8 text-[#111]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#111] font-serif">Billing Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-gray-600 font-medium">Full Name</label>
                <input type="text" name="customer_name" required value={formData.customer_name} onChange={handleChange}
                  className="w-full mt-2 border border-gray-200 bg-gray-50 text-[#111] rounded-xl px-4 py-3 outline-none focus:border-[#d7a53f] focus:ring-1 focus:ring-[#d7a53f] transition-all" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-600 font-medium">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 bg-gray-50 text-[#111] rounded-xl px-4 py-3 outline-none focus:border-[#d7a53f] focus:ring-1 focus:ring-[#d7a53f] transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-medium">Phone Number</label>
                  <input type="text" name="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 bg-gray-50 text-[#111] rounded-xl px-4 py-3 outline-none focus:border-[#d7a53f] focus:ring-1 focus:ring-[#d7a53f] transition-all" placeholder="+91 9876543210" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">Shipping Address</label>
                <textarea name="address" required value={formData.address} onChange={handleChange} rows="3"
                  className="w-full mt-2 border border-gray-200 bg-gray-50 text-[#111] rounded-xl px-4 py-3 outline-none focus:border-[#d7a53f] focus:ring-1 focus:ring-[#d7a53f] transition-all" placeholder="123 Street Name, City, Country"></textarea>
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-gray-100 mt-6">
  <h3 className="text-lg font-bold text-[#111] mb-4 font-serif">
    Payment Method
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <label
      className={`cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${
        formData.payment_method === "upi"
          ? "border-[#d7a53f] bg-orange-50/50 shadow-sm ring-1 ring-[#d7a53f]"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`} >
      <input  type="radio"  name="payment_method" value="upi" checked={formData.payment_method === "upi"}
        onChange={handleChange} className="sr-only"/>
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <img src={upiIcon} alt="UPI" className="w-5 h-5" />
      </div>
      <span className="font-semibold text-sm text-[#111]">
        UPI
      </span>
    </label>
    <label  className={`cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${
        formData.payment_method === "card"
          ? "border-[#d7a53f] bg-orange-50/50 shadow-sm ring-1 ring-[#d7a53f]"
          : "border-gray-200 bg-white hover:bg-gray-50"  }`} >
      <input  type="radio"  name="payment_method"  value="card"  checked={formData.payment_method === "card"}
        onChange={handleChange}  className="sr-only" />
      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
        <img src={cardIcon} alt="Card" className="w-5 h-5" />
      </div>
      <span className="font-semibold text-sm text-[#111]">
        Card
      </span>
    </label>
    <label className={`cursor-pointer border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${
        formData.payment_method === "cod"
          ? "border-[#6f4e37] bg-orange-50/50 shadow-sm ring-1 ring-[#6f4e37]"
          : "border-gray-200 bg-white hover:bg-gray-50"
      }`} >
      <input type="radio" name="payment_method" value="cod" checked={formData.payment_method === "cod"}
        onChange={handleChange}  className="sr-only"/>
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <img src={cashIcon} alt="Cash" className="w-5 h-5" />
      </div>
      <span className="font-semibold text-sm text-[#111]">
        Cash on Delivery
      </span>
    </label>
  </div>
</div><div>
              </div>
              <div className="pt-4 border-t border-gray-100 mt-6">
                <button type="submit" disabled={submitting}
                  className="w-full bg-[#6f4e37] hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-amber-900/20 disabled:opacity-60 flex items-center justify-center gap-2">
                  {submitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Pay ₹{total.toFixed(2)}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-8 h-fit shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-[#111] font-serif">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-2xl border border-gray-100 hover:shadow-sm transition-all bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <img src={item.img || item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover border border-gray-200 bg-white" />
                    <div>
                      <p className="font-bold text-sm text-[#111]">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.tag || item.subtitle || "Qty: 1"}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#111] bg-white px-3 py-1.5 rounded-lg border border-gray-200">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-gray-200 my-6"></div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111]">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-black">Free</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-xl font-bold text-[#111]">
              <span>Total</span>
              <span className="text-[#6f4e37]">₹{total.toFixed(2)}</span>
            </div> 
            <div className="mt-8 bg-[#fcfbf8] rounded-xl p-4 border border-[#ece7df] flex items-start gap-3">
              <svg className="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <div>
                <p className="text-sm font-bold text-[#111]">Secure Payment</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Your payment information is processed securely. We do not store your credit card details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
