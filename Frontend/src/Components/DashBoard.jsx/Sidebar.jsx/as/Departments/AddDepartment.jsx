import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Better user feedback than alert()

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        Swal.fire({
          icon: "success",
          title: "Department Added!",
          text: "The new department has been successfully created.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      const message =
        error.response?.data?.error || "Something went wrong. Try again!";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-6 tracking-wide">
          Add New Department
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Department Name */}
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

          {/* Description */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-lg text-white transition-transform transform hover:scale-[1.02] shadow-lg ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Adding..." : "Add Department"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
