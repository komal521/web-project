import userIcon from "../assets/user.png";
import handleIcon from "../assets/smartphone-call.png";
import gmailIcon from "../assets/gmail.png";
import phoneIcon from "../assets/phone-call.png";
import calendarIcon from "../assets/calendar.png";
import lockIcon from "../assets/padlock.png";
import arrowIcon from "../assets/right-arrow.png";
import googleIcon from "../assets/google (1).png";
import appleIcon from "../assets/mobile-phone.png";
import facebookIcon from "../assets/facebook.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
   const [formData, setFormData] = useState({
  fullName: "",
  username: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  password: "",
  confirmPassword: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData
    );
    if (response.data.success && response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    alert(response.data.message);
    navigate("/home"); 
  } catch (error) {
    console.error(error);
    alert("Registration Failed");
  }
};
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f6f6f6] flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-[750px] bg-white rounded-3xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-[#222]">
          Create Your Account  </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Please provide your professional credentials to begin. </p>
        <div className="flex items-center gap-2 mt-8 mb-5">
          <img src={userIcon} alt="" className="w-5 h-5" />
          <h2 className="uppercase text-sm font-semibold tracking-wide">
            Personal Profile
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 h-12 mt-2">
              <img src={userIcon} alt="" className="w-4 h-4" />
              <input type="text" name="fullName" placeholder="Name" onChange={handleChange}
            className="w-full ml-3 outline-none text-sm"/>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">
              Username </label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 h-12 mt-2">
              <img src={handleIcon} alt="" className="w-4 h-4" />
              <input type="text" name="username" placeholder="UserName" onChange={handleChange}
                 className="w-full ml-3 outline-none text-sm"/>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">
              Email Address </label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 h-12 mt-2">
              <img src={gmailIcon} alt="" className="w-4 h-4" />
             <input type="email" name="email" placeholder="name@.com" onChange={handleChange}
             className="w-full ml-3 outline-none text-sm"/>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 h-12 mt-2">
              <img src={phoneIcon} alt="" className="w-4 h-4" />
             <input type="text" name="phone" placeholder="+1 (555) 000-0000" onChange={handleChange}
            className="w-full ml-3 outline-none text-sm"/>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div>
            <label className="text-sm font-medium">
              Gender Identity
            </label>
            <div className="space-y-3 mt-3">
             <div className="space-y-3 mt-3">
      <label className="flex items-center gap-2 text-sm">
    <input type="radio" name="gender" value="Male" onChange={handleChange} />
    Male
  </label>
  <label className="flex items-center gap-2 text-sm">
    <input type="radio" name="gender" value="Female" onChange={handleChange} />
    Female
  </label>
  <label className="flex items-center gap-2 text-sm">
    <input type="radio" name="gender" value="Other" onChange={handleChange} />
    Other
  </label>
          </div>
            </div>
          </div>
          <div>
           <label className="text-sm font-medium">
  Date of Birth
</label>
<div className="flex items-center border border-gray-300 rounded-full px-4 h-12 mt-2">
  <img src={calendarIcon} alt="" className="w-4 h-4" />
  <input type="date" name="dob" value={formData.dob} onChange={handleChange}
    className="w-full ml-3 outline-none text-sm bg-transparent"/>
</div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-8 mb-5">
          <img src={lockIcon} alt="" className="w-5 h-5" />
          <h2 className="uppercase text-sm font-semibold tracking-wide">
            Security Settings
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
  <label className="text-sm font-medium">Password</label>
  <div className="flex items-center border border-gray-300 rounded-full px-4 h-12 mt-2">
    <img src={lockIcon} alt="" className="w-4 h-4" />
    <input  type="password"  name="password"  placeholder="Password"  onChange={handleChange}
      className="w-full ml-3 outline-none text-sm" />
  </div>
</div>
         <div>
  <label className="text-sm font-medium">Confirm Password</label>
  <div className="flex items-center border border-gray-300 rounded-full px-4 h-12 mt-2">
    <img src={lockIcon} alt="" className="w-4 h-4" />
    <input type="password" name="confirmPassword" placeholder="Confirm Password"
      onChange={handleChange}
      className="w-full ml-3 outline-none text-sm" />
  </div>
</div>
        </div>
        <div className="bg-gray-100 rounded-2xl p-4 mt-8">
          <label className="flex gap-3 text-sm">
            <input type="checkbox" className="mt-1" />
            <span className="text-gray-600">
              I accept the Terms of Service and Privacy Policy.
            </span>
          </label>
        </div>
       <button  type="button"  onClick={handleSubmit}
  className="w-full mt-8 h-14 rounded-full bg-gradient-to-r from-[#d7c2ff] to-[#a56eff] text-white font-semibold flex items-center justify-center gap-3 hover:opacity-95 transition">
  Create My Premium Account
  <img src={arrowIcon} alt="" className="w-5 h-5" />
       </button>
        <div className="flex items-center my-7">
          <div className="flex-1 border-t"></div>
          <span className="px-4 text-xs text-gray-500 font-medium">
            OR REGISTER WITH
          </span>
          <div className="flex-1 border-t"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="border border-gray-300 h-12 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src={googleIcon} alt="Google" className="w-5 h-5"  />
            Google
          </button>
          <button className="border border-gray-300 h-12 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src={appleIcon} alt="Apple" className="w-5 h-5"/>
            Apple
          </button>
          <button className="border border-gray-300 h-12 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src={facebookIcon} alt="Facebook" className="w-5 h-5"/>
            Facebook
          </button>
        </div>
        <p className="text-center text-sm mt-6 text-gray-600">
          Already a member?
          <span className="font-semibold ml-1 cursor-pointer text-black">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};
export default Registration;