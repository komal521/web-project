import searchIcon from "../assets/search.png";
import filterIcon from "../assets/filter.png";
import downloadIcon from "../assets/download.png";
import addIcon from "../assets/add.png";
import boxIcon from "../assets/box.png";
import clockIcon from "../assets/clock.png";
import checkIcon from "../assets/check-mark.png";
import closeIcon from "../assets/close.png";
import undoIcon from "../assets/undo.png";
import carIcon from "../assets/car.png";
import showIcon from "../assets/show.png";
import pencilIcon from "../assets/pencil (1).png";
import binIcon from "../assets/bin (1).png";
import b1 from "../assets/b1.jpeg";
import b2 from "../assets/b2.jpeg";
import b3 from "../assets/b3.jpeg";
import b4 from "../assets/b4.jpeg";
import b5 from "../assets/b5.jpeg";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import leftArrowIcon from "../assets/left-arrow.png";
import rightArrowIcon from "../assets/right-arrow.png";
import rightUp from "../assets/right-up.png";
import axios from "axios";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const profileImages = [c1, c2, c3, c4, c5];
const OrderManagement = ({ darkMode, setActive, setEditData }) => {
  const [activeBtn, setActiveBtn] = useState("add");
  const [cards, setCards] = useState([
    { title: "Total Orders", value: "0", growth: "0%", icon: boxIcon },
    { title: "Pending Orders", value: "0", growth: "0%", icon: clockIcon },
    { title: "Completed Orders", value: "0", growth: "0%", icon: checkIcon },
    { title: "Cancelled Orders", value: "0", growth: "0%", icon: closeIcon },
  ]);
  const [orders, setOrders] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showReturnsModal, setShowReturnsModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [shippingOrder, setShippingOrder] = useState(null);
  const [shippingData, setShippingData] = useState({ tracking_number: "", carrier: "Standard Delivery", shipping_status: "Pending", estimated_delivery: "" });
  const [shippingSaving, setShippingSaving] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    items: "",
    total_amount: "",
    status: "Pending",
  });
  const [performance, setPerformance] = useState({
    monthlyTarget: 85,
    completedPercentage: 85,
    totalRevenue: 0,
    monthlyOrders: 0
  });
  useEffect(() => {
    fetchOrders();
    fetchCards();
    fetchActivities();
    fetchPerformance();
  }, []);
  const fetchPerformance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/performance");
      setPerformance({
        monthlyTarget: res.data.completedPercentage || 0,
        completedPercentage: res.data.completedPercentage || 0,
        totalRevenue: res.data.totalRevenue || 0,
        monthlyOrders: res.data.monthlyOrders || 0
      });
    } catch (error) {
      console.log("Error fetching performance:", error);
    }
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700 border border-green-200";
      case "pending":
      case "in progress":
        return "bg-[#fff6df] text-[#d9a100] border border-[#f8e7b3]";
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-200";
      case "returned":
      case "refunded":
        return "bg-gray-100 text-gray-700 border border-gray-200";
      default:
        return "bg-yellow-50 text-yellow-700 border border-yellow-100";
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      const mappedOrders = (res.data.orders || []).map((o, idx) => ({
        raw: o,
        id: `#ORD-${o.id}`,
        customer: o.customer_name,
        image: profileImages[idx % profileImages.length],
        product: o.items || "Products",
        date: new Date(o.created_at).toLocaleDateString(),
        payment: "UPI/Card",
        status: o.status || "Pending",
        amount: `₹${Number(o.total_amount).toLocaleString("en-IN")}`,
        statusColor: getStatusColor(o.status),
      }));
      setOrders(mappedOrders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };
  const fetchCards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order/cards");
      setCards([
        {
          title: "Total Orders",
          value: res.data.totalOrders?.toString() || "0",
          growth: " 14.2% vs last month",
          icon: boxIcon,
        },
        {
          title: "Pending Orders",
          value: res.data.pendingOrders?.toString() || "0",
          growth: " 2.4% vs last month",
          icon: clockIcon,
        },
        {
          title: "Completed Orders",
          value: res.data.completedOrders?.toString() || "0",
          growth: " 8.1% vs last month",
          icon: checkIcon,
        },
        {
          title: "Cancelled Orders",
          value: res.data.cancelledOrders?.toString() || "0",
          growth: "↓ 1.2% vs last month",
          icon: closeIcon,
        },
      ]);
    } catch (error) {
      console.log("Error fetching cards:", error);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/activities");
      setActivities(res.data);
    } catch (error) {
      console.log("Error fetching activities:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchOrders();
      fetchCards();
      fetchActivities();
    } catch (error) {
      console.log("Error deleting order:", error);
    }
  };

  const handleEditOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/orders/${editOrder.id}`, editOrder);
      setEditOrder(null);
      fetchOrders();
      fetchCards();
      fetchActivities();
    } catch (error) {
      console.log("Error updating order:", error);
    }
  };

  const handleAddOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/orders", newOrder);
      setShowAddForm(false);
      setNewOrder({
        customer_name: "",
        email: "",
        phone: "",
        address: "",
        items: "",
        total_amount: "",
        status: "Pending",
      });
      fetchOrders();
      fetchCards();
      fetchActivities();
    } catch (error) {
      console.log("Error adding order:", error);
    }
  };
  const handleDownloadReport = () => {
    if (orders.length === 0) {
      alert("No data available to download");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Orders Full History Report", 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}  |  Total Orders: ${orders.length}`, 14, 26);
    const tableColumn = ["Order ID", "Customer", "Product/Items", "Date", "Payment", "Status", "Amount"];
    const tableRows = [];
    orders.forEach((o) => {
      tableRows.push([
        o.id,
        o.customer,
        o.product,
        o.date,
        o.payment || "UPI/Card",
        o.status,
        o.amount ? o.amount.toString().replace(/₹/g, 'Rs. ') : ""
      ]);
    });
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 32,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [111, 78, 55], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [252, 251, 248] },
    });
    
    const fileName = `Orders_Full_History_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append("report", pdfBlob, fileName);
    fetch("http://localhost:5000/api/reports/save", { method: "POST", body: formData }).catch(console.log);

    if (window.showSaveFilePicker) {
      window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: 'PDF Document', accept: { 'application/pdf': ['.pdf'] } }],
      }).then(handle => handle.createWritable())
        .then(writable => { writable.write(pdfBlob); writable.close(); })
        .catch(err => { if (err.name !== 'AbortError') doc.save(fileName); });
    } else {
      doc.save(fileName);
    }
  };

  const handleExportPDF = () => {
    if (orders.length === 0) {
      alert("No orders available to export");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Management Export", 14, 18);
    doc.setFontSize(10);
    doc.text(`Exported: ${new Date().toLocaleString()}  |  Total: ${orders.length} orders`, 14, 26);
    const tableColumn = ["Order ID", "Customer", "Items", "Date", "Status", "Amount"];
    const tableRows = orders.map((o) => [
      o.id, o.customer, o.product, o.date, o.status, o.amount ? o.amount.toString().replace(/₹/g, 'Rs. ') : ""
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 32,
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [111, 78, 55], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [252, 251, 248] },
    });
    
    const fileName = `Orders_Export_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;
    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    formData.append("report", pdfBlob, fileName);
    fetch("http://localhost:5000/api/reports/save", { method: "POST", body: formData }).catch(console.log);

    if (window.showSaveFilePicker) {
      window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{ description: 'PDF Document', accept: { 'application/pdf': ['.pdf'] } }],
      }).then(handle => handle.createWritable())
        .then(writable => { writable.write(pdfBlob); writable.close(); })
        .catch(err => { if (err.name !== 'AbortError') doc.save(fileName); });
    } else {
      doc.save(fileName);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (o.id || "").toString().toLowerCase().includes(q) ||
      (o.customer || "").toString().toLowerCase().includes(q) ||
      (o.product || "").toString().toLowerCase().includes(q);
    return matchesSearch;
  });
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  const quickActions = [
    {
      title: "New Order",
      desc: "Manually create a sale",
      icon: addIcon,
      onClick: () => setShowAddForm(true),
    },
    {
      title: "Download Report",
      desc: "Full PDF history of all orders",
      icon: downloadIcon,
      onClick: handleDownloadReport,
    },
    {
      title: "Manage Returns",
      desc: "Process refunds & swaps",
      icon: undoIcon,
      onClick: () => setShowReturnsModal(true),
    },
  ];
  return (
    <div className={`min-h-screen p-3 md:p-5 transition-all duration-300 ${darkMode ? "bg-[#111827]" : "bg-[#f8f6f2]"}`} >
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_320px] gap-5">
        <div>
          {/* Header */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
            <div>
              <h1 className={`text-[34px] font-bold ${darkMode ? "text-white" : "text-[#111827]"}`} >
                Order Management
              </h1>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-[#6b7280]"}`}  >
                Manage and track your customer orders efficiently.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              <div className={`h-[54px] px-5 rounded-full flex items-center gap-3 min-w-full lg:min-w-[340px] ${darkMode ? "bg-[#1c1c1c] border border-[#2a2a2a]" : "bg-[#f1f1f1]"}`} >
                <img src={searchIcon} alt="" className="w-4 h-4 opacity-60" />
                <input
                  type="text"
                  placeholder="Search orders, customers, IDs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActivePage(1);
                  }}
                  className={`bg-transparent outline-none flex-1 text-sm ${darkMode ? "text-white placeholder:text-gray-500" : "text-[#222]"}`} />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleExportPDF()}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300" >
                  <img src={downloadIcon} alt="" className="w-4 h-4" />
                  <span className="font-medium text-yellow-900 text-sm">Export PDF</span>
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-3 bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)] text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300" >
                  <img src={addIcon} alt="" className="w-4 h-4 brightness-0 invert" />
                  <span className="font-semibold text-sm">Add Order</span>
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            {cards.map((item, index) => (
              <div key={index}
                className="relative overflow-hidden rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer border border-white/20">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)]"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-xs tracking-[2px] text-white/80 font-semibold uppercase">{item.title}</p>
                    <h2 className="text-3xl font-bold text-white mt-4 leading-none">{item.value}</h2>
                    <div className="flex items-center gap-1 mt-4">
                      <img src={rightUp} alt="" className={`w-3.5 h-3.5 object-contain ${item.growth.includes("↓") ? "rotate-90" : ""}`} />
                      <p className={`text-xs font-semibold ${item.growth.includes("↓") ? "text-[#ffe0e0]" : "text-[#d8ffd7]"}`} >
                        {item.growth}
                      </p>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg">
                    <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-7 rounded-[28px] overflow-hidden border ${darkMode ? "bg-[#1b1b1b] border-[#2a2a2a]" : "bg-[#fcfbf8] border-[#ece7df]"}`}>
            <div className="px-6 py-5 flex items-center justify-between bg-[#f5f1ea]">
              <div>
                <h2 className="text-lg font-bold text-[#222]">Recent Orders</h2>
                <p className="text-sm mt-1 text-[#666]">
                  Viewing latest {paginatedOrders.length} of {filteredOrders.length} total orders
                </p>
              </div>
            </div>
            <div className="overflow-x-auto bg-[#fcfbf8]">
              <table className="w-full min-w-[950px]">
                <thead className="border-y border-[#ece7df] bg-[#f8f6f2]">
                  <tr>
                    {["ORDER ID", "CUSTOMER", "PRODUCT", "DATE", "PAYMENT", "STATUS", "AMOUNT", "ACTIONS"].map((head, index) => (
                      <th key={index} className="px-6 py-4 text-left text-[11px] tracking-[1px] font-bold text-[#888]" >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((item, index) => (
                    <tr key={index} className="border-b border-[#ece7df] hover:bg-[#f8f6f2] transition-all duration-300" >
                      <td className="px-6 py-5">
                        <span className="text-[#3556e8] text-sm font-bold">{item.id}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                          <span className="font-semibold text-sm text-[#222]">{item.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-[#333]">{item.product}</td>
                      <td className="px-6 py-5 text-sm text-[#666]">{item.date}</td>
                      <td className="px-6 py-5 text-sm text-[#444]">{item.payment}</td>
                      <td className="px-6 py-5">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${item.statusColor}`} >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-[#222]">{item.amount}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setViewOrder(item.raw)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition-all"
                            title="View"   >
                            <img src={showIcon} alt="View" className="w-4 h-4 opacity-80" />
                          </button>
                          <button onClick={() => {
                              setEditData(item.raw);
                              setActive("Edit Order");  }}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 hover:bg-amber-100 transition-all"
                            title="Edit"  >
                            <img src={pencilIcon} alt="Edit" className="w-4 h-4 opacity-80" />
                          </button>
                          <button   onClick={() => handleDeleteOrder(item.raw.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 hover:bg-red-100 transition-all"
                            title="Delete" >
                            <img src={binIcon} alt="Delete" className="w-4 h-4 opacity-80" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedOrders.length === 0 && (
                    <tr>
                      <td colSpan="8" className="p-8 text-center text-gray-500">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#fcfbf8]">
              <p className="text-sm text-[#666]">
                Showing {(activePage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(activePage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled={activePage === 1}
                  onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f3f3f3] hover:bg-[#e7e7e7] transition-all duration-300 disabled:opacity-50"  >
                  <img src={leftArrowIcon} alt="" className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => setActivePage(idx + 1)}
                    className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-300 ${
                      activePage === idx + 1
                        ? "bg-[#d4a84f] text-white shadow-md"
                        : "bg-[#f3f3f3] text-[#222] hover:bg-[#ececec]"
                    }`} >
                    {idx + 1}
                  </button>
                ))}
                <button
                  disabled={activePage === totalPages}
                  onClick={() => setActivePage((prev) => Math.min(prev + 1, totalPages))}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#f3f3f3] hover:bg-[#e7e7e7] transition-all duration-300 disabled:opacity-50" >
                  <img src={rightArrowIcon} alt="" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7">
            {quickActions.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                className="rounded-[24px] p-5 border flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 bg-[#c7e9d1] border-[#b8dcc3] cursor-pointer hover:shadow-md"  >
                <div className="w-12 h-12 rounded-full bg-[#b7a8ff] flex items-center justify-center">
                  <img src={item.icon} alt="" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-[#222]">{item.title}</h3>
                  <p className="text-xs mt-1 text-[#5f6a64]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-[28px] p-5 border bg-[#fcfbf8] border-[#ececec]">
            <div>
              <h2 className="text-[22px] font-bold text-[#222]">Recent Activity</h2>
              <p className="text-sm mt-1 text-[#666]">Real-time updates across all channels</p>
            </div>
            <div className="mt-6 space-y-5">
              {activities.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <img src={profileImages[index % profileImages.length]} alt="" className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="text-sm leading-[20px] text-[#444]">
                      <span className="font-bold text-[#222]">{item.name}</span> {item.text}
                    </p>
                    <span className="text-xs mt-1 inline-block text-[#999]">{item.time}</span>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity.</p>
              )}
            </div>
          </div>

          <div className="rounded-[28px] bg-[linear-gradient(135deg,#f3d3b5,#b78457,#6f4e37)] p-5 text-white shadow-lg relative overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[1px] text-white/95">PERFORMANCE</span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-black/30 text-white font-bold">LIVE</span>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/90">Orders Completed Target</span>
                  <span className="font-bold">{performance.completedPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20 mt-3 overflow-hidden">
                  <div style={{ width: `${performance.completedPercentage}%` }} className="h-full bg-white rounded-full"></div>
                </div>
                <p className="text-xs text-white/85 leading-[18px] mt-4">
                  You have completed {performance.monthlyOrders} orders this month. Total Revenue generated: ₹{Number(performance.totalRevenue).toLocaleString("en-IN")}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className={`w-full max-w-xl rounded-3xl p-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"} shadow-2xl relative`}>
            <button onClick={() => setViewOrder(null)} className="absolute top-4 right-4">
       <img src={closeIcon} alt="Close" className="w-5 h-5 hover:opacity-70"/>
          </button>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Order Details</h2>
            <div className="space-y-4 text-sm">
              <p><strong>Order ID:</strong> #ORD-{viewOrder.id}</p>
              <p><strong>Customer Name:</strong> {viewOrder.customer_name}</p>
              <p><strong>Email:</strong> {viewOrder.email}</p>
              <p><strong>Phone:</strong> {viewOrder.phone || "N/A"}</p>
              <p><strong>Address:</strong> {viewOrder.address || "N/A"}</p>
              <p><strong>Product(s):</strong> {viewOrder.items || "N/A"}</p>
              <p><strong>Total Amount:</strong> ₹{Number(viewOrder.total_amount).toLocaleString("en-IN")}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(viewOrder.status)}`}>
                  {viewOrder.status}
                </span>
              </p>
              <p><strong>Date Placed:</strong> {new Date(viewOrder.created_at).toLocaleString()}</p>
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={() => setViewOrder(null)}
                className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300" >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {editOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={handleEditOrderSubmit}
            className={`w-full max-w-xl rounded-3xl p-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"} shadow-2xl relative`}>
           <button type="button" onClick={() => setEditOrder(null)} className="absolute top-4 right-4">
  <img src={closeIcon} alt="Close" className="w-5 h-5 hover:opacity-70" />
</button>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Edit Order #{editOrder.id}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Customer Name</label>
                <input
                  type="text"
                  required
                  value={editOrder.customer_name}
                  onChange={(e) => setEditOrder({ ...editOrder, customer_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Total Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={editOrder.total_amount}
                  onChange={(e) => setEditOrder({ ...editOrder, total_amount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                <select
                  value={editOrder.status || "Pending"}
                  onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-white" >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button  type="button"  onClick={() => setEditOrder(null)}
                className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300" >
                Cancel
              </button>
              <button type="submit"
                className="px-6 py-2 rounded-xl bg-[#d7a53f] text-[#111] font-semibold hover:opacity-90" >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form onSubmit={handleAddOrderSubmit}
            className={`w-full max-w-xl rounded-3xl p-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"} shadow-2xl relative`}>
            <button type="button" onClick={() => setShowAddForm(false)}
  className="absolute top-4 right-4 hover:scale-110 transition-transform">
  <img src={closeIcon} alt="Close" className="w-5 h-5" />
</button>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Create New Order</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Customer Name</label>
                <input  type="text"  required  placeholder="e.g. Emma Watson"  value={newOrder.customer_name}
                  onChange={(e) => setNewOrder({ ...newOrder, customer_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f]"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                  <input type="email" required placeholder="e.g. emma@gmail.com" value={newOrder.email}
                    onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                  <input type="text" placeholder="e.g. +91 9876543210" value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Items / Products</label>
                <input  type="text"  required  placeholder="e.g. Ergonomic Leather Chair"  value={newOrder.items}
                  onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Shipping Address</label>
                <textarea placeholder="Street address, City, Pin code" value={newOrder.address}
                  onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f] h-20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Total Amount (₹)</label>
                  <input  type="number"  required  placeholder="e.g. 15000"  value={newOrder.total_amount}
                    onChange={(e) => setNewOrder({ ...newOrder, total_amount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                  <select  value={newOrder.status}  onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-white">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setShowAddForm(false)}
                className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"  >
                Cancel
              </button>
              <button type="submit"
                className="px-6 py-2 rounded-xl bg-[#6f4e37] text-[#111] font-semibold hover:opacity-90" >
                Add Order
              </button>
            </div>
          </form>
        </div>
      )}
      {showReturnsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className={`w-full max-w-3xl rounded-3xl p-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"} shadow-2xl relative`}>
            <button onClick={() => setShowReturnsModal(false)} className="absolute top-4 right-4 hover:scale-110 transition-transform">
  <img  src={closeIcon}  alt="Close"  className="w-5 h-5"/>
         </button>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Manage Returns & Swaps</h2>
            <div className="overflow-x-auto max-h-[50vh] border rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold text-gray-500">ORDER ID</th>
                    <th className="px-4 py-3 text-xs font-bold text-gray-500">CUSTOMER</th>
                    <th className="px-4 py-3 text-xs font-bold text-gray-500">STATUS</th>
                    <th className="px-4 py-3 text-xs font-bold text-gray-500 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-bold text-blue-600">{o.id}</td>
                      <td className="px-4 py-3 text-sm">{o.customer}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${o.statusColor}`}>{o.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {o.status !== "Returned" && o.status !== "Refunded" ? (
                          <button
                            onClick={async () => {
                              try {
                                await axios.put(`http://localhost:5000/api/orders/${o.raw.id}`, {
                                  ...o.raw,
                                  status: "Returned",
                                });
                                fetchOrders();
                                fetchCards();
                                fetchActivities();
                              } catch (e) {
                                console.log(e);
                              }
                            }}
                            className="px-3 py-1 bg-[#6f4e37] text-white rounded-lg text-xs font-semibold hover:bg-amber-600 transition-colors"  >
                            Mark Returned
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={() => setShowReturnsModal(false)}
                className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"  >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showTrackingModal && trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className={`w-full max-w-xl rounded-3xl p-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"} shadow-2xl relative`}>
            <button
              onClick={() => {
                setShowTrackingModal(false);
                setTrackingOrder(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 font-bold text-xl" >
              x
            </button>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Shipment Tracking</h2>
            <div className="mb-6 p-4 rounded-2xl bg-gray-50 border">
              <p className="text-sm"><strong>Tracking ID:</strong> TRK-{trackingOrder.raw.id}98273</p>
              <p className="text-sm mt-1"><strong>Carrier:</strong> Delhivery Premium</p>
              <p className="text-sm mt-1"><strong>Destination:</strong> {trackingOrder.raw.address || "N/A"}</p>
            </div>
            <div className="relative pl-8 border-l-2 border-[#d7a53f] space-y-8 py-2">
              <div className="relative">
                <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#d7a53f]"></div>
                <h4 className="font-semibold text-sm">Order Placed</h4>
                <p className="text-xs text-gray-500 mt-1">Order details successfully verified and registered.</p>
              </div>
              <div className="relative">
                <div className={`absolute -left-[39px] top-1.5 w-4 h-4 rounded-full ${
                  ["completed", "delivered", "returned"].includes(trackingOrder.status?.toLowerCase()) ? "bg-[#d7a53f]" : "bg-gray-300"
                }`}></div>
                <h4 className="font-semibold text-sm">Shipped from Hub</h4>
                <p className="text-xs text-gray-500 mt-1">Package picked up by Delhivery agent from distribution center.</p>
              </div>
              <div className="relative">
                <div className={`absolute -left-[39px] top-1.5 w-4 h-4 rounded-full ${
                  ["completed", "delivered"].includes(trackingOrder.status?.toLowerCase()) ? "bg-[#d7a53f]" : "bg-gray-300"
                }`}></div>
                <h4 className="font-semibold text-sm">Out for Delivery</h4>
                <p className="text-xs text-gray-500 mt-1">Shipment is with courier partner near location.</p>
              </div>
              <div className="relative">
                <div className={`absolute -left-[39px] top-1.5 w-4 h-4 rounded-full ${
                  ["completed", "delivered"].includes(trackingOrder.status?.toLowerCase()) ? "bg-[#6f4e37]" : "bg-gray-300"
                }`}></div>
                <h4 className="font-semibold text-sm">Delivered</h4>
                <p className="text-xs text-gray-500 mt-1">Package successfully signed for and received by client.</p>
              </div>
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={() => {
                  setShowTrackingModal(false);
                  setTrackingOrder(null);
                }}
                className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"  >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showShippingModal && shippingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setShippingSaving(true);
              try {
                await axios.put(`http://localhost:5000/api/shipping/${shippingOrder.id}`, {
                  tracking_number: shippingData.tracking_number,
                  carrier: shippingData.carrier,
                  shipping_status: shippingData.shipping_status,
                  estimated_delivery: shippingData.estimated_delivery || null,
                });
                setShowShippingModal(false);
                fetchOrders();
              } catch (err) {
                console.log(err);
              }
              setShippingSaving(false);
            }}
            className={`w-full max-w-lg rounded-3xl p-6 ${darkMode ? "bg-[#1e293b]" : "bg-white"} shadow-2xl relative`}
          >
            <button type="button" onClick={() => setShowShippingModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold text-xl">✕</button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl">🚚</div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#111]"}`}>Manage Shipping</h2>
                <p className="text-sm text-gray-400">Order #{shippingOrder.id} — {shippingOrder.customer_name || shippingOrder.customer}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tracking Number</label>
                <input
                  type="text"
                  value={shippingData.tracking_number}
                  onChange={e => setShippingData({ ...shippingData, tracking_number: e.target.value })}
                  placeholder="e.g. TRK1718290123"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d7a53f] font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Carrier / Courier</label>
                <select
                  value={shippingData.carrier}
                  onChange={e => setShippingData({ ...shippingData, carrier: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-white">
                  <option value="Standard Delivery">Standard Delivery</option>
                  <option value="Delhivery">Delhivery</option>
                  <option value="BlueDart">BlueDart</option>
                  <option value="DTDC">DTDC</option>
                  <option value="Ekart Logistics">Ekart Logistics</option>
                  <option value="India Post">India Post</option>
                  <option value="FedEx">FedEx</option>
                  <option value="Amazon Logistics">Amazon Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shipping Status</label>
                <select
                  value={shippingData.shipping_status}
                  onChange={e => setShippingData({ ...shippingData, shipping_status: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-white" >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estimated Delivery Date</label>
                <input  type="date"  value={shippingData.estimated_delivery}
                  onChange={e => setShippingData({ ...shippingData, estimated_delivery: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#d7a53f]"/>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowShippingModal(false)} className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200">
                Cancel
              </button>
              <button type="submit" disabled={shippingSaving} className="px-6 py-2.5 rounded-xl bg-[#6f4e37] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60" >
                {shippingSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default OrderManagement;
