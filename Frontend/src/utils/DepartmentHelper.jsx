// 📁 DepartmentColumns.js
import React from "react";
import { useNavigate } from "react-router-dom";

// 🎨 Beautiful and responsive action buttons
export const DepartmentButtons = ({ _id }) => {
  const navigate = useNavigate(); // ✅ must be inside the component

  const handleEdit = () => {
    navigate(`/admin-dashboard/departments/${_id}`);
  };

  const handleDelete = () => {
    console.log("Delete department:", _id);
    // You can add SweetAlert2 confirmation or API delete call here
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleEdit}
        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-200"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
      >
        Delete
      </button>
    </div>
  );
};

// 🧩 Table columns configuration
export const columns = [
  {
    name: "S No.",
    selector: (row, index) => index + 1, // Auto serial number
    sortable: true,
    width: "100px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    grow: 2,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    grow: 3,
  },
  {
    name: "Action",
    cell: (row) => <DepartmentButtons _id={row._id} />, // ✅ correct prop name
    center: true,
  },
];
