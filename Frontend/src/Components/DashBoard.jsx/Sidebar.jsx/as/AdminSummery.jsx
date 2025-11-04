import React from "react";
import SummeryCard from "./SummeryCard";
import { FaUsers, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import { ClipboardCheck, CalendarDays, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WeatherHeader from "../../WeatherHeader";

const AdminSummery = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Task Management",
      description: "Track and assign employee tasks efficiently.",
      icon: <ClipboardCheck size={40} />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Leave Management",
      description: "Monitor employee leaves and approvals.",
      icon: <CalendarDays size={40} />,
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Salary Management",
      description: "Manage payroll, bonuses, and payments easily.",
      icon: <Wallet size={40} />,
      color: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col items-center justify-center overflow-hidden">
      {/* 🌦️ Weather Header */}
      <div className="w-full max-w-6xl mb-8">
        <WeatherHeader />
      </div>

      {/* 📊 Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
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

      {/* 🧩 Task / Leave / Salary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative bg-gray-900 rounded-3xl p-6 flex flex-col justify-between items-center h-64 
                       shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 
                       border border-gray-700 text-center"
          >
            <div>
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-r ${card.color} text-white`}
              >
                {card.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {card.title}
              </h2>
              <p className="text-gray-400 text-sm mb-6 px-2">{card.description}</p>
            </div>

            <button
              onClick={() => navigate("/management")}
              className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-500 hover:to-gray-400 
                         rounded-full text-white font-medium transition-all duration-300"
            >
              Detailed
            </button>

            <div className="absolute bottom-4 right-4 text-gray-500 text-sm opacity-50">
              {index + 1}/3
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSummery;
