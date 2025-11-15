import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchDepartments } from "../../../utils/EmployeeHelper";

const EditEmp = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary: "",
    designation: "",
    maritalStatus: "",
    department: "",
    dob: "",
  });

  // Fetch Employee + Departments
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const emp = res.data.employee;
        setEmployee(emp);

        // Pre-fill form
        setFormData({
          name: emp.userId?.name || "",
          email: emp.userId?.email || "",
          salary: emp.salary || "",
          designation: emp.designation || "",
          maritalStatus: emp.maritalStatus || "",
          department: emp.department?._id || "",
          dob: emp.dob ? emp.dob.substring(0, 10) : "",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Employee Not Found!",
          text: "Unable to fetch employee details.",
        });
      }
    };

    // Load departments
    const loadDeps = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps || []);
    };

    fetchEmployee();
    loadDeps();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Updated Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        text: "Employee details updated.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin-dashboard/employee");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="text-sm font-medium text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* Department */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            >
              <option value="">Select department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmp;
