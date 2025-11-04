import React from "react";

const SummeryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center h-30 gap-4 bg-white/90 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 cursor-pointer border border-gray-100 hover:-translate-y-1">
      {/* Icon Section */}
      <div
        className={`text-3xl flex justify-center items-center ${color} text-white p-4 rounded-xl shadow-sm`}
      >
        {icon}
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center">
        <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
          {text}
        </p>
        <p className="text-2xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};

export default SummeryCard;
