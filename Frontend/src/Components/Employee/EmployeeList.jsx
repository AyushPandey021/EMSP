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
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Fetch Employees Function
  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("Employee API response:", response.data);

      // ✅ Check backend response structure
      const employeesData = response.data.data || response.data || [];

      // ✅ Format Data for DataTable
      const formattedData = employeesData.map((emp, index) => ({
        _id: emp._id,
        sno: index + 1,
        dep_name: emp.department.dep_name ,
        name: emp.userId.name || "N/A",
        dob: new Date(emp.dob).toLocaleDateString(),
        ProfileImage: emp.userId.ProfileImage ? (
          <img
            src={`http://localhost:5000/${emp.userId.ProfileImage}`}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          "No Image"
        ),
        salary: emp.salary || "N/A",
        designation: emp.designation || "N/A",
        role: emp.role || "N/A",
        action: <EmployeeButtons Id={emp._id} />,
      }));

      setEmployees(formattedData);
      setFilteredEmployees(formattedData);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Employees loaded successfully",
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
          "Failed to fetch Employees. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on Mount
  useEffect(() => {
    fetchEmployee();
  }, []);

  // ✅ Search Filter with useMemo for performance optimization
  const filteredEmployeesMemo = useMemo(() => {
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Employee Data</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee..."
              className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Add Employee Button */}
          <button
            onClick={() => navigate("/admin-dashboard/add-employee")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            + Add New Employee
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        {loading && <div>Loading...</div>}
        {filteredEmployeesMemo.length === 0 && !loading && <div>No employees found.</div>}
        
        <DataTable
          columns={columns}
          data={filteredEmployeesMemo}
          progressPending={loading}
          pagination
          highlightOnHover
          pointerOnHover
          striped
        />
      </div>
    </div>
  );
};

export default EmployeeList;
