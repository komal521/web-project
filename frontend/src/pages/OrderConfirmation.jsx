import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import checkedIcon from "../assets/checked.png";
import dateIcon from "../assets/date.png";
import locationIcon from "../assets/location.png";
import carIcon from "../assets/car.png";
import checkMarkIcon from "../assets/check-mark.png";
import clockIcon from "../assets/clock.png";
import boxIcon from "../assets/box.png";
import rightUpIcon from "../assets/right-up.png";
import downloadIcon from "../assets/download.png";
import b1Img from "../assets/b1.webp";
import bagImg from "../assets/bag.webp";
import a2Img from "../assets/a2.jpeg";
const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/shipping/${orderId}`);
        const data = await response.json();
        if (data.success && data.shipping) {
          setOrder(data.shipping);
          const savedItems = localStorage.getItem(`order_items_${orderId}`);
          if (savedItems) {
            setItems(JSON.parse(savedItems));
          } else {
            const parsedItems = (data.shipping.items || "")
              .split(",")
              .filter((x) => x.trim() !== "")
              .map((title) => {
                const cleanTitle = title.replace(/\(Qty: \d+\)/g, "").trim();
                const qtyMatch = title.match(/\(Qty: (\d+)\)/);
                const qty = qtyMatch ? parseInt(qtyMatch[1]) : 1;
                return {
                  title: cleanTitle,
                  tag: `Qty: ${qty}`,
                  price: `₹${Number(data.shipping.total_amount || 0).toFixed(2)}`
                };
              });
            setItems(parsedItems);
          }
        } else {
          console.error("Order not found");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
          <p className="text-gray-400 font-medium text-base">
            Loading your order confirmation...
          </p>
        </div>
        <Footer />
      </>
    );
  }
  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center p-4">
          <div className="bg-white border border-gray-100 p-10 rounded-3xl text-center max-w-[400px] shadow-sm">
            <h2 className="text-[22px] font-bold text-gray-900 mb-3">Order Not Found</h2>
            <p className="text-sm text-gray-400 mb-7">We couldn't retrieve the details for this order.</p>
            <button
              onClick={() => navigate("/home")}
              className="bg-[#6f4e37] hover:bg-[#5a3e2a] text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase cursor-pointer transition-colors">
              Return Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  const orderDateObj = order.order_date ? new Date(order.order_date) : new Date();
  const estDeliveryDate = new Date(orderDateObj.getTime() + 4 * 24 * 60 * 60 * 1000);
  const formattedEstDelivery = estDeliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
  const subtotal = items.reduce((acc, item) => {
    const raw = String(item.price || "0").replace(/[^0-9.]/g, "");
    return acc + (parseFloat(raw) || 0);
  }, 0);
  const calculatedTax = (() => {
    const raw = order.estimated_tax;
    if (raw === null || raw === undefined || raw === "") return subtotal * 0.18;
    const parsed = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? subtotal * 0.18 : parsed;
  })();
  const totalAmount = (() => {
    const raw = order.total_amount;
    if (raw === null || raw === undefined || raw === "") return subtotal + calculatedTax;
    const parsed = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? subtotal + calculatedTax : parsed;
  })();
  const discountAmount = (() => {
    const raw = order.discount_amount;
    if (!raw) return 0;
    const parsed = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  })();
  const status = (order.shipping_status || "Pending").toLowerCase();
  const steps = [
    { label: "Order Confirmed", key: "confirmed", icon: checkMarkIcon },
    { label: "Processing", key: "processing", icon: clockIcon },
    { label: "Shipped", key: "shipped", icon: boxIcon },
    { label: "Out for Delivery", key: "out for delivery", icon: carIcon },
    { label: "Delivered", key: "delivered", icon: checkedIcon }
  ];
  let activeIndex = 0;
  if (status === "processing") activeIndex = 1;
  else if (status === "shipped") activeIndex = 2;
  else if (status === "out for delivery" || status === "in transit") activeIndex = 3;
  else if (status === "delivered" || status === "completed") activeIndex = 4;
  const getProductImage = (item, index) => {
    if (item.img || item.image) return item.img || item.image;
    const fallbacks = [b1Img, bagImg, a2Img];
    return fallbacks[index % fallbacks.length];
  };
  const handleDownloadInvoice = () => {
    alert("Downloading Invoice... Your download will begin shortly.");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#faf9f6] py-12 px-4 text-[#111]">
        <div className="max-w-[900px] mx-auto">

          {/* ── Header: Success Icon ── */}
          <div className="text-center pb-9">
            <div className="w-20 h-20 rounded-full bg-[#edfaf0] border-2 border-[#b8e4c3] flex items-center justify-center mx-auto mb-5">
              <img src={checkedIcon} alt="Confirmed" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-3xl md:text-[34px] font-extrabold text-gray-900 mb-2.5 tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-sm text-gray-400 max-w-[460px] mx-auto leading-relaxed">
              Thank you for your purchase. Your order has been successfully placed and is now being processed.
            </p>
          </div>

          {/* ── Dark Banner: Order Info ── */}
          <div className="bg-[#1c1c1c] text-white rounded-3xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-5 text-center mb-6">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[1.5px] font-semibold mb-2">Order ID</p>
              <p className="text-[15px] font-bold text-white">#ORD-{order.order_id || orderId}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[1.5px] font-semibold mb-2">Order Date</p>
              <p className="text-[15px] font-bold text-white">
                {orderDateObj.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <img src={dateIcon} alt="Date" className="w-4 h-4 mx-auto mt-2 opacity-50 invert" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[1.5px] font-semibold mb-2">Payment</p>
              <p className="text-[15px] font-bold text-white">
                {order.payment_method === "card"
                  ? "Card •••• 4242"
                  : order.payment_method === "upi"
                  ? "UPI Payment"
                  : "Cash on Delivery"}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[1.5px] font-semibold mb-2">Status</p>
              <p className="text-[15px] font-bold text-[#d4a84f]">
                {order.shipping_status || "Confirmed"}
              </p>
            </div>
          </div>

          {/* ── Shipping & Delivery Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            {/* Shipping Information */}
            <div className="bg-white border border-[#f0ece6] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#f5efe8]">
                <img src={locationIcon} alt="Location" className="w-[22px] h-[22px] object-contain" />
                <h3 className="text-base font-bold text-gray-900">
                  Shipping Information
                </h3>
              </div>
              <p className="text-[15px] font-bold text-gray-900 mb-2">
                {order.customer_name}
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed my-1">
                {order.address}
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed my-1">
                {order.city}{order.city && order.state ? ", " : ""}{order.state}{order.pincode ? " - " + order.pincode : ""}
              </p>
              <p className="text-xs text-gray-400 mt-3 font-medium">
                Phone: {order.phone}
              </p>
            </div>

            {/* Delivery Status */}
            <div className="bg-white border border-[#f0ece6] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#f5efe8]">
                  <img src={carIcon} alt="Delivery" className="w-[22px] h-[22px] object-contain" />
                  <h3 className="text-base font-bold text-gray-900">
                    Delivery Status
                  </h3>
                </div>
                <p className="text-[13px] text-gray-500 leading-[1.8]">
                  Your package is expected to arrive by{" "}
                  <strong className="text-gray-900">{formattedEstDelivery}</strong>.
                  A signature may be required upon delivery.
                </p>
              </div>
              <div className="border-t border-[#f5efe8] pt-4 mt-6 flex justify-between items-center">
                <a href="#support" className="flex items-center gap-1.5 no-underline text-gray-400 text-[11px] font-semibold hover:text-gray-600 transition-colors">
                  <img src={checkMarkIcon} alt="Support" className="w-3.5 h-3.5" />
                  Customer Support
                </a>
                <span className="text-gray-200">|</span>
                <a href="#returns" className="no-underline text-gray-400 text-[11px] font-semibold hover:text-gray-600 transition-colors">
                  Return Policy
                </a>
              </div>
            </div>
          </div>

          {/* ── Order Tracking Stepper ── */}
          <div className="bg-white border border-[#f0ece6] rounded-3xl p-8 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-7 pb-4 border-b border-[#f5efe8]">
              <h3 className="text-base font-bold text-gray-900">
                Order Tracking
              </h3>
              <button
                onClick={() => navigate("/home")}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-gray-400 text-[11px] font-bold tracking-wide uppercase hover:text-gray-600 transition-colors">
                View Details
                <img src={rightUpIcon} alt="Go" className="w-3 h-3" />
              </button>
            </div>
            <div className="relative pt-4 pb-2">
              {/* Progress Line (desktop) */}
              <div className="absolute top-7 left-[10%] right-[10%] h-0.5 bg-[#f0ebe5] z-0 hidden sm:block">
                <div
                  className="h-full bg-[#6f4e37] transition-all duration-500"
                  style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                />
              </div>
              {/* Steps */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 sm:gap-0 relative z-10">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= activeIndex;
                  return (
                    <div key={idx} className="flex flex-row sm:flex-col items-center sm:items-center gap-3.5 sm:gap-2.5">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                        ${isCompleted
                          ? "border-[#6f4e37] bg-[#6f4e37] shadow-md shadow-[#6f4e37]/25 scale-[1.08]"
                          : "border-[#e5e0d8] bg-white scale-100"
                        }`}>
                        <img
                          src={step.icon}
                          alt=""
                          className={`w-[18px] h-[18px] object-contain ${isCompleted ? "invert opacity-100" : "opacity-[0.35]"}`}
                        />
                      </div>
                      <div className="text-left sm:text-center">
                        <p className={`text-[11px] font-bold uppercase tracking-tight m-0
                          ${isCompleted ? "text-gray-900" : "text-gray-300"}`}>
                          {step.label}
                        </p>
                        {isCompleted && (
                          <p className="text-[10px] text-[#6f4e37] font-semibold mt-0.5">Active</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Items Ordered ── */}
          {items.length > 0 && (
            <div className="bg-white border border-[#f0ece6] rounded-3xl p-8 shadow-sm mb-6">
              <h3 className="text-[17px] font-bold text-gray-900 mb-5 pb-4 border-b border-[#f5efe8]">Items Ordered</h3>
              <div>
                {items.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between py-3.5 ${idx < items.length - 1 ? "border-b border-[#f5efe8]" : ""}`}>
                    <div className="flex items-center gap-4">
                      <img
                        src={getProductImage(item, idx)}
                        alt={item.title}
                        className="w-[60px] h-[60px] rounded-2xl object-cover border border-[#f0ebe5] bg-[#faf9f6] flex-shrink-0"
                      />
                      <div>
                        <p className="text-[13px] font-bold text-gray-900 mb-1">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-gray-400 font-medium m-0">
                          {item.tag || "Qty: 1"}
                        </p>
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 bg-[#faf9f6] border border-[#f0ebe5] px-3.5 py-1.5 rounded-[10px]">
                      {String(item.price).startsWith("₹") ? item.price : `₹${parseFloat(String(item.price).replace(/[^0-9.]/g, "")).toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Bottom: Buttons + Summary ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/home")}
                className="w-full bg-[#6f4e37] hover:bg-[#5a3e2a] text-white border-none rounded-full py-4 px-6 font-bold text-[13px] tracking-wide cursor-pointer transition-colors">
                Continue Shopping
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full bg-white hover:bg-[#faf9f6] text-gray-500 border border-[#e0d8d0] rounded-full py-3.5 px-6 font-semibold text-xs cursor-pointer transition-colors">
                  My Orders
                </button>
                <button
                  onClick={handleDownloadInvoice}
                  className="w-full bg-white hover:bg-[#faf9f6] text-gray-500 border border-[#e0d8d0] rounded-full py-3.5 px-6 font-semibold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                  <img src={downloadIcon} alt="Download" className="w-3.5 h-3.5 opacity-50" />
                  Invoice
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-[#f0ece6] rounded-3xl p-8 shadow-sm">
              <div className="mb-4">
                {[
                  { label: "Subtotal", value: `₹${subtotal.toFixed(2)}`, color: "text-gray-900" },
                  { label: "Shipping (Express)", value: "Free", color: "text-green-500" },
                  { label: "Estimated Tax (18%)", value: `₹${calculatedTax.toFixed(2)}`, color: "text-gray-900" },
                  ...(discountAmount > 0 ? [{ label: `Discount (${order.discount_code || "WELCOME10"})`, value: `-₹${discountAmount.toFixed(2)}`, color: "text-amber-600" }] : [])
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#f5efe8]">
                    <span className="text-[13px] text-gray-400 font-medium">{row.label}</span>
                    <span className={`text-[13px] font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-gray-900">Total Amount</span>
                <span className="text-[22px] font-extrabold text-[#6f4e37]">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
