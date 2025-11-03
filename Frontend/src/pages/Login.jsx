import React, { useState } from "react";
import axios from "axios"; // ✅ Import axios
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login    } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if(response.data.user.role === "admin "){
            navigate("/admin-dashboard")
        }
        else{
            navigate("/emloyee-dashboard")
        }
      }

      // ✅ Handle success
      if (response.data.success) {
        setMessage("Login Successful 🎉");
        localStorage.setItem("token", response.data.token);
        console.log("User Data:", response.data.user);
        // You can navigate to dashboard page here
      } else {
        setMessage(response.data.error || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-[380px] border border-gray-200">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            className="w-16 h-16 mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Employee Management System
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
            Login <span className="text-2xl font-bold text-blue-600">EMS</span>
          </h2>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500" />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-blue-600 hover:underline hover:text-blue-700"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm mt-3 ${
                message.includes("Successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Employee Management System
        </p>
      </div>
    </div>
  );
};

export default Login;
