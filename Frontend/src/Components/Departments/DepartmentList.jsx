import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import {
  columns as baseColumns,
  DepartmentButtons,
} from "../../utils/DepartmentHelper";
import { FaSearch } from "react-icons/fa";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleDepartmentDelete = (id) => {
    setDepartments((prev) => prev.filter((dep) => dep._id !== id));
  };

  const fetchDepartments = async () => {
    setDepLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const departmentsData = response.data.departments || [];

      const formatted = departmentsData.map((dep, index) => ({
        _id: dep._id,
        sno: index + 1,
        dep_name: dep.dep_name,
        description: dep.description || "—",
      }));

      setDepartments(formatted);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Departments Loaded Successfully",
        showConfirmButton: false,
        timer: 1300,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Unable to fetch departments.",
      });
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter((dep) =>
    dep.dep_name?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    ...baseColumns.slice(0, -1),
    {
      ...baseColumns[baseColumns.length - 1],
      cell: (row) => (
        <DepartmentButtons
          _id={row._id}
          onDepartmentDelete={handleDepartmentDelete}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 ">
      {/* Header */}
      <div className="bg-white/90 p-6 rounded-xl shadow-md max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold tracking-wide">
            Department Management
          </h2>

          <Link
            to="/admin-dashboard/add-new-departments"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md 
                       hover:bg-blue-700 transition transform hover:scale-[1.02]"
          >
            + Add Department
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mt-5 w-full md:w-2/4">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       shadow-sm text-gray-700"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
        <DataTable
          columns={columns}
          data={filteredDepartments}
          progressPending={depLoading}
          pagination
          highlightOnHover
          striped
          className="rounded-lg"
          customStyles={{
            headCells: {
              style: {
                background: "#f8f8f8",
                fontSize: "15px",
                fontWeight: "600",
              },
            },
            rows: {
              style: {
                minHeight: "60px",
                fontSize: "15px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DepartmentList;
