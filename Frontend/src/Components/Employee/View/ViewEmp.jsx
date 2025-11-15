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
         `http://localhost:5000/api/employee/${id}`
,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setEmployee(res.data.employee);
      } catch (error) {
        console.error("Error:", error);
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
      <div className="flex justify-center items-center h-[80vh] text-lg text-gray-500">
        Loading employee details...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg text-red-500 font-semibold">
        Employee data not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Employee Details
        </h1>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={`http://localhost:5000/${employee.userId?.profileImage}`}
            alt="Profile"
            className="w-32 h-32 rounded-2xl shadow-md object-cover border border-gray-200"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />

          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            {employee.userId?.name}
          </h2>
          <p className="text-gray-500">{employee.userId?.email}</p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <DetailItem
            label="Department"
            value={employee.department?.dep_name}
          />

          <DetailItem label="Role" value={employee.role} />

          <DetailItem label="Salary" value={`₹ ${employee.salary}`} />

          <DetailItem
            label="DOB"
            value={
              employee.dob
                ? new Date(employee.dob).toLocaleDateString()
                : "N/A"
            }
          />

          <DetailItem
            label="Employee ID"
            value={employee.userId?._id}
          />

          <DetailItem
            label="Contact"
            value={employee.userId?.mobile || "N/A"}
          />
        </div>
      </div>
    </div>
  );
};

/* Reusable Detail Component */
const DetailItem = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm">
    <p className="text-xs text-gray-500 uppercase font-semibold">
      {label}
    </p>
    <p className="text-lg font-medium text-gray-800 mt-1">
      {value || "N/A"}
    </p>
  </div>
);
