import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/departments/add`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-6 tracking-wide">
          Add New Department
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dep_name"
              className="block text-gray-300 font-medium mb-2"
            >
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              id="dep_name"
              placeholder="Enter department name"
              value={department.dep_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter department description"
              value={department.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-transform transform hover:scale-[1.02] shadow-lg"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
