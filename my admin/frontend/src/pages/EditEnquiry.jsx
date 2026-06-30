import { useState, useEffect } from "react";
import axios from "axios";
import downArrowIcon from "../assets/down-arrow.png";
import leftArrowIcon from "../assets/left-arrow.png";
const EditEnquiry = ({ darkMode, editData, setActive }) => {
  const [enquiry, setEnquiry] = useState({
    id: "",
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "Medium",
    status: "Pending"
  });
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    if (editData) {
      setEnquiry({
        id: editData.id || "",
        full_name: editData.full_name || editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        subject: editData.subject || "",
        message: editData.message || "",
        priority: editData.priority || "Medium",
        status: editData.status || "Pending"
      });
      if (editData.displayedImage) {
        setImagePreview(editData.displayedImage);
      }
    }
  }, [editData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/enquiries/${enquiry.id}`, {
        full_name: enquiry.full_name,
        email: enquiry.email,
        phone: enquiry.phone,
        subject: enquiry.subject,
        message: enquiry.message,
        priority: enquiry.priority,
        status: enquiry.status });
      alert("Enquiry updated successfully!");
      setActive("Enquiries");
    } catch (error) {
      console.error("Error updating enquiry:", error);
      alert("Failed to update enquiry.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#fcfbf9] text-gray-800"}`}>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActive("Enquiries")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
            darkMode ? "border-gray-700 bg-gray-800 text-gray-250 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-650 hover:bg-gray-55"
          }`} >
          <img src={leftArrowIcon} alt="back" className="w-3 h-3 dark:invert opacity-70" />
          Back to Enquiries
        </button>
        <h1 className="text-2xl font-bold">Edit Customer Enquiry</h1>
      </div>
      <div className={`max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 shadow-sm border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Customer Name</label>
              <input type="text" required value={enquiry.full_name}
                onChange={(e) => setEnquiry({ ...enquiry, full_name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}/>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Customer Email</label>
              <input  type="email"  required  value={enquiry.email}  onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Customer Phone</label>
              <input  type="text" value={enquiry.phone}
                onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}/>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-2">Subject</label>
            <input type="text" required value={enquiry.subject}
              onChange={(e) => setEnquiry({ ...enquiry, subject: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800" }`} />
          </div>
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-2">Message / Inquiry Details</label>
            <textarea required value={enquiry.message}
              onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent h-28 ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"  }`} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Priority</label>
              <div className="relative">
                <select value={enquiry.priority}
                  onChange={(e) => setEnquiry({ ...enquiry, priority: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`} >
                  <option value="Low" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Low</option>
                  <option value="Medium" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Medium</option>
                  <option value="High" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>High</option>
                </select>
                <img  src={downArrowIcon}  alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-black uppercase mb-2">Status</label>
              <div className="relative">
                <select value={enquiry.status} onChange={(e) => setEnquiry({ ...enquiry, status: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`}>
                  <option value="Pending" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Pending</option>
                  <option value="In Progress" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>In Progress</option>
                  <option value="Resolved" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Resolved</option>
                </select>
                <img src={downArrowIcon} alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"/>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 dark:border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Current Image</label>
              {imagePreview && (
                <div className="mb-3">
                  <img
                    src={imagePreview}
                    alt="Current image"
                    className="w-32 h-32 rounded-xl object-cover border border-gray-200"
                  />
                  <p className="text-xs text-gray-450 mt-1">Current image</p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Change Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6f4e37] bg-transparent file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold ${
                  darkMode ? "border-gray-700 text-white file:bg-gray-700 file:text-white" : "border-gray-200 text-gray-800 file:bg-gray-100 file:text-gray-700"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button  type="button" onClick={() => setActive("Enquiries")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all border ${
                darkMode ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-55"
              }`}  >
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

export default EditEnquiry;
