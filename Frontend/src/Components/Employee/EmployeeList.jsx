import React, { Profiler } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUserAlt, FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import axios from "axios";

const EmployeeList = () => {
  const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    const [employeLoading, setEmployeeLoading] = useState(false);
    const [search, setSearch] = useState("");

      const fetchEmployee = async () => {
        setEmployeeLoading(true);
        try {
          const response =await axios.post("http://localhost:5000/api/employee", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});
    
          console.log("Department API response:", response.data);
    
          const employees = response.data.departments || response.data.data || [];
    
          // ✅ Pass delete function to buttons
          const data = employees.map((emp, index) => ({
            _id: emp._id,
            sno: index + 1,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            ProfileImage: <img src={`http://localhost:5000/${emp.userId.ProfileImage}`} alt="" />
           ,
            salary: emp.salary,
            designation: emp.designation,
            role: emp.role,
          action :(<EmployeeButtons Id={emp._id} />)
          }));
    
          setEmployee(data);
    
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
          setEmployeeLoading(false);
        }
      };
    
      useEffect(() => {
        fetchEmployee();
      }, []);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Employee Data
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
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



<DataTable columns={columns} data={employee}/>
     
    </div>
  );
};

export default EmployeeList;
