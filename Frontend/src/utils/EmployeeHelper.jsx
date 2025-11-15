import axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- EMPLOYEE BUTTONS ---------------- */
/* ---------------- EMPLOYEE BUTTONS ---------------- */
export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  const btn =
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all shadow-sm";

  return (
    <div className="flex items-center gap-2">
      <button
        className={`${btn} bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow`}
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </button>

      <button
        className={`${btn} bg-green-50 text-green-600 hover:bg-green-100 hover:shadow`}
        onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edit
      </button>

      <button
        className={`${btn} bg-amber-50 text-amber-600 hover:bg-amber-100 hover:shadow`}
        onClick={() => navigate(`/admin/employees/salary/${id}`)}
      >
        Salary
      </button>

      <button
        className={`${btn} bg-red-50 text-red-600 hover:bg-red-100 hover:shadow`}
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
  },

  {
    name: "Image",
    cell: (row) =>
      row.ProfileImage ? (
        <img
          src={`http://localhost:5000/${row.ProfileImage}`}
          alt={row.name}
          className="w-12 h-12 rounded-xl shadow object-cover border border-gray-200"
        />
      ) : (
        <span className="text-gray-400 italic">No Image</span>
      ),
  },

  {
    name: "Employee ID",
    selector: (row) => row.employeeId?.emp?._id || "N/A",
  },

  {
    name: "Department",
    selector: (row) => row.dep_name || "N/A",
  },

  {
    name: "DOB",
    selector: (row) => row.dob || "N/A",
    sortable: true,
  },

  {
    name: "Action",
    width: "300px",
    cell: (row) => <EmployeeButtons id={row._id} />,
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
