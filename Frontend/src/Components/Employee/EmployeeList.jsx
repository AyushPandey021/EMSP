import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUserAlt, FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";

const EmployeeList = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Employee Data
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search employee..."
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Add Employee Button */}
          <button
            onClick={() => navigate("/admin-dashboard/add-employee")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            + Add New Employee
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-4 border-b">#</th>
              <th className="p-4 border-b">
                <FaUserAlt className="inline mr-2" /> Name
              </th>
              <th className="p-4 border-b">
                <FaEnvelope className="inline mr-2" /> Email
              </th>
              <th className="p-4 border-b">
                <FaPhone className="inline mr-2" /> Phone
              </th>
              <th className="p-4 border-b">
                <FaBuilding className="inline mr-2" /> Department
              </th>
              <th className="p-4 border-b">
                <MdOutlineWork className="inline mr-2" /> Role
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition border-b">
              <td className="p-4">1</td>
              <td className="p-4 font-medium text-gray-800">Ayush Pandey</td>
              <td className="p-4 text-gray-600">ayush@example.com</td>
              <td className="p-4 text-gray-600">+91 9876543210</td>
              <td className="p-4 text-gray-600">IT</td>
              <td className="p-4 text-gray-600">Frontend Developer</td>
            </tr>
            <tr className="hover:bg-gray-50 transition border-b">
              <td className="p-4">2</td>
              <td className="p-4 font-medium text-gray-800">Riya Sharma</td>
              <td className="p-4 text-gray-600">riya@example.com</td>
              <td className="p-4 text-gray-600">+91 9123456780</td>
              <td className="p-4 text-gray-600">HR</td>
              <td className="p-4 text-gray-600">HR Manager</td>
            </tr>
            <tr className="hover:bg-gray-50 transition border-b">
              <td className="p-4">3</td>
              <td className="p-4 font-medium text-gray-800">Rohit Verma</td>
              <td className="p-4 text-gray-600">rohit@example.com</td>
              <td className="p-4 text-gray-600">+91 9000000000</td>
              <td className="p-4 text-gray-600">Finance</td>
              <td className="p-4 text-gray-600">Accountant</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
