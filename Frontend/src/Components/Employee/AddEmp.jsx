import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";

const AddEmp = () => {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const data = await fetchDepartments(); // ✅ await the async function
      setDepartments(data || []); // ensure array
    };

    getDepartments();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Employee
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              placeholder="EMP123"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Material Status
            </label>
            <select className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              placeholder="Enter designation"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Department */}
  <div>
      <label className="block text-sm font-medium text-gray-700">
        Department
      </label>
      <select
        className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
      >
        <option value="">Select department</option>
        {departments.map((dep) => (
          <option key={dep._id} value={dep._id}>
            {dep.dep_name}
          </option>
        ))}
      </select>
    </div>
          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              placeholder="Enter salary"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Upload Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Employee Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;
