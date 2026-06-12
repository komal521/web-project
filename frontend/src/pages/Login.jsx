import { Link } from "react-router-dom";
import gmailIcon from "../assets/gmail.png";
import lockIcon from "../assets/lock.png";
import viewIcon from "../assets/view.png";
import googleIcon from "../assets/google (1).png";
const Login = () => {
  return (
    <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-600">Lumina</h2>
          <h3 className="text-3xl font-bold mt-4">Welcome Back</h3>
          <p className="text-gray-500 mt-2">
            Please enter your details to access your dashboard.
          </p>
        </div>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              EMAIL ADDRESS
            </label>
            <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50">
              <img src={gmailIcon} alt="" className="w-5 h-5 mr-3" />
              <input type="email" placeholder="name@company.com"
                className="w-full outline-none bg-transparent"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              PASSWORD
            </label>
            <div className="flex items-center border rounded-xl px-4 py-3 bg-gray-50">
              <img src={lockIcon} alt="" className="w-5 h-5 mr-3" />
              <input type="password" placeholder="••••••••" className="w-full outline-none bg-transparent"/>
              <img src={viewIcon} alt="" className="w-5 h-5 cursor-pointer"/>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className="text-purple-600 font-medium" >
              Forgot Password?
            </button>
          </div>
          <button type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold" >
            Sign In To Account
          </button>
          <div className="text-center text-gray-400 text-sm">
          </div>
          <button type="button"
          className="w-full border py-3 rounded-xl flex items-center justify-center gap-3" >
            <img src={googleIcon} alt="" className="w-5 h-5" />
            Sign In With Google
          </button>
          <p className="text-center text-sm">
            Don't have an account?
            <Link to="/signup" className="text-purple-600 font-semibold ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;