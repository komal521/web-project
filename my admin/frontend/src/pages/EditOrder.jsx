import { useState, useEffect } from "react";
import axios from "axios";
import downArrowIcon from "../assets/down-arrow.png";
import leftArrowIcon from "../assets/left-arrow.png";
const EditOrder = ({ darkMode, editData, setActive }) => {
  const [order, setOrder] = useState({
    id: "",
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    items: "",
    total_amount: "",
    status: "Pending"
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (editData) {
      setOrder({
        id: editData.id || "",
        customer_name: editData.customer_name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        address: editData.address || "",
        items: editData.items || "",
        total_amount: editData.total_amount || "",
        status: editData.status || "Pending"
      });
    }
  }, [editData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/orders/${order.id}`, order);
      alert("Order updated successfully!");
      setActive("Order Management");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#fcfbf9] text-gray-800"}`}>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActive("Order Management")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${
            darkMode ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          } transition-all`} >
          <img src={leftArrowIcon} alt="back" className="w-3 h-3 dark:invert opacity-70" />
          Back to Orders
        </button>
        <h1 className="text-2xl font-bold">Edit Order</h1>
      </div>
      <div className={`max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 shadow-sm border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Order ID</label>
              <input type="text" required value={order.id}
                onChange={(e) => setOrder({ ...order, id: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-amber-400" : "border-gray-200 text-gray-800"
                }`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Customer Name</label>
              <input  type="text"  required value={order.customer_name}
                onChange={(e) => setOrder({ ...order, customer_name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Email Address</label>
              <input
                type="email"
                required
                value={order.email}
                onChange={(e) => setOrder({ ...order, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Phone Number</label>
              <input
                type="text"
                value={order.phone}
                onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-2">Items Ordered</label>
            <input
              type="text"
              required
              value={order.items}
              onChange={(e) => setOrder({ ...order, items: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
              }`}/>
          </div>
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-2">Shipping Address</label>
            <textarea
              value={order.address}
              onChange={(e) => setOrder({ ...order, address: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent h-20 ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
              }`} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Total Amount (₹)</label>
              <input
                type="number"
                required
                value={order.total_amount}
                onChange={(e) => setOrder({ ...order, total_amount: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Status</label>
              <div className="relative">
                <select
                  value={order.status}
                  onChange={(e) => setOrder({ ...order, status: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`}  >
                  <option value="Pending" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Pending</option>
                  <option value="Completed" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Completed</option>
                  <option value="Cancelled" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Cancelled</option>
                  <option value="Returned" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Returned</option>
                </select>
                <img  src={downArrowIcon} alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"   />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button"
              onClick={() => setActive("Order Management")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all border ${
                darkMode ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}    >
              Cancel
            </button>
            <button  type="submit"  disabled={saving}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#6f4e37] hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md" >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
