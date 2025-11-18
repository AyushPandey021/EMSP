import React from "react";
import SummeryCard from "./SummeryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import { ClipboardCheck, CalendarDays, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WeatherHeader from "./WeatherHeader";

const AdminSummery = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Task Management",
      description: "Track and assign employee tasks efficiently.",
      icon: <ClipboardCheck size={40} />,
      color: "from-yellow-400 to-orange-500",
      route: "/admin-dashboard/tasks",
    },
    {
      title: "Leave Management",
      description: "Monitor employee leaves and approvals.ayush pandey",
      icon: <CalendarDays size={40} />,
      color: "from-blue-400 to-cyan-500",
      route: "/admin-dashboard/leaves",
    },
    {
      title: "Salary Management",
      description: "Manage payroll, bonuses, and payments easily.",
      icon: <Wallet size={40} />,
      color: "from-pink-500 to-purple-500",
      route: "/admin-dashboard/salary",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center py-15">
      {/* Weather Header */}
      <div className="w-full max-w-6xl">
        <WeatherHeader />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-3">
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

      {/* Functional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl mt-5">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            className="group cursor-pointer w-[22vw] bg-white rounded-3xl p-6 shadow-md border border-gray-200 
                       hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative"
          >
            <div className="flex flex-col items-center text-center">

              {/* Icon */}
              <div
                className={`w-20 h-20 mb-2 rounded-full flex items-center justify-center 
                            bg-gradient-to-r ${card.color} text-white shadow-md`}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800">
                {card.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-2 px-3">
                {card.description}
              </p>

              {/* Button */}
              <button
                className="mt-3 px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-900 
                           text-white rounded-full shadow-md group-hover:shadow-lg 
                           transition-all duration-300"
              >
                View Details
              </button>

              {/* Index Number */}
              <div className="absolute bottom-3 right-4 text-gray-400 text-xs opacity-60">
                {index + 1}/3
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSummery;
