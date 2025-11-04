import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaTasks,
  FaUmbrellaBeach,
  FaMoneyCheckAlt,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed left-0 top-0 w-64 shadow-2xl flex flex-col">
      {/* ----- Header / Logo ----- */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold tracking-wide text-blue-400 drop-shadow-lg">
          Employee<span className="text-white">MS</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

 
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:scale-[1.03] hover:text-white"
            }`
          }
        >
          <FaTachometerAlt className="text-xl drop-shadow-md" />
          <span className="text-[15px] font-medium tracking-wide">
            Dashboard
          </span>
        </NavLink>

        {/* Employees */}
        <NavLink
          to="/admin-employees"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:scale-[1.03] hover:text-white"
            }`
          }
        >
          <FaUsers className="text-xl drop-shadow-md" />
          <span className="text-[15px] font-medium tracking-wide">Employees</span>
        </NavLink>

        {/* Departments */}
        <NavLink
          to="/admin-dashboard/department"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:scale-[1.03] hover:text-white"
            }`
          }
        >
          <FaBuilding className="text-xl drop-shadow-md" />
          <span className="text-[15px] font-medium tracking-wide">Departments</span>
        </NavLink>

        {/* Tasks */}
        <NavLink
          to="/admin-dashboard/tasks"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:scale-[1.03] hover:text-white"
            }`
          }
        >
          <FaTasks className="text-xl drop-shadow-md" />
          <span className="text-[15px] font-medium tracking-wide">Tasks</span>
        </NavLink>

        {/* Leaves */}
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:scale-[1.03] hover:text-white"
            }`
          }
        >
          <FaUmbrellaBeach className="text-xl drop-shadow-md" />
          <span className="text-[15px] font-medium tracking-wide">Leaves</span>
        </NavLink>

        {/* Salary */}
        <NavLink
          to="/admin-salary"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:scale-[1.03] hover:text-white"
            }`
          }
        >
          <FaMoneyCheckAlt className="text-xl drop-shadow-md" />
          <span className="text-[15px] font-medium tracking-wide">Salary</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/admin-settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:scale-[1.03] hover:text-white"
            }`
          }
        >
          <FaCog className="text-xl drop-shadow-md" />
          <span className="text-[15px] font-medium tracking-wide">Settings</span>
        </NavLink>
      </nav>

      {/* ----- Footer ----- */}
      <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} EmployeeMS
      </div>
    </div>
  );
};

export default AdminSidebar;
