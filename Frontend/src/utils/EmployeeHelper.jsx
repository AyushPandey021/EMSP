import axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- EMPLOYEE BUTTONS ---------------- */
export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
        onClick={() => navigate(`/admin/employees/view/${id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
        onClick={() => navigate(`/admin/employees/edit/${id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition"
        onClick={() => navigate(`/admin/employees/salary/${id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        onClick={() => navigate(`/admin/employees/leave/${id}`)}
      >
        Leave
      </button>
    </div>
  );
};

/* ---------------- EMPLOYEE COLUMNS ---------------- */
export const columns = [
  {
    name: "S No.",
    selector: (row, index) => index + 1,
    sortable: true,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name || "N/A",
    sortable: true,
    grow: 2,
  },
  {
    name: "Image",
    cell: (row) =>
      row.ProfileImage ? (
        <img
          src={`http://localhost:5000/${row.ProfileImage}`}
          alt={row.name}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="text-gray-400 italic">No Image</span>
      ),
    grow: 1.5,
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId || "N/A",
    sortable: true,
    grow: 2,
  },
  {
    name: "Department",
    selector: (row) => row.department?.dep_name || "N/A", // Ensure you're accessing the department name properly
    sortable: true,
    grow: 2,
  },
  {
    name: "DOB",
    selector: (row) => row.dob || "N/A",
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    width: "300px",
  },
];

/* ---------------- FETCH DEPARTMENTS ---------------- */
export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/departments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      return response.data.departments;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: response.data.message || "Unable to fetch departments.",
      });
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error.response?.data?.error ||
        "Failed to fetch departments. Please try again later.",
    });
    return [];
  }
};
