import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ dep_name: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/departments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching department:", error);
        Swal.fire({
          icon: "error",
          title: "Department Not Found!",
          text: "The requested department could not be fetched.",
          confirmButtonColor: "#3085d6",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/departments/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ SweetAlert2 success popup
      Swal.fire({
        icon: "success",
        title: "Department Updated!",
        text: "The department has been updated successfully.",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/admin-dashboard/departments");
      });

    } catch (error) {
      console.error("Error updating department:", error);
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Session Expired!",
          text: "Please log in again to continue.",
          confirmButtonText: "Go to Login",
          confirmButtonColor: "#d33",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: "Something went wrong while updating the department.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-gray-600 text-lg animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 flex items-center text-gray-600 hover:text-blue-600 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          ✏️ Edit Department
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              value={formData.dep_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              placeholder="Enter department name"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              placeholder="Enter short description"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
          >
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
