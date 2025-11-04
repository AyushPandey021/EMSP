import React from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const LeaveList = () => {
  const cards = [
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Leaves Applied",
      number: 5,
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: "Leaves Approved",
      number: 3,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaTimesCircle className="text-3xl" />,
      title: "Leaves Rejected",
      number: 2,
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Pending Leaves",
      number: 1,
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="h-150 w-full overflow-hidden flex flex-col justify-center items-center bg-gray-900 p-6 md:p-10">
      <h4 className="text-3xl font-bold text-white mb-10 tracking-wide">
        Leave Summary
      </h4>

      {/* Grid: 2 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-190 max-w-5xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center 
                       shadow-lg border border-gray-700 hover:border-gray-500 transition-all duration-300 
                       hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
          >
            {/* Icon */}
            <div
              className={`bg-gradient-to-r ${card.color} text-white rounded-full w-20 h-20 flex items-center justify-center mb-5 shadow-md`}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-100 mb-3 text-center">
              {card.title}
            </h2>

            {/* Number */}
            <p className="text-5xl font-bold text-white mb-3">{card.number}</p>

            {/* Glow Hover Overlay */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveList;
