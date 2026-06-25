import { useState, useEffect } from "react";
import axios from "axios";
import downArrowIcon from "../assets/down-arrow.png";
import leftArrowIcon from "../assets/left-arrow.png";

const EditUser = ({ darkMode, editData, setActive }) => {
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    department: "",
    role: "",
    status: "Active",
    address: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editData) {
      setUser({
        id: editData.id || "",
        fullName: editData.fullName || "",
        email: editData.email || "",
        phone: editData.phone || "",
        gender: editData.gender || "",
        dob: editData.dob ? editData.dob.split('T')[0] : "",
        department: editData.department || "",
        role: editData.role || "",
        status: editData.status || "Active",
        address: editData.address || ""
      });
      if (editData.profileImage) {
        setImagePreview(`http://localhost:5000/uploads/${editData.profileImage}`);
      }
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("fullName", user.fullName);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("gender", user.gender);
    formData.append("dob", user.dob);
    formData.append("department", user.department);
    formData.append("role", user.role);
    formData.append("status", user.status);
    formData.append("address", user.address);

    if (image) {
      formData.append("profileImage", image);
    }

    try {
      await axios.put(`http://localhost:5000/api/users/${user.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("User updated successfully!");
      setActive("Users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-[#fcfbf9] text-gray-800"}`}>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActive("Users")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
            darkMode ? "border-gray-700 bg-gray-800 text-gray-250 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-650 hover:bg-gray-50"
          }`}
        >
          <img src={leftArrowIcon} alt="back" className="w-3 h-3 dark:invert opacity-70" />
          Back to Users
        </button>
        <h1 className="text-2xl font-bold text-black">Edit User</h1>
      </div>

      <div className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 shadow-sm border ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email *</label>
              <input
                type="email"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone</label>
              <input
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Date of Birth</label>
              <input
                type="date"
                value={user.dob}
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                  darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Gender</label>
              <div className="relative">
                <select
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`}
                >
                  <option value="" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Select Gender</option>
                  <option value="Male" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Male</option>
                  <option value="Female" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Female</option>
                  <option value="Other" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Other</option>
                </select>
                <img
                  src={downArrowIcon}
                  alt="select arrow"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Status</label>
              <div className="relative">
                <select
                  value={user.status}
                  onChange={(e) => setUser({ ...user, status: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent appearance-none cursor-pointer ${
                    darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
                  }`} >
                  <option value="Active" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Active</option>
                  <option value="Pending" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Pending</option>
                  <option value="Blocked" className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-850"}>Blocked</option>
                </select>
                <img src={downArrowIcon} alt="select arrow" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60 dark:invert"/>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-4">Profile Image</label>
              <label className="relative flex w-32 h-32 cursor-pointer group rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#d7a53f] transition-all">
                <img
                  src={imagePreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full object-cover"   />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-white text-xs font-bold text-center px-2">Change Image</span>
                </div>
                <input  type="file"  accept="image/*"  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    if (file) setImagePreview(URL.createObjectURL(file)); }}
                  className="hidden"/>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Address</label>
            <textarea
              rows={4}
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#d7a53f] bg-transparent ${
                darkMode ? "border-gray-700 text-white" : "border-gray-200 text-gray-800"
              }`}
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setActive("Users")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all border ${
                darkMode ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`} >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#6f4e37] hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md" >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
