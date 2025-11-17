import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { fetchDepartments } from "../../../utils/EmployeeHelper";

const EditEmp = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    salary: "",
    designation: "",
    maritalStatus: "",
    department: "",
    dob: "",
  });

  // ------------------------------
  // Fetch Employee + Departments
  // ------------------------------
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const emp = res.data.employee;
        setEmployee(emp);

        setFormData({
          name: emp.userId?.name || "",
          email: emp.userId?.email || "",
          salary: emp.salary || "",
          designation: emp.designation || "",
          maritalStatus: emp.maritalStatus || "",
          department: emp.department?._id || "",
          dob: emp.dob ? emp.dob.substring(0, 10) : "",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error Fetching Employee!",
          text: "Employee not found.",
        });
      }
    };

    const loadDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps || []);
    };

    fetchEmployee();
    loadDepartments();
  }, [id]);

  // ------------------------------
  // Handle Form Change
  // ------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------------------
  // Submit Updated Employee
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        formData, // <-- correct body
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

      navigate("/admin-dashboard/employees");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text:
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-xl text-gray-500">
        Loading employee details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Edit Employee Details
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* PERSONAL INFO */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              👤 Personal Information
            </h3>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              className="mt-1 w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            >
              <option value="">Select...</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          {/* JOB INFO */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 mt-4">
              💼 Job Information
            </h3>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Department</label>
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

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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
