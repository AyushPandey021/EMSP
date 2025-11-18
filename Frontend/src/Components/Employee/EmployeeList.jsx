import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import axios from "axios";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch Employees
  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const employeesData = response.data.data || [];

      const formattedData = employeesData.map((emp, index) => ({
        _id: emp._id,
        sno: index + 1,
        dep_name: emp.department?.dep_name || "N/A",
        name: emp.userId?.name || "N/A",
        dob: new Date(emp.dob).toLocaleDateString(),

        ProfileImage: emp.userId?.ProfileImage ? (
          <img
            src={`http://localhost:5000/uploads/${emp.userId.ProfileImage}`}
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        ),

        salary: emp.salary || "N/A",
        designation: emp.designation || "N/A",
        role: emp.role || "N/A",
        action: <EmployeeButtons Id={emp._id} />,
      }));

      setEmployees(formattedData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch employees",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  return (
    <div className="p- bg-gray-100 min-h-screen">

      {/* Header Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-3xl font-bold tracking-wide drop-shadow-lg mb-5">
          Employee Management
        </h2>

        {/* Search + Add Employee */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Search Bar */}
          <div className="relative w-full md:w-2/4">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              shadow-sm text-gray-700"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => navigate("/admin-dashboard/add-employee")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 
            rounded-lg shadow-md transition transform hover:scale-[1.02]"
          >
            + Add Employee
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default EmployeeList;
