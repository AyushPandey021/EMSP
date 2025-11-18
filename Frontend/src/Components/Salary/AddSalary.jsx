import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    basicSalary: 0,
    allowance: 0,
    deduction: 0,
    payDate: null,
  });

  // -----------------------------------------
  // FETCH DEPARTMENTS & FETCH ALL EMPLOYEES
  // -----------------------------------------
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/departments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setDepartments(res.data.departments || []);
      } catch (err) {
        Swal.fire("Error", "Failed to load departments", "error");
      }
    };

    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employee", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        console.log("EMP RESPONSE:", res.data); // debug

        // Handle API variations safely
        const employeeList =
          res.data.employees ||
          res.data.employee ||
          res.data.allEmployees ||
          res.data.data || // sometimes returned
          [];

        setEmployees(employeeList);
      } catch (err) {
        Swal.fire("Error", "Failed to load employees", "error");
      }
    };

    fetchDepartments();
    fetchEmployees();
  }, []);

  // -----------------------------------------
  // INPUT HANDLER
  // -----------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------------------
  // SUBMIT FORM
  // -----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `http://localhost:5000/api/salary/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Salary Added Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin-dashboard/employees");
    } catch (err) {
      Swal.fire(
        "Failed",
        err.response?.data?.message || "Error adding salary",
        "error",
         console.log("SALARY ERROR:", err.response?.data)
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // UI
  // -----------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">
          Add Employee Salary
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Department Select */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Select */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Employee
            </label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            >
              <option value="">Select Employee</option>

              {employees.length === 0 && (
                <option disabled>No employees found</option>
              )}

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.userId?.name || emp.name || "Unnamed Employee"}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Allowance */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Allowance
            </label>
            <input
              type="number"
              name="allowance"
              value={formData.allowance}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Deduction */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Deduction
            </label>
            <input
              type="number"
              name="deduction"
              value={formData.deduction}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Pay Date */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Pay Date
            </label>
            <input
              type="date"
              name="payDate"
              value={formData.payDate}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Adding..." : "Add Salary"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
