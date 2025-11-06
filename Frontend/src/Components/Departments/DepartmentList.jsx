import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { columns as baseColumns, DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Handle delete from child (instantly updates UI)
  const handleDepartmentDelete = (id) => {
    setDepartments((prev) => prev.filter((dep) => dep._id !== id));
  };

  // ✅ Fetch all departments from backend
  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/departments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Department API response:", response.data);

      const departmentsData = response.data.departments || response.data.data || [];

      // ✅ Pass delete function to buttons
      const data = departmentsData.map((dep, index) => ({
        _id: dep._id,
        sno: index + 1,
        dep_name: dep.dep_name,
        description: dep.description || "—",
      }));

      setDepartments(data);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Departments loaded successfully",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.error ||
          "Failed to fetch departments. Please try again later.",
      });
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // ✅ Filter departments for search
  const filteredDepartments = departments.filter((dep) =>
    dep.dep_name?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Combine columns dynamically (to inject delete handler)
  const columns = [
    ...baseColumns.slice(0, -1), // All columns except last "Action"
    {
      ...baseColumns[baseColumns.length - 1], // Action column
      cell: (row) => (
        <DepartmentButtons _id={row._id} onDepartmentDelete={handleDepartmentDelete} />
      ),
    },
  ];

  return (
    <>
      {depLoading ? (
        <div className="flex items-center justify-center h-screen text-gray-200 text-xl">
          Loading departments...
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
          <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h3 className="text-3xl font-semibold tracking-wide mb-4 md:mb-0">
                Manage Departments
              </h3>
              <Link
                to="/admin-dashboard/add-new-departments"
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg shadow-md font-medium transition-transform transform hover:scale-[1.03]"
              >
                + Add New Department
              </Link>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="🔍 Search by department name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition-all"
              />
            </div>

            {/* Table */}
            {filteredDepartments.length === 0 ? (
              <p className="text-center text-gray-400 py-6">
                No departments found.
              </p>
            ) : (
              <div className="rounded-lg overflow-hidden shadow-xl">
                <DataTable
                  columns={columns}
                  data={filteredDepartments}
                  pagination
                  highlightOnHover
                  responsive
                  persistTableHead
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
