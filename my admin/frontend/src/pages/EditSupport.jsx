import { useState, useEffect } from "react";
import axios from "axios";
import downArrowIcon from "../assets/down-arrow.png";
import leftArrowIcon from "../assets/left-arrow.png";

const EditSupport = ({ darkMode, editData, setActive }) => {
  const [ticket, setTicket] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "Medium",
    status: "Pending"
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editData) {
      setTicket({
        id: editData.id || "",
        name: editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        subject: editData.subject || "",
        message: editData.message || "",
        priority: editData.priority || "Medium",
        status: editData.status || "Pending",
        created_at: editData.created_at || "",
        image: editData.displayedImage || editData.image || null
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/enquiries/${ticket.id}`, {
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        subject: ticket.subject,
        message: ticket.message,
        priority: ticket.priority,
        status: ticket.status
      });
      alert("Ticket updated successfully!");
      setActive("Support");
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#fcfbf9] text-gray-800"}`}>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActive("Support")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${
            darkMode ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-55"
          } transition-all`}
        >
          <img src={leftArrowIcon} alt="back" className="w-3 h-3 dark:invert opacity-70" />
          Back to Support
        </button>
        <h1 className="text-2xl font-bold">Edit Support Ticket</h1>
      </div>

      <div className={`max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 shadow-sm border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
            <label className="relative flex w-16 h-16 cursor-pointer group rounded-full overflow-hidden border-2 border-transparent hover:border-[#6f4e37] transition-all shadow-sm">
              <img src={ticket.image || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <span className="text-white text-[10px] font-bold text-center leading-tight">Edit</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setTicket({ ...ticket, image: URL.createObjectURL(file) });
                  }
                }}
                className="hidden"
              />
            </label>
            <div>
              <p className="text-sm font-semibold text-black uppercase tracking-wide">Submitted On</p>
              <p className="text-sm font-bold mt-1">{ticket.created_at ? new Date(ticket.created_at).toLocaleString() : "N/A"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Customer Name</label>
              <input
                type="text"
                required
                value={ticket.name}
                onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Customer Email</label>
              <input
                type="email"
                required
                value={ticket.email}
                onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Customer Phone</label>
              <input
                type="text"
                value={ticket.phone}
                onChange={(e) => setTicket({ ...ticket, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase mb-2">Subject</label>
            <input
              type="text"
              required
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase mb-2">Message / Issue Details</label>
            <textarea
              required
              value={ticket.message}
              onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent h-32 ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Priority</label>
              <div className="relative">
                <select
                  value={ticket.priority}
                  onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`}
                >
                  <option value="Low" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Low</option>
                  <option value="Medium" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Medium</option>
                  <option value="High" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>High</option>
                </select>
                <img
                  src={downArrowIcon}
                  alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Status</label>
              <div className="relative">
                <select
                  value={ticket.status}
                  onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`} >
                  <option value="Pending" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Pending</option>
                  <option value="In Progress" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>In Progress</option>
                  <option value="Resolved" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Resolved</option>
                </select>
                <img
                  src={downArrowIcon}
                  alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setActive("Support")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all border ${
                darkMode ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`} >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#6f4e37] hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md">
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupport;
