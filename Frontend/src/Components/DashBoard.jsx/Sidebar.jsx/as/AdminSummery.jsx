import React from "react";
import SummeryCard from "./SummeryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import { ClipboardCheck, CalendarDays, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WeatherHeader from "../../WeatherHeader";

const AdminSummery = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-start  space-y-10 overflow-hidden">
      {/* Weather Header */}
      <div className="w-full max-w-6xl">
        <WeatherHeader />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 mt-[-5%] md:grid-cols-3 gap-6 w-full max-w-6xl">
        <SummeryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={13}
          color="bg-teal-500"
        />
        <SummeryCard
          icon={<FaMoneyBillWave />}
          text="Total Salary Paid"
          number="$4534"
          color="bg-red-500"
        />
        <SummeryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={5}
          color="bg-yellow-500"
        />
      </div>

      {/* Task / Leave / Salary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-50 gap-8 w-full max-w-6xl">
        {/* --- Task Details --- */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-6 text-white hover:-translate-y-2 transition-transform duration-300 backdrop-blur-lg bg-opacity-80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <ClipboardCheck className="w-10 h-10" />
              <span className="text-4xl font-bold">24</span>
            </div>
            <h2 className="text-2xl font-semibold mt-4">Task Details</h2>
            <p className="text-sm text-blue-100 mt-2">
              Assigned employee tasks and progress.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin-dashboard/tasks")}
            className="mt-6 bg-white text-indigo-700 font-semibold px-5 py-2 rounded-xl hover:bg-indigo-100 transition-colors w-fit"
          >
            Details
          </button>
        </div>

        {/* --- Leave Details --- */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-6 text-white hover:-translate-y-2 transition-transform duration-300 backdrop-blur-lg bg-opacity-80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <CalendarDays className="w-10 h-10" />
              <span className="text-4xl font-bold">5</span>
            </div>
            <h2 className="text-2xl font-semibold mt-4">Leave Details</h2>
            <p className="text-sm text-green-100 mt-2">
              Manage pending and approved leave requests.
            </p>
          </div>
          <button
            onClick={() => navigate("/leaves")}
            className="mt-6 bg-white text-emerald-700 font-semibold px-5 py-2 rounded-xl hover:bg-emerald-100 transition-colors w-fit"
          >
            Details
          </button>
        </div>

        {/* --- Salary Details --- */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-2xl p-6 text-white hover:-translate-y-2 transition-transform duration-300 backdrop-blur-lg bg-opacity-80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <Wallet className="w-10 h-10" />
              <span className="text-4xl font-bold">₹1.2L</span>
            </div>
            <h2 className="text-2xl font-semibold mt-4">Salary Details</h2>
            <p className="text-sm text-orange-100 mt-2">
              Monthly salary overview and payment status.
            </p>
          </div>
          <button
            onClick={() => navigate("/salary")}
            className="mt-6 bg-white text-amber-700 font-semibold px-5 py-2 rounded-xl hover:bg-amber-100 transition-colors w-fit"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSummery;
