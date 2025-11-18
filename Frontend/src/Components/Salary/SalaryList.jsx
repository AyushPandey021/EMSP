import React from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaUserTie, FaArrowUp } from "react-icons/fa";

const SalaryList = () => {
  const salaryData = [
    {
      employee: "Ayush Pandey",
      month: "January 2025",
      amount: "₹45,000",
      increment: "+5%",
      role: "Frontend Developer",
    },
    {
      employee: "Rohit Sharma",
      month: "January 2025",
      amount: "₹55,000",
      increment: "+8%",
      role: "Backend Developer",
    },
    {
      employee: "Aarti Singh",
      month: "January 2025",
      amount: "₹40,000",
      increment: "+3%",
      role: "UI/UX Designer",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-10 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-wide flex items-center gap-3">
        <FaMoneyBillWave className="text-green-600" />
        Salary Summary
      </h1>

      {/* Card Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {salaryData.map((item, index) => (
          <div
            key={index}
            className="
              bg-white 
              p-8 
              rounded-3xl 
              border border-gray-200
              shadow-lg 
              hover:shadow-2xl 
              hover:-translate-y-2 
              transition-all 
              duration-300
            "
          >
            {/* Employee Name */}
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-3">
              <FaUserTie className="text-blue-500" />
              {item.employee}
            </h2>

            {/* Role */}
            <p className="text-gray-500 text-sm mb-4">{item.role}</p>

            {/* Month */}
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <FaCalendarAlt className="text-indigo-500" />
              <span className="font-medium">{item.month}</span>
            </div>

            {/* Salary */}
            <p className="text-4xl font-extrabold text-green-600 mb-4">
              {item.amount}
            </p>

            {/* Increment */}
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <FaArrowUp />
              Salary Increment: {item.increment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryList;
