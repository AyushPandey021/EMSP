import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";

// 🎨 Beautiful and responsive action buttons
export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  // ✏️ Edit handler
  const handleEdit = () => {
    navigate(`/admin-dashboard/departments/${_id}`);
  };

const handleDelete = async () => {
  const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: "This action will permanently delete the department!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmDelete.isConfirmed) return;

  try {
    const res = await axios.delete(
      `http://localhost:5000/api/departments/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "The department has been removed successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    // ✅ Remove from UI instantly
    if (onDepartmentDelete) onDepartmentDelete(_id);

  } catch (error) {
    console.error("Error deleting department:", error);
    Swal.fire({
      icon: "error",
      title: "Delete Failed!",
      text: "Something went wrong while deleting the department.",
    });
  }
};


  return (

<div className="flex items-center gap-2 justify-center">
  {/* Edit Button */}
  <button
    onClick={handleEdit}
    className="
      flex items-center gap-1
      px-2.5 py-1.5
      text-xs font-medium
      rounded-lg
      bg-yellow-400/90 
      text-gray-900 
      shadow-sm
      transition-all 
      duration-200
      hover:bg-yellow-500 hover:shadow-md hover:-translate-y-[1px]
      active:scale-95
      whitespace-nowrap
    "
  >
    <Pencil size={14} />
    Edit
  </button>

  {/* Delete Button */}
  <button
    onClick={handleDelete}
    className="
      flex items-center gap-1
      px-2.5 py-1.5
      text-xs font-medium
      rounded-lg
      bg-red-500/90 
      text-white 
      shadow-sm
      transition-all 
      duration-200
      hover:bg-red-600 hover:shadow-md hover:-translate-y-[1px]
      active:scale-95
      whitespace-nowrap
    "
  >
    <Trash2 size={14} />
    Delete
  </button>
</div>


  );
};

// 🧩 Table columns configuration
export const columns = [
  {
    name: "S No.",
    selector: (row, index) => index + 1,
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
    cell: (row) => (
      <DepartmentButtons
        _id={row._id}
        onDepartmentDelete={row.onDepartmentDelete}
      />
    ),
    center: true,
  },
];
