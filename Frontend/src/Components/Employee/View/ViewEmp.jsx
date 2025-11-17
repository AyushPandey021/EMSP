
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export const ViewEmp = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployee(res.data.employee);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Employee Not Found!",
          text: "Unable to fetch employee details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg font-semibold text-gray-600 animate-pulse">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg text-red-600 font-semibold">
        Employee data not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex justify-center items-start">

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">

        {/* PAGE HEADER */}
        <div className="p-8 border-b bg-gray-50 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            Employee Profile
          </h1>

          <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm shadow">
            Active Employee
          </span>
        </div>

        <div className="flex flex-col md:flex-row">

          {/* LEFT — LARGE PROFILE IMAGE SECTION */}
          <div className="md:w-1/3 bg-gray-50 p-8 flex justify-center items-start border-r">
            <div>
              <img
                src={`http://localhost:5000/${employee.userId?.profileImage}`}
                alt="Profile"
                className="w-80 h-80 object-cover rounded-3xl shadow-xl border-2 border-white"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />

              {/* Decorative info card */}
              <div className="mt-6 bg-white shadow-md rounded-2xl p-5 text-center border">
                <p className="text-xl font-bold text-gray-800">{employee.userId?.name}</p>
                <p className="text-gray-500">{employee.role}</p>
              </div>
            </div>
          </div>

          {/* RIGHT — DETAILS SECTION */}
          <div className="md:w-2/3 p-10 space-y-10">

            {/* SECTION TITLE */}
            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-600 pl-3">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Full Name" value={employee.userId?.name} />
              <DetailItem label="Email" value={employee.userId?.email} />
              <DetailItem label="Contact Number" value={employee.userId?.mobile} />
              <DetailItem
                label="Date of Birth"
                value={
                  employee.dob
                    ? new Date(employee.dob).toLocaleDateString()
                    : "N/A"
                }
              />
            </div>

            {/* WORK INFO TITLE */}
            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-600 pl-3">
              Work Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Department" value={employee.department?.dep_name} />
              <DetailItem label="Role" value={employee.role} />
              <DetailItem label="Salary" value={`₹ ${employee.salary}`} />
              <DetailItem label="Employee ID" value={employee.userId?._id} />
            </div>

            {/* FOOTER ACTION BUTTON */}
            <div className="pt-6">
              <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-xl shadow hover:bg-blue-700 transition">
                Go Back
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="p-5 bg-gray-50 rounded-xl border shadow-sm hover:shadow-md transition">
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="text-xl font-semibold text-gray-900 mt-1">{value || "N/A"}</p>
  </div>
);
