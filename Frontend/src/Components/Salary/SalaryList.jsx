import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaCalendarAlt, FaUserTie, FaArrowUp } from "react-icons/fa";

const SalaryList = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSalary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/salary/list");
      setSalaryData(res.data.salaries || []);
    } catch (error) {
      console.error("Error fetching salaries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading Salaries...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-10 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 tracking-wide flex items-center gap-3">
        <FaMoneyBillWave className="text-green-600" />
        Salary Summary
      </h1>

      {/* Card Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {salaryData.length === 0 ? (
          <h2 className="text-center text-xl text-gray-600 col-span-2">
            No salary records found.
          </h2>
        ) : (
          salaryData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Employee Name */}
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                <FaUserTie className="text-blue-500" />
                {item.employeeId?.name || "Unknown Employee"}
              </h2>

              {/* Role */}
              <p className="text-gray-500 text-sm mb-4">
                {item.employeeId?.role || "No Role Added"}
              </p>

              {/* Pay Date */}
              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <FaCalendarAlt className="text-indigo-500" />
                <span className="font-medium">
                  {new Date(item.payDate).toLocaleDateString()}
                </span>
              </div>

              {/* Salary */}
              <p className="text-4xl font-extrabold text-green-600 mb-4">
                ₹{item.netSalary}
              </p>

              {/* Increment Placeholder */}
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <FaArrowUp />
                Increment: N/A
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SalaryList;
