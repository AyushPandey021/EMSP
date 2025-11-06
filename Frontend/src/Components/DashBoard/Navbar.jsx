import React from "react";
import { useAuth } from "../../context/authContext";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    // Add your logout logic here (clear token, redirect, etc.)
    console.log("User logged out");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 shadow-md backdrop-blur-md border-b border-teal-400">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
          <FaUserCircle className="text-white text-2xl" />
        </div>
        <h1 className="text-white font-semibold text-lg tracking-wide">
          Employee
          <span className="text-yellow-300 first-letter:uppercase">
            {" "}
            {user?.name || "User"}
          </span>
        </h1>
      </div>

 
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
