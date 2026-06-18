import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gmailIcon from "../assets/gmail.png";
import lockIcon from "../assets/lock.png";
import viewIcon from "../assets/view.png";
import googleIcon from "../assets/google (1).png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      } else {
        if (data.message === "Invalid email or password") {
          navigate("/signup", { state: { email, password } });
        } else {
          setError(data.message || "Invalid email or password");
        }
      }
    } catch (err) {
      setError("Backend not connected. Please start WAMP and backend server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0ff] via-[#faf8f4] to-[#f0f4ff] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-2xl mb-4">
            <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-purple-600 tracking-tight">Lumina</h2>
          <h3 className="text-2xl font-bold mt-3 text-gray-900">Welcome Back</h3>
          <p className="text-gray-500 mt-1 text-sm">Sign in to access your account</p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center">
            {error}
          </div>
        )}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-purple-400 focus-within:bg-white transition">
              <img src={gmailIcon} alt="" className="w-5 h-5 mr-3 opacity-60" />
              <input type="email" placeholder="name@example.com"
                className="w-full outline-none bg-transparent text-gray-800 text-sm"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-purple-400 focus-within:bg-white transition">
              <img src={lockIcon} alt="" className="w-5 h-5 mr-3 opacity-60" />
              <input type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full outline-none bg-transparent text-gray-800 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required/>
              <button type="button" onClick={() => setShowPass(!showPass)} className="ml-2">
                <img src={viewIcon} alt="show" className={`w-5 h-5 transition ${showPass ? "opacity-80" : "opacity-40"}`} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-purple-600" />
              Remember me
            </label>
            <button type="button" className="text-purple-600 font-semibold hover:text-purple-800 transition">
              Forgot Password?
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-purple-100 transition" >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing In...
              </span>
            ) : "Sign In To Account"}
          </button>
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button type="button"
           className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition" >
            <img src={googleIcon} alt="" className="w-5 h-5" />
            Sign In With Google
          </button>
          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-bold hover:text-purple-800 transition">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;