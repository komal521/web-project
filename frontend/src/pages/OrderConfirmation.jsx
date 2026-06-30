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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
            let parsedItems = [];
            const rawItems = data.shipping.items || "";
            if (rawItems.trim().startsWith("[")) {
              try {
                parsedItems = JSON.parse(rawItems).map(item => ({
                  title: item.title,
                  tag: `Qty: ${item.qty || 1}`,
                  price: typeof item.price === "number" ? `₹${item.price.toFixed(2)}` : item.price,
                  image: item.image || item.img
                }));
              } catch (e) {
                console.error("Error parsing shipping items JSON:", e);
              }
            }
            if (parsedItems.length === 0) {
              parsedItems = rawItems
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
            }
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf9f6] dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-500 font-medium text-base">
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
        <div className="min-h-screen bg-[#faf9f6] dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-10 rounded-3xl text-center max-w-[400px] shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Not Found</h2>
            <p className="text-sm text-gray-450 dark:text-gray-400 mb-7">We couldn't retrieve the details for this order.</p>
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
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFillColor(111, 78, 55);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 14, 18);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Aurelian Luxe | Premium Shopping", 14, 28);
    doc.text(`Invoice #INV-${order.order_id || orderId}`, pageWidth - 14, 18, { align: "right" });
    doc.text(`Date: ${new Date(order.order_date || Date.now()).toLocaleDateString("en-IN")}`, pageWidth - 14, 28, { align: "right" });
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 14, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(order.customer_name || "Customer", 14, 60);
    doc.text(order.address || "", 14, 67);
    if (order.city || order.state) {
      doc.text(`${order.city || ""}${order.city && order.state ? ", " : ""}${order.state || ""}${order.pincode ? " - " + order.pincode : ""}`, 14, 74);
    }
    doc.text(`Phone: ${order.phone || "N/A"}`, 14, 81);
    doc.setFont("helvetica", "bold");
    doc.text("Order Details:", pageWidth / 2 + 10, 52);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: #ORD-${order.order_id || orderId}`, pageWidth / 2 + 10, 60);
    doc.text(`Payment: ${order.payment_method === "card" ? "Credit/Debit Card" : order.payment_method === "upi" ? "UPI" : "Cash on Delivery"}`, pageWidth / 2 + 10, 67);
    doc.text(`Status: ${order.shipping_status || "Confirmed"}`, pageWidth / 2 + 10, 74);
    const tableRows = items.map((item, i) => [
      i + 1,
      item.title || "Product",
      item.tag || "Qty: 1",
      String(item.price).startsWith("₹") ? item.price : `Rs. ${parseFloat(String(item.price).replace(/[^0-9.]/g, "")).toFixed(2)}`
    ]);
    autoTable(doc, {
      head: [["#", "Product", "Quantity", "Price"]],
      body: tableRows.length > 0 ? tableRows : [["1", "Order Items", "-", `Rs. ${totalAmount.toFixed(2)}`]],
      startY: 92,
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [111, 78, 55], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [252, 248, 242] },
    });
    const finalY = doc.lastAutoTable.finalY + 10;
    const lineX = pageWidth - 80;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Subtotal:", lineX, finalY);
    doc.setTextColor(30, 30, 30);
    doc.text(`Rs. ${subtotal.toFixed(2)}`, pageWidth - 14, finalY, { align: "right" });
    doc.setTextColor(100, 100, 100);
    doc.text("Shipping:", lineX, finalY + 8);
    doc.setTextColor(34, 139, 34);
    doc.text("FREE", pageWidth - 14, finalY + 8, { align: "right" });
    doc.setTextColor(100, 100, 100);
    doc.text("Tax (18%):", lineX, finalY + 16);
    doc.setTextColor(30, 30, 30);
    doc.text(`Rs. ${calculatedTax.toFixed(2)}`, pageWidth - 14, finalY + 16, { align: "right" });
    if (discountAmount > 0) {
      doc.setTextColor(100, 100, 100);
      doc.text(`Discount (${order.discount_code || "WELCOME10"}):`, lineX, finalY + 24);
      doc.setTextColor(200, 100, 0);
      doc.text(`-Rs. ${discountAmount.toFixed(2)}`, pageWidth - 14, finalY + 24, { align: "right" });
    }
    const totalY = finalY + (discountAmount > 0 ? 36 : 28);
    doc.setDrawColor(111, 78, 55);
    doc.setLineWidth(0.5);
    doc.line(lineX, totalY - 4, pageWidth - 14, totalY - 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(111, 78, 55);
    doc.text("TOTAL:", lineX, totalY + 4);
    doc.text(`Rs. ${totalAmount.toFixed(2)}`, pageWidth - 14, totalY + 4, { align: "right" });
    const footerY = doc.internal.pageSize.getHeight() - 25;
    doc.setFillColor(111, 78, 55);
    doc.rect(0, footerY - 5, pageWidth, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for shopping with Aurelian Luxe!", pageWidth / 2, footerY + 5, { align: "center" });
    doc.text("For support: support@aurelianluxe.com | www.aurelianluxe.com", pageWidth / 2, footerY + 13, { align: "center" });
    const fileName = `Invoice_ORD-${order.order_id || orderId}_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.pdf`;
    const pdfBlob = doc.output("blob");
    if (window.showSaveFilePicker) {
      window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: "PDF Document", accept: { "application/pdf": [".pdf"] } }],
      }).then(handle => handle.createWritable())
        .then(writable => { writable.write(pdfBlob); writable.close(); })
        .catch(err => { if (err.name !== "AbortError") doc.save(fileName); });
    } else {
      doc.save(fileName);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#faf9f6] dark:bg-gray-900 transition-colors duration-300 py-12 px-4 text-[#111] dark:text-gray-100">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center pb-9">
            <div className="w-20 h-20 rounded-full bg-[#edfaf0] dark:bg-[#1a2f20] border-2 border-[#b8e4c3] dark:border-[#2f5c3b] flex items-center justify-center mx-auto mb-5">
              <img src={checkedIcon} alt="Confirmed" className="w-10 h-10 object-contain dark:invert" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2.5 tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-400 max-w-[460px] mx-auto leading-relaxed">
              Thank you for your purchase. Your order has been successfully placed and is now being processed.
            </p>
          </div>
          <div className="bg-[#1c1c1c] dark:bg-gray-800 dark:border dark:border-gray-700 text-white rounded-3xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-5 text-center mb-6">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2">Order ID</p>
              <p className="text-sm sm:text-base font-bold text-white">#ORD-{order.order_id || orderId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2">Order Date</p>
              <p className="text-sm sm:text-base font-bold text-white">
                {orderDateObj.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <img src={dateIcon} alt="Date" className="w-4 h-4 mx-auto mt-2 opacity-50 invert" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2">Payment</p>
              <p className="text-sm sm:text-base font-bold text-white">
                {order.payment_method === "card"
                  ? "Card •••• 4242"
                  : order.payment_method === "upi"
                  ? "UPI Payment"
                  : "Cash on Delivery"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2">Status</p>
              <p className="text-sm sm:text-base font-bold text-[#d4a84f] dark:text-amber-400">
                {order.shipping_status || "Confirmed"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="bg-white dark:bg-gray-800 border border-[#f0ece6] dark:border-gray-700 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#f5efe8] dark:border-gray-700">
                <img src={locationIcon} alt="Location" className="w-[22px] h-[22px] object-contain dark:invert" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Shipping Information
                </h3>
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2">
                {order.customer_name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed my-1">
                {order.address}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed my-1">
                {order.city}{order.city && order.state ? ", " : ""}{order.state}{order.pincode ? " - " + order.pincode : ""}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 font-medium">
                Phone: {order.phone}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-[#f0ece6] dark:border-gray-700 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#f5efe8] dark:border-gray-700">
                  <img src={carIcon} alt="Delivery" className="w-[22px] h-[22px] object-contain dark:invert" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Delivery Status
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-[1.8]">
                  Your package is expected to arrive by{" "}
                  <strong className="text-gray-900 dark:text-white">{formattedEstDelivery}</strong>.
                  A signature may be required upon delivery.
                </p>
              </div>
              <div className="border-t border-[#f5efe8] dark:border-gray-700 pt-4 mt-6 flex justify-between items-center">
                <a href="#support" className="flex items-center gap-1.5 no-underline text-gray-400 dark:text-gray-500 text-xs font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <img src={checkMarkIcon} alt="Support" className="w-3.5 h-3.5 dark:invert" />
                  Customer Support
                </a>
                <span className="text-gray-200 dark:text-gray-600">|</span>
                <a href="#returns" className="no-underline text-gray-400 dark:text-gray-500 text-xs font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  Return Policy
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-[#f0ece6] dark:border-gray-700 rounded-3xl p-8 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-7 pb-4 border-b border-[#f5efe8] dark:border-gray-700">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Order Tracking
              </h3>
              <button onClick={() => navigate("/home")}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-gray-400 dark:text-gray-500 text-xs font-bold tracking-wide uppercase hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                View Details
                <img src={rightUpIcon} alt="Go" className="w-3 h-3 dark:invert" />
              </button>
            </div>
            <div className="relative pt-4 pb-2">
              <div className="absolute top-7 left-[10%] right-[10%] h-0.5 bg-[#f0ebe5] z-0 hidden sm:block">
                <div
                  className="h-full bg-[#6f4e37] transition-all duration-500"
                  style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}  />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 sm:gap-0 relative z-10">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= activeIndex;
                  return (
                    <div key={idx} className="flex flex-row sm:flex-col items-center sm:items-center gap-3.5 sm:gap-2.5">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                        ${isCompleted
                          ? "border-[#6f4e37] bg-[#6f4e37] shadow-md shadow-[#6f4e37]/25 scale-[1.08]"
                          : "border-[#e5e0d8] dark:border-gray-600 bg-white dark:bg-gray-800 scale-100"
                        }`}>
                      <img  src={step.icon}  alt=""
                        className={`w-[18px] h-[18px] object-contain ${isCompleted ? "invert opacity-100" : "opacity-[0.35] dark:invert"}`} />
                    </div>
                    <div className="text-left sm:text-center">
                      <p className={`text-xs font-bold uppercase tracking-tight m-0
                        ${isCompleted ? "text-gray-900 dark:text-white" : "text-gray-300 dark:text-gray-505"}`}>
                        {step.label}
                      </p>
                      {isCompleted && (
                        <p className="text-xs text-[#6f4e37] font-semibold mt-0.5">Active</p>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
          {items.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-[#f0ece6] dark:border-gray-700 rounded-3xl p-8 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-[#f5efe8] dark:border-gray-700">Items Ordered</h3>
              <div>
                {items.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between py-3.5 ${idx < items.length - 1 ? "border-b border-[#f5efe8] dark:border-gray-700" : ""}`}>
                    <div className="flex items-center gap-4">
                      <img  src={getProductImage(item, idx)}  alt={item.title}
                        className="w-[60px] h-[60px] rounded-2xl object-cover border border-[#f0ebe5] dark:border-gray-600 bg-[#faf9f6] dark:bg-gray-700 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-400 font-medium m-0">
                          {item.tag || "Qty: 1"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white bg-[#faf9f6] dark:bg-gray-700 border border-[#f0ebe5] dark:border-gray-600 px-3.5 py-1.5 rounded-[10px]">
                      {String(item.price).startsWith("₹") ? item.price : `₹${parseFloat(String(item.price).replace(/[^0-9.]/g, "")).toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/home")}
                className="w-full bg-[#6f4e37] hover:bg-[#5a3e2a] text-white border-none rounded-full py-4 px-6 font-bold text-sm tracking-wide cursor-pointer transition-colors">
                Continue Shopping
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full bg-white dark:bg-gray-800 hover:bg-[#faf9f6] dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 border border-[#e0d8d0] dark:border-gray-600 rounded-full py-3.5 px-6 font-semibold text-xs cursor-pointer transition-colors">
                  My Orders
                </button>
                <button
                  onClick={handleDownloadInvoice}
                  className="w-full bg-white dark:bg-gray-800 hover:bg-[#faf9f6] dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 border border-[#e0d8d0] dark:border-gray-600 rounded-full py-3.5 px-6 font-semibold text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5">
                  <img src={downloadIcon} alt="Download" className="w-3.5 h-3.5 opacity-50 dark:invert" />
                  Invoice
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-[#f0ece6] dark:border-gray-700 rounded-3xl p-8 shadow-sm">
              <div className="mb-4">
                {[
                  { label: "Subtotal", value: `₹${subtotal.toFixed(2)}`, color: "text-gray-900 dark:text-white" },
                  { label: "Shipping (Express)", value: "Free", color: "text-green-500 dark:text-green-400" },
                  { label: "Estimated Tax (18%)", value: `₹${calculatedTax.toFixed(2)}`, color: "text-gray-900 dark:text-white" },
                  ...(discountAmount > 0 ? [{ label: `Discount (${order.discount_code || "WELCOME10"})`, value: `-₹${discountAmount.toFixed(2)}`, color: "text-amber-600 dark:text-amber-400" }] : [])
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#f5efe8] dark:border-gray-700">
                    <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 font-medium">{row.label}</span>
                    <span className={`text-xs sm:text-sm font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Total Amount</span>
                <span className="text-2xl font-extrabold text-[#6f4e37] dark:text-[#d7a53f]">
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
