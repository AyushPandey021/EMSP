import React from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const LeaveList = () => {
  const cards = [
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Leaves Applied",
      number: 5,
      color: "from-cyan-300 to-blue-400",
    },
    {
      icon: <FaCheckCircle className="text-3xl" />,
      title: "Leaves Approved",
      number: 3,
      color: "from-green-300 to-emerald-400",
    },
    {
      icon: <FaTimesCircle className="text-3xl" />,
      title: "Leaves Rejected",
      number: 2,
      color: "from-red-300 to-pink-400",
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Pending Leaves",
      number: 1,
      color: "from-yellow-300 to-orange-400",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-white to-gray-100 p-8 md:p-14">
      <h4 className="text-4xl font-extrabold text-gray-900 mb-12 tracking-wide">
        Leave Summary
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="
              group relative 
              bg-white 
              rounded-3xl p-10 
              flex flex-col items-center justify-center
              shadow-lg hover:shadow-2xl 
              border border-gray-200 
              transition-all duration-300 
              hover:-translate-y-2 hover:border-gray-300
            "
          >

            {/* Icon */}
            <div
              className={`
                bg-gradient-to-br ${card.color} 
                text-white rounded-2xl 
                w-20 h-20 
                flex items-center justify-center 
                mb-5 shadow-lg 
                transform group-hover:scale-110 
                transition-all duration-300
              `}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
              {card.title}
            </h2>

            {/* Number */}
            <p className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {card.number}
            </p>

            {/* Elegant Glow */}
            <div className="
              absolute inset-0 
              rounded-3xl 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 
              bg-gradient-to-br from-gray-100/40 to-white/10 
              pointer-events-none
            "></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveList;
