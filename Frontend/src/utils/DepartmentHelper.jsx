// 📁 DepartmentColumns.js
import React from "react";

// 🎨 Beautiful and responsive action buttons
export const DepartmentButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-200">
        Edit
      </button>
      <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200">
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
    cell: (row) => <DepartmentButtons row={row} />,
    center: true,
  },
];
