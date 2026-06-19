import { useState, useEffect } from "react";
import axios from "axios";
import profileImg from "../assets/a1.jpeg";
import groupIcon from "../assets/group.png";
import userIcon from "../assets/user.png";
import gmailIcon from "../assets/gmail.png";
import telephoneIcon from "../assets/telephone.png";
import departmentIcon from "../assets/department.png";
import verifiedIcon from "../assets/verified.png";
import switchIcon from "../assets/switch.png";
import locationIcon from "../assets/location.png";
import cameraIcon from "../assets/camra.png";
import downIcon from "../assets/down.png";
const CreateUserForm = ({ setShowForm, onUserCreated, editUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "Active",
    password: "",
    confirmPassword: "",
    address: "",
  });
  useEffect(() => {
    if (editUser) {
      setFormData({
        fullName: editUser.fullName || "",
        email: editUser.email || "",
        phone: editUser.phone || "",
        department: editUser.department || "",
        role: editUser.role || "",
        status: editUser.status || "Active",
        password: "",
        confirmPassword: "",
        address: editUser.address || "",
      });
    }
  }, [editUser]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.role ||
      !formData.password ||
      !formData.address
    ) {
      alert("Please fill all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      let res;
      if (editUser) {
        res = await axios.put(`http://localhost:5000/api/users/${editUser.id}`, formData);
      } else {
        res = await axios.post("http://localhost:5000/api/users/create-user", {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          role: formData.role,
          status: formData.status,
          password: formData.password,
          address: formData.address,
        });
      }
      alert(res.data.message);
      console.log(res.data);
      onUserCreated?.();
      setShowForm(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        role: "",
        status: "Active",
        password: "",
        confirmPassword: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        "Backend ";
      alert(message);
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#f8f5ef] py-4 sm:py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-[30px] shadow-md border border-[#ececec] p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f1f1f] leading-tight">
              {editUser ? "Edit User Account" : "Create User Account"}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Register a professional profile inside the organization.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="relative">
              <img  src={profileImg}  alt=""
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-[6px] border-[#f3e4bc]"/>
              <div className="absolute bottom-0 right-0 bg-[#d9a63d] p-2 rounded-full shadow-md">
                <img src={cameraIcon} alt="" className="w-4 h-4" />
              </div>
            </div>
            <h2 className="mt-4 text-[#333] font-semibold text-lg">
              User Portrait
            </h2>
            <p className="text-gray-400 text-sm text-center">
              JPG, PNG or GIF • MAX 5MB
            </p>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <img src={groupIcon} alt="" className="w-5 h-5" />
              <h2 className="font-bold text-[#5c4033] text-lg">
                Identity Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Full Name
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center">
                  <img  src={userIcon}  alt=""  className="w-5 h-5 mr-3"/>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    placeholder="Alexander Hamilton" className="w-full outline-none bg-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Email Address
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center">
                  <img  src={gmailIcon}  alt=""  className="w-5 h-5 mr-3" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="alex@aurelia.com"
                    className="w-full outline-none bg-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Phone Number
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center">
                  <img src={telephoneIcon} alt="" className="w-5 h-5 mr-3"/>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91 99999 00000"  className="w-full outline-none bg-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Department
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center w-full">
                    <img src={departmentIcon} alt="" className="w-5 h-5 mr-3" />
                    <select  name="department"  value={formData.department}
                      onChange={handleChange}
                      className="w-full outline-none bg-transparent text-gray-500 appearance-none text-sm"  >
                      <option value="">Select Department</option>
                      <option>HR</option>
                      <option>Sales</option>
                      <option>Management</option>
                    </select>
                  </div>
                  <img  src={downIcon}  alt=""  className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <img
                src={verifiedIcon}
                alt=""
                className="w-5 h-5" />
              <h2 className="font-bold text-[#5c4033] text-lg">
                Access & Governance
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  System Role
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center w-full">
                    <img  src={verifiedIcon}  alt=""  className="w-5 h-5 mr-3" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full outline-none bg-transparent text-gray-500 appearance-none text-sm" >
                      <option value="">Select Role</option>
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>Staff</option>
                    </select>
                  </div>
                  <img src={downIcon} alt="" className="w-4 h-4 ml-2" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Account Status
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center w-full">
                    <img  src={switchIcon}  alt=""  className="w-5 h-5 mr-3"/>
                    <select name="status" value={formData.status}   onChange={handleChange}
                      className="w-full outline-none bg-transparent text-gray-500 appearance-none text-sm" >
                      <option>Active</option>
                      <option>Pending</option>
                    </select>
                  </div>
                  <img src={downIcon} alt="" className="w-4 h-4 ml-2" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Password
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center">
                  <img src={verifiedIcon} alt="" className="w-5 h-5 mr-3"/>
                  <input  type="password"  name="password"  value={formData.password}
                    onChange={handleChange}  placeholder="********"
                    className="w-full outline-none bg-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-2">
                  Confirm Password
                </label>
                <div className="border border-[#e5e5e5] rounded-xl px-4 py-3 flex items-center">
                  <img src={verifiedIcon} alt="" className="w-5 h-5 mr-3" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword}
                    onChange={handleChange}  placeholder="********"
                    className="w-full outline-none bg-transparent text-sm" />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <img src={locationIcon} alt="" className="w-5 h-5" />
              <h2 className="font-bold text-[#5c4033] text-lg">
                Office Location
              </h2>
            </div>
            <label className="text-sm text-gray-600 block mb-2">
              Full Business Address
            </label>
            <div className="border border-[#e5e5e5] rounded-2xl px-4 py-4 flex items-start">
              <img src={locationIcon} alt=""  className="w-5 h-5 mr-3 mt-1" />
              <textarea rows="4" name="address" value={formData.address} onChange={handleChange}
                placeholder="Enter the primary office address..."
                className="w-full outline-none resize-none bg-transparent text-sm"/>
            </div>
          </div>
          <div className="bg-[#f8f1df] border border-[#eedcb5] rounded-2xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" />
              <p className="text-sm text-gray-600 leading-6">
                Authorize professional access and confirm company policies.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button onClick={() => setShowForm(false)}
              className="border border-[#d9a63d] text-[#6d4c41] px-6 py-3 rounded-xl font-semibold hover:bg-[#f7edd2] transition-all duration-300" >
              Discard Changes
            </button>
            <button onClick={handleSubmit}
              className="bg-[#d9a63d] hover:bg-[#c3922f] px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300">
              {editUser ? "Update Professional Account" : "Create Professional Account"}
            </button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-[#f8efdf] rounded-[30px] p-5 sm:p-6 border border-[#f1dfb6] shadow-sm">
            <img  src={profileImg}  alt=""
              className="w-full h-[220px] object-cover object-top rounded-2xl mb-5"/>
            <h2 className="text-[#5c4033] font-bold text-xl mb-3">
              Creating Excellence
            </h2>
            <p className="text-sm text-gray-600 leading-7">
              Add new members to create a professional organization structure.
            </p>
            <div className="mt-5 border-t pt-4 text-sm text-[#5c4033] space-y-3">
              <div className="flex justify-between items-center">
                <span>Security Best Practices</span>
                <img src={downIcon} alt="" className="w-4 h-4"/>
              </div>
              <div className="flex justify-between items-center">
                <span>Role Capabilities</span>
                <img src={downIcon} alt="" className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[30px] p-5 sm:p-6 border border-[#ececec] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[#5c4033]">
                Completion Progress
              </h2>
              <span className="font-semibold text-[#5c4033]">
                85%
              </span>
            </div>
            <div className="w-full h-3 bg-[#eeeeee] rounded-full overflow-hidden mb-5">
              <div className="bg-[#d9a63d] h-full w-[85%] rounded-full"></div>
            </div>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <img src={verifiedIcon} alt="" className="w-4 h-4" />
                <span>Basic information provided</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={verifiedIcon} alt="" className="w-4 h-4"/>
                <span>Role and department selected</span>
              </div>
              <div className="flex items-center gap-3">
                <img src={verifiedIcon} alt="" className="w-4 h-4" />
                <span>Security credentials pending</span>
              </div>
            </div>
          </div>
          <div className="bg-[#f9e7dc] rounded-[30px] p-5 border border-[#f1d1c0]">
            <h2 className="font-bold text-[#b1613f] mb-2">
              Premium Security Enabled
            </h2>
            <p className="text-sm text-[#8c5d4a] leading-7">
              Every user account is protected with modern security verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
